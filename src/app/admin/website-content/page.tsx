import React from "react";
import { Metadata } from "next";
import { initialWebsiteContent } from "@/lib/data";
import { WebsiteContentAdminClient } from "./WebsiteContentAdminClient";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Website Content Management | Brandum Super Admin",
  description: "Manage dynamic hero banners, Why Choose Us, and PAN India content blocks.",
};

export const revalidate = 0;

export default async function AdminWebsiteContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">
        <FileText className="w-4 h-4" />
        Dynamic Landing Page Content
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0c1a40]">
        Website Content Management
      </h1>
      <WebsiteContentAdminClient initialContent={initialWebsiteContent} />
    </div>
  );
}

