import React from "react";
import { Metadata } from "next";
import { getServices } from "@/lib/services";
import { ServicesAdminClient } from "./ServicesAdminClient";
import { Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Manage Services | Brandum Super Admin",
  description: "Add, edit, publish, or remove company research services.",
};

export const revalidate = 0;

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
        <Layers className="w-4 h-4" />
        Content Architecture
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0c1a40]">
        Services Management
      </h1>
      <ServicesAdminClient initialServices={services} />
    </div>
  );
}

