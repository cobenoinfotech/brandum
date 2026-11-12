"use server";

import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please provide a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  company_name: z.string().optional().or(z.literal("")),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export async function submitContactEnquiry(formData: ContactFormData) {
  try {
    const validated = contactSchema.parse(formData);

    const adminClient = createAdminClient();

    const { error } = await (adminClient as any).from("contact_enquiries").insert({
      name: validated.name,
      email: validated.email,
      phone: validated.phone,
      company_name: validated.company_name || null,
      subject: validated.subject,
      message: validated.message,
      status: "new",
    });

    if (error) {
      console.error("Supabase insert enquiry error:", error.message);
      return { success: false, message: `Database error: ${error.message}` };
    }

    return { success: true, message: "Thank you! Your enquiry has been received. Our research team will contact you within 24 hours." };
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return { success: false, message: err.issues[0]?.message || "Validation failed" };
    }
    const message = err instanceof Error ? err.message : "Failed to submit enquiry. Please try again.";
    return { success: false, message };
  }
}
