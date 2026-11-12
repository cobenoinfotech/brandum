import React from "react";
import { Metadata } from "next";
import { getAllUsers } from "@/app/actions/admin";
import { UsersClient } from "./UsersClient";
import { Users, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "User Management | Brandum Super Admin",
  description: "View, search, filter, activate, deactivate, or delete registered panel accounts.",
};

export const revalidate = 0;

export default async function AdminUsersPage() {
  const users = await getAllUsers();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            Field Panel Management
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0c1a40]">
            Registered Users & Panelists
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            View complete registration details, manage account statuses, or delete profiles.
          </p>
        </div>
      </div>

      <UsersClient initialUsers={users} />
    </div>
  );
}

