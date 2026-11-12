import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { Database } from "@/types/database.types";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const pathname = request.nextUrl.pathname;

  // Ultra-fast path: bypass auth overhead for purely public static/marketing pages
  const isProtectedAdmin = pathname.startsWith("/admin");
  const isProtectedJoin =
    pathname.startsWith("/join/dashboard") ||
    pathname.startsWith("/join/profile") ||
    pathname === "/join/login";

  if (!isProtectedAdmin && !isProtectedJoin) {
    return supabaseResponse;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dnkcsiphnjqgprsxauqi.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy-anon-key";

  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse;
  }

  const supabase = createServerClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const superAdminEmail = (process.env.SUPER_ADMIN_EMAIL || "cobenoinfotech@gmail.com").toLowerCase();

  // 1. ADMIN ROUTE PROTECTION
  if (pathname.startsWith("/admin") && pathname !== "/admin/login" && pathname !== "/admin/setup") {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(url);
    }

    // Check if user is the super admin
    const userEmail = (user.email || "").toLowerCase();
    if (userEmail !== superAdminEmail) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("error", "unauthorized");
      return NextResponse.redirect(url);
    }
  }

  // If already logged in as super admin and visiting /admin/login, redirect to /admin/dashboard
  if (pathname === "/admin/login" && user) {
    const userEmail = (user.email || "").toLowerCase();
    if (userEmail === superAdminEmail) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/dashboard";
      return NextResponse.redirect(url);
    }
  }

  // 2. JOIN PANEL (USER DASHBOARD) PROTECTION
  if (pathname.startsWith("/join/dashboard") || pathname.startsWith("/join/profile")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/join/login";
      url.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(url);
    }

    // Check account status in profiles
    try {
      const { data } = await supabase
        .from("profiles")
        .select("account_status")
        .eq("id", user.id)
        .maybeSingle();

      const profile = data as { account_status?: string } | null;

      if (profile && profile.account_status === "inactive") {
        const url = request.nextUrl.clone();
        url.pathname = "/join/login";
        url.searchParams.set("error", "account_deactivated");
        return NextResponse.redirect(url);
      }
    } catch {
      // allow access if profile query fails
    }
  }

  // If already logged in and visiting /join/login, redirect to /join/dashboard
  if (pathname === "/join/login" && user) {
    const userEmail = (user.email || "").toLowerCase();
    if (userEmail !== superAdminEmail) {
      const url = request.nextUrl.clone();
      url.pathname = "/join/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
