import React from "react";
import { Metadata } from "next";
import { getCompanyProfile } from "@/lib/services";
import { CompanyProfileAdminClient } from "./CompanyProfileAdminClient";
import { Building } from "lucide-react";

export const metadata: Metadata = {
  title: "Company Profile Management | Brandum Super Admin",
  description: "Update company profile details, addresses, and experience credentials.",
};

export const revalidate = 0;

export default async function AdminCompanyProfilePage() {
  const profile = await getCompanyProfile();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
        <Building className="w-4 h-4" />
        Organization Master Data
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0c1a40]">
        Company Profile Settings
      </h1>
      <CompanyProfileAdminClient initialProfile={profile} />
    </div>
  );
}

