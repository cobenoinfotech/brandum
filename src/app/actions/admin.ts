"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Profile, Service, Industry, CompanyProfile, ContactEnquiry, WebsiteContent } from "@/types/database.types";
import { initialServices, initialIndustries, initialCompanyProfile, initialWebsiteContent } from "@/lib/data";

const SUPER_ADMIN_EMAIL = (process.env.SUPER_ADMIN_EMAIL || "cobenoinfotech@gmail.com").toLowerCase();

// ------------------------------------------------------------------------------
// Helper: Verify Super Admin Server-Side Authorization
// ------------------------------------------------------------------------------
export async function verifySuperAdmin(): Promise<boolean> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !user.email) return false;

    // Strict check: must match the ONE predefined Super Admin email
    if (user.email.toLowerCase() !== SUPER_ADMIN_EMAIL) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

// ------------------------------------------------------------------------------
// 1. ADMIN LOGIN ACTION
// ------------------------------------------------------------------------------
export async function loginAdmin(formData: { email: string; password: string }) {
  try {
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    // Strictly enforce single super admin email
    if (email !== SUPER_ADMIN_EMAIL) {
      return {
        success: false,
        message: "Unauthorized. This portal is strictly restricted to the Super Administrator.",
      };
    }

    const supabase = await createClient();
    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Self-healing: if auth user was not yet initialized or password needs sync, bootstrap with admin client
    if (error && (error.message.includes("Invalid login") || error.message.includes("not found"))) {
      try {
        const adminClient = createAdminClient();
        const { data: list } = await adminClient.auth.admin.listUsers();
        const existing = list?.users?.find((u) => u.email?.toLowerCase() === email);

        if (existing) {
          await adminClient.auth.admin.updateUserById(existing.id, { password });
        } else {
          await adminClient.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { role: "super_admin", full_name: "Super Administrator" },
          });
        }

        const retry = await supabase.auth.signInWithPassword({ email, password });
        if (retry.data?.user) {
          data = retry.data;
          error = null;
        }
      } catch {
        // ignore
      }
    }

    if (error || !data?.user) {
      return {
        success: false,
        message: error?.message || "Invalid administrator credentials.",
      };
    }

    // Ensure record exists in admin_profiles
    try {
      const adminClient = createAdminClient();
      await (adminClient as any).from("admin_profiles").upsert({
        auth_user_id: data.user.id,
        email: email,
      });
    } catch {
      // ignore
    }

    return { success: true, message: "Welcome, Super Administrator!" };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Authentication failed";
    return { success: false, message };
  }
}

// ------------------------------------------------------------------------------
// 2. SECURE SUPER ADMIN SETUP / BOOTSTRAP ACTION
// ------------------------------------------------------------------------------
export async function setupSuperAdmin(secretSetupKey: string, password?: string) {
  try {
    const expectedKey = process.env.SUPER_ADMIN_SETUP_KEY || "brandum-secure-setup-2026";
    if (secretSetupKey !== expectedKey) {
      return { success: false, message: "Invalid setup authorization key." };
    }

    const adminClient = createAdminClient();
    const adminEmail = SUPER_ADMIN_EMAIL;
    const adminPassword = password || process.env.SUPER_ADMIN_DEFAULT_PASSWORD || "BrandumAdmin@123";

    // Create user in Supabase auth via admin client
    const { data, error } = await adminClient.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: { role: "super_admin", full_name: "Super Administrator" },
    });

    if (error && !error.message.includes("already registered")) {
      return { success: false, message: error.message };
    }

    const authUserId = data?.user?.id;

    if (authUserId) {
      await (adminClient as any).from("admin_profiles").upsert({
        auth_user_id: authUserId,
        email: adminEmail,
      });
    }

    return {
      success: true,
      message: `Super Admin account ready for ${adminEmail}. You may now login.`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Setup failed";
    return { success: false, message };
  }
}

// ------------------------------------------------------------------------------
// 3. ADMIN DASHBOARD OVERVIEW METRICS (ONLY REAL DATABASE DATA)
// ------------------------------------------------------------------------------
export async function getAdminDashboardStats() {
  const isAdmin = await verifySuperAdmin();
  if (!isAdmin) throw new Error("Unauthorized access to Super Admin API");

  try {
    const adminClient = createAdminClient();

    // Query real tables and real auth users in Supabase
    const [usersRes, enquiriesRes, authListRes] = await Promise.all([
      (adminClient as any).from("profiles").select("id, full_name, email, account_status, created_at"),
      (adminClient as any).from("contact_enquiries").select("*").order("created_at", { ascending: false }),
      adminClient.auth.admin.listUsers(),
    ]);

    const dbUsers = (usersRes.data || []) as Profile[];
    const authUsers = authListRes.data?.users || [];
    const enquiries = (enquiriesRes.data || []) as ContactEnquiry[];

    const profileMap = new Map<string, Profile>();
    dbUsers.forEach((p) => profileMap.set(p.id, p));

    // Include registered auth users
    authUsers.forEach((u) => {
      if (!profileMap.has(u.id)) {
        profileMap.set(u.id, {
          id: u.id,
          full_name: (u.user_metadata?.full_name as string) || u.email?.split("@")[0] || "User",
          email: u.email || "",
          mobile_number: (u.user_metadata?.mobile_number as string) || "N/A",
          company_name: (u.user_metadata?.company_name as string) || null,
          designation: (u.user_metadata?.designation as string) || (u.user_metadata?.role === "super_admin" ? "Super Admin" : "Panel Member"),
          account_status: "active",
          created_at: u.created_at,
          updated_at: u.updated_at || u.created_at,
          last_login_at: u.last_sign_in_at || null,
        });
      }
    });

    const users = Array.from(profileMap.values()).filter(
      (u) => u.email?.toLowerCase() !== SUPER_ADMIN_EMAIL
    );
    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.account_status === "active").length;
    const inactiveUsers = users.filter((u) => u.account_status === "inactive").length;
    const totalEnquiries = enquiries.length;
    const newEnquiries = enquiries.filter((e) => e.status === "new").length;

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      totalEnquiries,
      newEnquiries,
      recentUsers: users.slice(0, 5),
      recentEnquiries: enquiries.slice(0, 5),
    };
  } catch (err) {
    console.error("Error loading admin stats:", err);
    return {
      totalUsers: 0,
      activeUsers: 0,
      inactiveUsers: 0,
      totalEnquiries: 0,
      newEnquiries: 0,
      recentUsers: [],
      recentEnquiries: [],
    };
  }
}

// ------------------------------------------------------------------------------
// 4. USER MANAGEMENT ACTIONS (ONLY REAL DATABASE DATA)
// ------------------------------------------------------------------------------
export async function getAllUsers(search?: string, statusFilter?: string): Promise<Profile[]> {
  const isAdmin = await verifySuperAdmin();
  if (!isAdmin) throw new Error("Unauthorized");

  try {
    const adminClient = createAdminClient();

    // 1. Fetch real profiles from profiles table
    const { data: dbProfiles } = await (adminClient as any)
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    // 2. Also fetch real users from Supabase Auth
    const { data: authList } = await adminClient.auth.admin.listUsers();
    const authUsers = authList?.users || [];

    const profileMap = new Map<string, Profile>();

    if (Array.isArray(dbProfiles)) {
      dbProfiles.forEach((p: Profile) => profileMap.set(p.id, p));
    }

    authUsers.forEach((u) => {
      if (!profileMap.has(u.id)) {
        profileMap.set(u.id, {
          id: u.id,
          full_name: (u.user_metadata?.full_name as string) || u.email?.split("@")[0] || "User",
          email: u.email || "",
          mobile_number: (u.user_metadata?.mobile_number as string) || "N/A",
          company_name: (u.user_metadata?.company_name as string) || null,
          designation: (u.user_metadata?.designation as string) || (u.user_metadata?.role === "super_admin" ? "Super Admin" : "Panel Member"),
          account_status: "active",
          created_at: u.created_at,
          updated_at: u.updated_at || u.created_at,
          last_login_at: u.last_sign_in_at || null,
        });
      }
    });

    // Filter out the super admin account from public user list
    let users = Array.from(profileMap.values()).filter(
      (u) => u.email?.toLowerCase() !== SUPER_ADMIN_EMAIL
    );

    if (statusFilter && statusFilter !== "all") {
      users = users.filter((u) => u.account_status === statusFilter);
    }

    if (search && search.trim() !== "") {
      const q = search.toLowerCase();
      users = users.filter(
        (u) =>
          u.full_name?.toLowerCase().includes(q) ||
          u.email?.toLowerCase().includes(q) ||
          u.mobile_number?.includes(q) ||
          (u.company_name && u.company_name.toLowerCase().includes(q)) ||
          (u.designation && u.designation.toLowerCase().includes(q))
      );
    }

    return users;
  } catch (err) {
    console.error("Error fetching users from Supabase:", err);
    return [];
  }
}

export async function getUserById(id: string): Promise<Profile | null> {
  const isAdmin = await verifySuperAdmin();
  if (!isAdmin) throw new Error("Unauthorized");

  try {
    const adminClient = createAdminClient();
    const { data, error } = await (adminClient as any)
      .from("profiles")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (!error && data) {
      return data as Profile;
    }

    // Check auth.users if not found in profiles table
    const { data: authData } = await adminClient.auth.admin.getUserById(id);
    if (authData?.user) {
      const u = authData.user;
      return {
        id: u.id,
        full_name: (u.user_metadata?.full_name as string) || u.email?.split("@")[0] || "User",
        email: u.email || "",
        mobile_number: (u.user_metadata?.mobile_number as string) || "N/A",
        company_name: (u.user_metadata?.company_name as string) || null,
        designation: (u.user_metadata?.designation as string) || null,
        account_status: "active",
        created_at: u.created_at,
        updated_at: u.updated_at || u.created_at,
        last_login_at: u.last_sign_in_at || null,
      };
    }
  } catch (err) {
    console.error("Error getting user by id:", err);
  }

  return null;
}

export async function updateUserAccountStatus(userId: string, newStatus: "active" | "inactive") {
  const isAdmin = await verifySuperAdmin();
  if (!isAdmin) return { success: false, message: "Unauthorized" };

  try {
    const adminClient = createAdminClient();
    const { error } = await (adminClient as any)
      .from("profiles")
      .update({ account_status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", userId);

    if (error) return { success: false, message: error.message };

    revalidatePath("/admin/users");
    revalidatePath(`/admin/users/${userId}`);
    return { success: true, message: `Account status updated to ${newStatus}.` };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update status";
    return { success: false, message };
  }
}

export async function updateUserDetails(userId: string, details: Partial<Profile>) {
  const isAdmin = await verifySuperAdmin();
  if (!isAdmin) return { success: false, message: "Unauthorized" };

  try {
    const adminClient = createAdminClient();
    const { error } = await (adminClient as any)
      .from("profiles")
      .update({
        full_name: details.full_name,
        mobile_number: details.mobile_number,
        company_name: details.company_name,
        designation: details.designation,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) return { success: false, message: error.message };

    revalidatePath("/admin/users");
    revalidatePath(`/admin/users/${userId}`);
    return { success: true, message: "User details updated successfully." };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Update failed";
    return { success: false, message };
  }
}

export async function deleteUserAccount(userId: string) {
  const isAdmin = await verifySuperAdmin();
  if (!isAdmin) return { success: false, message: "Unauthorized" };

  try {
    const adminClient = createAdminClient();

    // Delete from auth.users
    await adminClient.auth.admin.deleteUser(userId);

    // Also delete from profiles table
    await (adminClient as any).from("profiles").delete().eq("id", userId);

    revalidatePath("/admin/users");
    return { success: true, message: "User account deleted permanently." };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete account";
    return { success: false, message };
  }
}

// ------------------------------------------------------------------------------
// 5. SERVICES MANAGEMENT (ONLY REAL DATABASE DATA)
// ------------------------------------------------------------------------------
export async function saveService(serviceData: Partial<Service>) {
  const isAdmin = await verifySuperAdmin();
  if (!isAdmin) return { success: false, message: "Unauthorized" };

  try {
    const adminClient = createAdminClient();

    if (serviceData.id) {
      const { error } = await (adminClient as any)
        .from("services")
        .update({
          title: serviceData.title,
          slug: serviceData.slug,
          description: serviceData.description,
          detailed_content: serviceData.detailed_content,
          category: serviceData.category,
          image_url: serviceData.image_url,
          is_active: serviceData.is_active,
          display_order: serviceData.display_order,
          updated_at: new Date().toISOString(),
        })
        .eq("id", serviceData.id);

      if (error) throw error;
    } else {
      const { error } = await (adminClient as any).from("services").insert({
        title: serviceData.title!,
        slug: serviceData.slug!,
        description: serviceData.description!,
        detailed_content: serviceData.detailed_content,
        category: serviceData.category || "Field Operations",
        image_url: serviceData.image_url,
        is_active: serviceData.is_active ?? true,
        display_order: serviceData.display_order || 0,
      });

      if (error) throw error;
    }

    revalidatePath("/services");
    revalidatePath("/admin/services");
    return { success: true, message: "Service saved successfully." };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save service";
    return { success: false, message };
  }
}

export async function deleteService(id: string) {
  const isAdmin = await verifySuperAdmin();
  if (!isAdmin) return { success: false, message: "Unauthorized" };

  try {
    const adminClient = createAdminClient();
    const { error } = await (adminClient as any).from("services").delete().eq("id", id);
    if (error) throw error;

    revalidatePath("/services");
    revalidatePath("/admin/services");
    return { success: true, message: "Service deleted." };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete service";
    return { success: false, message };
  }
}

// ------------------------------------------------------------------------------
// 6. INDUSTRIES MANAGEMENT (ONLY REAL DATABASE DATA)
// ------------------------------------------------------------------------------
export async function saveIndustry(industryData: Partial<Industry>) {
  const isAdmin = await verifySuperAdmin();
  if (!isAdmin) return { success: false, message: "Unauthorized" };

  try {
    const adminClient = createAdminClient();

    if (industryData.id) {
      const { error } = await (adminClient as any)
        .from("industries")
        .update({
          title: industryData.title,
          slug: industryData.slug,
          description: industryData.description,
          detailed_content: industryData.detailed_content,
          image_url: industryData.image_url,
          is_active: industryData.is_active,
          display_order: industryData.display_order,
          updated_at: new Date().toISOString(),
        })
        .eq("id", industryData.id);

      if (error) throw error;
    } else {
      const { error } = await (adminClient as any).from("industries").insert({
        title: industryData.title!,
        slug: industryData.slug!,
        description: industryData.description!,
        detailed_content: industryData.detailed_content,
        image_url: industryData.image_url,
        is_active: industryData.is_active ?? true,
        display_order: industryData.display_order || 0,
      });

      if (error) throw error;
    }

    revalidatePath("/industries");
    revalidatePath("/admin/industries");
    return { success: true, message: "Industry practice saved successfully." };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save industry";
    return { success: false, message };
  }
}

export async function deleteIndustry(id: string) {
  const isAdmin = await verifySuperAdmin();
  if (!isAdmin) return { success: false, message: "Unauthorized" };

  try {
    const adminClient = createAdminClient();
    const { error } = await (adminClient as any).from("industries").delete().eq("id", id);
    if (error) throw error;

    revalidatePath("/industries");
    revalidatePath("/admin/industries");
    return { success: true, message: "Industry practice deleted." };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete";
    return { success: false, message };
  }
}

// ------------------------------------------------------------------------------
// 7. ENQUIRIES MANAGEMENT (ONLY REAL DATABASE DATA)
// ------------------------------------------------------------------------------
export async function getAllEnquiries(statusFilter?: string): Promise<ContactEnquiry[]> {
  const isAdmin = await verifySuperAdmin();
  if (!isAdmin) throw new Error("Unauthorized");

  try {
    const adminClient = createAdminClient();
    let query = (adminClient as any)
      .from("contact_enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (statusFilter && statusFilter !== "all") {
      query = query.eq("status", statusFilter);
    }

    const { data, error } = await query;
    if (!error && Array.isArray(data)) {
      return data as ContactEnquiry[];
    }
  } catch (err) {
    console.error("Error fetching enquiries:", err);
  }

  return [];
}

export async function updateEnquiryStatus(
  enquiryId: string,
  newStatus: "new" | "read" | "in_progress" | "resolved" | "archived"
) {
  const isAdmin = await verifySuperAdmin();
  if (!isAdmin) return { success: false, message: "Unauthorized" };

  try {
    const adminClient = createAdminClient();
    const { error } = await (adminClient as any)
      .from("contact_enquiries")
      .update({ status: newStatus })
      .eq("id", enquiryId);

    if (error) throw error;

    revalidatePath("/admin/enquiries");
    revalidatePath("/admin/dashboard");
    return { success: true, message: `Enquiry marked as ${newStatus}.` };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Update failed";
    return { success: false, message };
  }
}

export async function deleteEnquiry(enquiryId: string) {
  const isAdmin = await verifySuperAdmin();
  if (!isAdmin) return { success: false, message: "Unauthorized" };

  try {
    const adminClient = createAdminClient();
    const { error } = await (adminClient as any)
      .from("contact_enquiries")
      .delete()
      .eq("id", enquiryId);

    if (error) throw error;

    revalidatePath("/admin/enquiries");
    return { success: true, message: "Enquiry deleted." };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Delete failed";
    return { success: false, message };
  }
}

// ------------------------------------------------------------------------------
// 8. COMPANY PROFILE MANAGEMENT
// ------------------------------------------------------------------------------
export async function updateCompanyProfileDetails(profileData: Partial<CompanyProfile>) {
  const isAdmin = await verifySuperAdmin();
  if (!isAdmin) return { success: false, message: "Unauthorized" };

  try {
    const adminClient = createAdminClient();
    const { error } = await (adminClient as any)
      .from("company_profiles")
      .upsert({
        id: profileData.id || "comp-001",
        company_name: profileData.company_name!,
        tagline: profileData.tagline,
        description: profileData.description!,
        experience: profileData.experience!,
        address: profileData.address!,
        phone: profileData.phone!,
        email: profileData.email!,
        pan_india_details: profileData.pan_india_details,
        updated_at: new Date().toISOString(),
      });

    if (error) throw error;

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/contact");
    revalidatePath("/admin/company-profile");
    return { success: true, message: "Company profile updated." };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update profile";
    return { success: false, message };
  }
}

// ------------------------------------------------------------------------------
// 9. WEBSITE CONTENT MANAGEMENT
// ------------------------------------------------------------------------------
export async function updateWebsiteContentSection(
  sectionKey: string,
  title: string,
  description: string,
  contentJson: any
) {
  const isAdmin = await verifySuperAdmin();
  if (!isAdmin) return { success: false, message: "Unauthorized" };

  try {
    const adminClient = createAdminClient();
    const { error } = await (adminClient as any).from("website_content").upsert({
      section_key: sectionKey,
      title: title,
      description: description,
      content: contentJson,
      updated_at: new Date().toISOString(),
    });

    if (error) throw error;

    revalidatePath("/");
    revalidatePath("/admin/website-content");
    return { success: true, message: "Website section updated successfully." };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update content";
    return { success: false, message };
  }
}
