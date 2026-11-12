import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUserById } from "@/app/actions/admin";
import { UserDetailClient } from "./UserDetailClient";

export const metadata: Metadata = {
  title: "User Profile Inspection | Brandum Super Admin",
  description: "View and manage individual user registration details and permissions.",
};

export const revalidate = 0;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UserDetailPage({ params }: PageProps) {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <UserDetailClient user={user} />
    </div>
  );
}

