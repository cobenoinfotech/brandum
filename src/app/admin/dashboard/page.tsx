import React from "react";
import Link from "next/link";
import { getAdminDashboardStats } from "@/app/actions/admin";
import { formatDate } from "@/lib/utils";
import {
  Users,
  UserCheck,
  UserX,
  MailQuestion,
  Layers,
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const revalidate = 0; // Dynamic admin dashboard

export default async function AdminDashboardPage() {
  const stats = await getAdminDashboardStats();

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            Super Administration Command Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0c1a40]">
            System Overview & Metrics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time management of panel members, dynamic services, and research enquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/users">
            <Button variant="navy" size="sm" className="font-semibold">
              <Users className="w-4 h-4 mr-1.5" />
              Manage Users
            </Button>
          </Link>
          <Link href="/admin/enquiries">
            <Button variant="outline" size="sm" className="font-semibold">
              <MailQuestion className="w-4 h-4 mr-1.5" />
              View Enquiries ({stats.newEnquiries} New)
            </Button>
          </Link>
        </div>
      </div>

      {/* 5 Key Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        <Card className="bg-white border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Users
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0c1a40] mt-1">
                {stats.totalUsers}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Registered panel</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Active Users
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1">
                {stats.activeUsers}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Verified & active</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <UserCheck className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Inactive Users
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-red-600 mt-1">
                {stats.inactiveUsers}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Deactivated access</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-700 flex items-center justify-center">
              <UserX className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Enquiries
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0c1a40] mt-1">
                {stats.totalEnquiries}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Client RFPs</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <MailQuestion className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200/80 shadow-sm hover:shadow-md transition-shadow col-span-2 sm:col-span-1">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                New Unread
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1">
                {stats.newEnquiries}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Awaiting review</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Section: Recent Users & Latest Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Registrations Table */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#0c1a40] flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Recent Registrations
            </h3>
            <Link
              href="/admin/users"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <Card className="bg-white border-slate-200/80 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {stats.recentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-900">
                        <div>{user.full_name}</div>
                        <div className="text-[11px] text-slate-400 font-normal">
                          {user.company_name || "Individual"}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        <div>{user.email}</div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {user.mobile_number}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={user.account_status === "active" ? "success" : "destructive"}
                          className="capitalize text-[10px]"
                        >
                          {user.account_status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          href={`/admin/users/${user.id}`}
                          className="font-bold text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {stats.recentUsers.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-slate-400">
                        No registered users yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Latest Contact Enquiries */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#0c1a40] flex items-center gap-2">
              <MailQuestion className="w-5 h-5 text-purple-600" />
              Latest Client Enquiries
            </h3>
            <Link
              href="/admin/enquiries"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <Card className="bg-white border-slate-200/80 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100">
              {stats.recentEnquiries.map((enq) => (
                <div key={enq.id} className="p-4 hover:bg-slate-50/80 transition-colors space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                      {enq.name}
                    </span>
                    <Badge
                      variant={enq.status === "new" ? "warning" : "secondary"}
                      className="text-[10px] uppercase font-bold"
                    >
                      {enq.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-blue-700 font-semibold">
                    {enq.subject}
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {enq.message}
                  </p>
                  <div className="text-[11px] text-slate-400 flex items-center gap-3 pt-1">
                    <span>{enq.email}</span>
                    <span>•</span>
                    <span>{enq.phone}</span>
                    <span>•</span>
                    <span>{formatDate(enq.created_at)}</span>
                  </div>
                </div>
              ))}
              {stats.recentEnquiries.length === 0 && (
                <div className="py-8 text-center text-slate-400 text-xs">
                  No contact enquiries submitted yet.
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Website Management Navigation */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-[#0c1a40]">
          Company Website Management Portals
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/services"
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all hover:border-blue-400 group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600">
              Manage Services (17)
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Add, edit descriptions, toggle active status, and reorder offerings.
            </p>
          </Link>

          <Link
            href="/admin/industries"
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all hover:border-blue-400 group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 group-hover:text-amber-600">
              Manage Industries (11)
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Update industry practices, sector experience, and images.
            </p>
          </Link>

          <Link
            href="/admin/company-profile"
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all hover:border-blue-400 group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-600">
              Company Profile
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Corporate address, contact phones, PAN India details, and experience.
            </p>
          </Link>

          <Link
            href="/admin/website-content"
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all hover:border-blue-400 group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold mb-3 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 group-hover:text-purple-600">
              Website Content Blocks
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Homepage hero headlines, Why Choose Us points, and PAN India regions.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Building2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  );
}

