import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/types/database.types";
import { UserDashboardClient } from "./UserDashboardClient";

export const metadata: Metadata = {
  title: "Field Panel Member Dashboard | Brandum INC",
  description: "View and manage your Brandum INC research panel registration and profile details.",
};

export default async function UserDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/join/login");
  }

  // Fetch user profile from database
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  // If profile is inactive, redirect out
  const profile = data as Profile | null;
  if (profile && profile.account_status === "inactive") {
    redirect("/join/login?error=account_deactivated");
  }

  // Fallback demo profile if table row was not populated yet
  const userProfile: Profile = profile || {
    id: user.id,
    full_name: (user.user_metadata?.full_name as string) || "Panel Member",
    email: user.email || "user@branduminc.com",
    mobile_number: (user.user_metadata?.mobile_number as string) || "9876543210",
    company_name: null,
    designation: "Panel Respondent",
    account_status: "active",
    created_at: user.created_at || new Date().toISOString(),
    updated_at: new Date().toISOString(),
    last_login_at: user.last_sign_in_at || new Date().toISOString(),
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <UserDashboardClient profile={userProfile} />
      </div>
    </div>
  );
}

