import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/database.types";

export function createClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy-anon-key-for-build-time";

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}
