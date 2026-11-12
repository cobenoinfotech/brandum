import React from "react";
import { Metadata } from "next";
import { getAllEnquiries } from "@/app/actions/admin";
import { EnquiriesAdminClient } from "./EnquiriesAdminClient";
import { MailQuestion } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Enquiries | Brandum Super Admin",
  description: "Review, status track, and manage incoming client research proposals and RFPs.",
};

export const revalidate = 0;

export default async function AdminEnquiriesPage() {
  const enquiries = await getAllEnquiries();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">
        <MailQuestion className="w-4 h-4" />
        Client Outreach
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0c1a40]">
        Contact Enquiries & RFPs
      </h1>
      <EnquiriesAdminClient initialEnquiries={enquiries} />
    </div>
  );
}

