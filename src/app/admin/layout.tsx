import React from "react";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata = {
  title: "Super Admin Portal | Brandum INC",
  description: "Administrative command center for Brandum INC Market Research",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
