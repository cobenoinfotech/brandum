import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy-anon-key-for-build-time";

/**
 * Public client for static site generation, ISR, and public data queries.
 * Does not read or write cookies, allowing Next.js to cache queries on Vercel's Edge CDN.
 */
export const publicClient = createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
