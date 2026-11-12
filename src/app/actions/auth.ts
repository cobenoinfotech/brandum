"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

// ------------------------------------------------------------------------------
// Validation Schemas
// ------------------------------------------------------------------------------
const registerSchema = z
  .object({
    full_name: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please provide a valid email address").toLowerCase(),
    mobile_number: z
      .string()
      .min(10, "Mobile number must be at least 10 digits")
      .regex(/^[0-9+\s-]{10,15}$/, "Invalid mobile number format"),
    company_name: z.string().optional().or(z.literal("")),
    designation: z.string().optional().or(z.literal("")),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address").toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

const profileUpdateSchema = z.object({
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  mobile_number: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .regex(/^[0-9+\s-]{10,15}$/, "Invalid mobile number format"),
  company_name: z.string().optional().or(z.literal("")),
  designation: z.string().optional().or(z.literal("")),
});

const changePasswordSchema = z
  .object({
    current_password: z.string().min(1, "Current password is required"),
    new_password: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirm_new_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "New passwords do not match",
    path: ["confirm_new_password"],
  });

// ------------------------------------------------------------------------------
// 1. PUBLIC USER REGISTRATION
// ------------------------------------------------------------------------------
export async function registerUser(formData: z.infer<typeof registerSchema>) {
  try {
    const validated = registerSchema.parse(formData);

    const supabase = await createClient();

    // Check email uniqueness in profiles
    const { data: existingUser } = await (supabase as any)
      .from("profiles")
      .select("id")
      .eq("email", validated.email)
      .maybeSingle();

    if (existingUser) {
      return {
        success: false,
        message: "An account with this email address already exists. Please login instead.",
      };
    }

    // Sign up the user via Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: validated.email,
      password: validated.password,
      options: {
        data: {
          full_name: validated.full_name,
          mobile_number: validated.mobile_number,
          company_name: validated.company_name || null,
          designation: validated.designation || null,
        },
      },
    });

    if (authError) {
      return { success: false, message: authError.message };
    }

    const userId = authData.user?.id;
    if (!userId) {
      return {
        success: false,
        message: "Unable to create authentication account. Please check your details.",
      };
    }

    // Insert additional profile record in PostgreSQL profiles table
    try {
      const adminClient = createAdminClient();
      await (adminClient as any).from("profiles").upsert({
        id: userId,
        full_name: validated.full_name,
        email: validated.email,
        mobile_number: validated.mobile_number,
        company_name: validated.company_name || null,
        designation: validated.designation || null,
        account_status: "active",
      });
    } catch {
      await (supabase as any).from("profiles").upsert({
        id: userId,
        full_name: validated.full_name,
        email: validated.email,
        mobile_number: validated.mobile_number,
        company_name: validated.company_name || null,
        designation: validated.designation || null,
        account_status: "active",
      });
    }

    return {
      success: true,
      message: "Registration successful! You may now login to your dashboard.",
    };
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return { success: false, message: err.issues[0]?.message || "Validation failed" };
    }
    const message = err instanceof Error ? err.message : "Registration failed";
    return { success: false, message };
  }
}

// ------------------------------------------------------------------------------
// 2. PUBLIC USER LOGIN
// ------------------------------------------------------------------------------
export async function loginUser(formData: z.infer<typeof loginSchema>) {
  try {
    const validated = loginSchema.parse(formData);
    const supabase = await createClient();

    // Authenticate via Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: validated.email,
      password: validated.password,
    });

    if (error || !data.user) {
      return {
        success: false,
        message: error?.message || "Invalid email or password. Please try again.",
      };
    }

    // Check account status in profiles table
    const { data: profile } = await supabase
      .from("profiles")
      .select("account_status")
      .eq("id", data.user.id)
      .maybeSingle();

    if (profile && (profile as { account_status?: string }).account_status === "inactive") {
      // Sign out immediately if account is deactivated
      await supabase.auth.signOut();
      return {
        success: false,
        message: "Your account has been deactivated by administration. Please contact support.",
      };
    }

    // Update last_login_at
    try {
      await (supabase as any)
        .from("profiles")
        .update({ last_login_at: new Date().toISOString() })
        .eq("id", data.user.id);
    } catch {
      // non-fatal
    }

    return { success: true, message: "Login successful!" };
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return { success: false, message: err.issues[0]?.message || "Validation failed" };
    }
    const message = err instanceof Error ? err.message : "Login failed";
    return { success: false, message };
  }
}

// ------------------------------------------------------------------------------
// 3. LOGOUT (Public User or Admin)
// ------------------------------------------------------------------------------
export async function logoutUser() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/join/login");
}

export async function logoutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ------------------------------------------------------------------------------
// 4. UPDATE USER PROFILE
// ------------------------------------------------------------------------------
export async function updateUserProfile(formData: z.infer<typeof profileUpdateSchema>) {
  try {
    const validated = profileUpdateSchema.parse(formData);
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, message: "Unauthorized. Please login again." };
    }

    const { error } = await (supabase as any)
      .from("profiles")
      .update({
        full_name: validated.full_name,
        mobile_number: validated.mobile_number,
        company_name: validated.company_name || null,
        designation: validated.designation || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      return { success: false, message: error.message };
    }

    revalidatePath("/join/dashboard");
    revalidatePath("/join/profile");

    return { success: true, message: "Profile updated successfully!" };
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return { success: false, message: err.issues[0]?.message || "Validation failed" };
    }
    const message = err instanceof Error ? err.message : "Update failed";
    return { success: false, message };
  }
}

// ------------------------------------------------------------------------------
// 5. CHANGE PASSWORD
// ------------------------------------------------------------------------------
export async function changeUserPassword(formData: z.infer<typeof changePasswordSchema>) {
  try {
    const validated = changePasswordSchema.parse(formData);
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email) {
      return { success: false, message: "Unauthorized. Please login." };
    }

    // Verify current password first by signing in
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: validated.current_password,
    });

    if (verifyError) {
      return {
        success: false,
        message: "Current password is incorrect. Please verify and try again.",
      };
    }

    // Update to new password
    const { error: updateError } = await supabase.auth.updateUser({
      password: validated.new_password,
    });

    if (updateError) {
      return { success: false, message: updateError.message };
    }

    return { success: true, message: "Password updated successfully!" };
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return { success: false, message: err.issues[0]?.message || "Validation failed" };
    }
    const message = err instanceof Error ? err.message : "Password change failed";
    return { success: false, message };
  }
}
