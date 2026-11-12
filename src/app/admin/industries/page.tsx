import React from "react";
import { Metadata } from "next";
import { getIndustries } from "@/lib/services";
import { IndustriesAdminClient } from "./IndustriesAdminClient";
import { Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Manage Industries | Brandum Super Admin",
  description: "Add, edit, publish, or remove industry practice verticals.",
};

export const revalidate = 0;

export default async function AdminIndustriesPage() {
  const industries = await getIndustries();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
        <Compass className="w-4 h-4" />
        Sector Verticals
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0c1a40]">
        Industry Practices Management
      </h1>
      <IndustriesAdminClient initialIndustries={industries} />
    </div>
  );
}

