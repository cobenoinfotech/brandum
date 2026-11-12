export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          mobile_number: string;
          company_name: string | null;
          designation: string | null;
          account_status: "active" | "inactive";
          created_at: string;
          updated_at: string;
          last_login_at: string | null;
        };
        Insert: {
          id: string;
          full_name: string;
          email: string;
          mobile_number: string;
          company_name?: string | null;
          designation?: string | null;
          account_status?: "active" | "inactive";
          created_at?: string;
          updated_at?: string;
          last_login_at?: string | null;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          mobile_number?: string;
          company_name?: string | null;
          designation?: string | null;
          account_status?: "active" | "inactive";
          created_at?: string;
          updated_at?: string;
          last_login_at?: string | null;
        };
      };
      admin_profiles: {
        Row: {
          id: string;
          auth_user_id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          auth_user_id: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          auth_user_id?: string;
          email?: string;
          created_at?: string;
        };
      };
      company_profiles: {
        Row: {
          id: string;
          company_name: string;
          tagline: string | null;
          description: string;
          experience: string;
          address: string;
          phone: string;
          email: string;
          pan_india_details: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_name: string;
          tagline?: string | null;
          description: string;
          experience: string;
          address: string;
          phone: string;
          email: string;
          pan_india_details?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_name?: string;
          tagline?: string | null;
          description?: string;
          experience?: string;
          address?: string;
          phone?: string;
          email?: string;
          pan_india_details?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          detailed_content: string | null;
          category: string | null;
          image_url: string | null;
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description: string;
          detailed_content?: string | null;
          category?: string | null;
          image_url?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string;
          detailed_content?: string | null;
          category?: string | null;
          image_url?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      industries: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          detailed_content: string | null;
          image_url: string | null;
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description: string;
          detailed_content?: string | null;
          image_url?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string;
          detailed_content?: string | null;
          image_url?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      contact_enquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          company_name: string | null;
          subject: string;
          message: string;
          status: "new" | "read" | "in_progress" | "resolved" | "archived";
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          company_name?: string | null;
          subject: string;
          message: string;
          status?: "new" | "read" | "in_progress" | "resolved" | "archived";
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          company_name?: string | null;
          subject?: string;
          message?: string;
          status?: "new" | "read" | "in_progress" | "resolved" | "archived";
          created_at?: string;
        };
      };
      website_content: {
        Row: {
          id: string;
          section_key: string;
          title: string;
          description: string | null;
          content: Json;
          image_url: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          section_key: string;
          title: string;
          description?: string | null;
          content?: Json;
          image_url?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          section_key?: string;
          title?: string;
          description?: string | null;
          content?: Json;
          image_url?: string | null;
          updated_at?: string;
        };
      };
    };
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type AdminProfile = Database["public"]["Tables"]["admin_profiles"]["Row"];
export type CompanyProfile = Database["public"]["Tables"]["company_profiles"]["Row"];
export type Service = Database["public"]["Tables"]["services"]["Row"];
export type Industry = Database["public"]["Tables"]["industries"]["Row"];
export type ContactEnquiry = Database["public"]["Tables"]["contact_enquiries"]["Row"];
export type WebsiteContent = Database["public"]["Tables"]["website_content"]["Row"];

