"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdmin } from "@/app/actions/auth";
import {
  BarChart3,
  Users,
  Layers,
  Compass,
  MailQuestion,
  Building2,
  FileText,
  LogOut,
  ExternalLink,
  ShieldCheck,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminSidebar() {
  const pathname = usePathname();

  // If on admin login page, do not show sidebar
  if (pathname === "/admin/login") {
    return null;
  }

  const navItems = [
    {
      name: "Dashboard Overview",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "User Management",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "Services (17)",
      href: "/admin/services",
      icon: Layers,
    },
    {
      name: "Industries (11)",
      href: "/admin/industries",
      icon: Compass,
    },
    {
      name: "Contact Enquiries",
      href: "/admin/enquiries",
      icon: MailQuestion,
    },
    {
      name: "Company Profile",
      href: "/admin/company-profile",
      icon: Building2,
    },
    {
      name: "Website Content",
      href: "/admin/website-content",
      icon: FileText,
    },
  ];

  return (
    <aside className="w-64 bg-[#0a1128] text-slate-300 min-h-screen flex flex-col justify-between border-r border-slate-800 shrink-0">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800/80">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-base tracking-tight text-white flex items-center gap-1">
                BRANDUM <span className="text-amber-400">ADMIN</span>
              </div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-blue-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Super Administrator
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin/dashboard"
                ? pathname === "/admin/dashboard"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-800/80 space-y-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
            View Live Website
          </span>
        </Link>

        <form action={logoutAdmin}>
          <Button
            type="submit"
            variant="outline"
            size="sm"
            className="w-full border-slate-700 text-slate-300 hover:bg-red-950/40 hover:text-red-400 hover:border-red-800 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Admin Logout
          </Button>
        </form>
      </div>
    </aside>
  );
}

