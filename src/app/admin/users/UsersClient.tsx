"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Profile } from "@/types/database.types";
import { updateUserAccountStatus, deleteUserAccount } from "@/app/actions/admin";
import { formatDate } from "@/lib/utils";
import {
  Search,
  Filter,
  UserCheck,
  UserX,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Users,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface UsersClientProps {
  initialUsers: Profile[];
}

export function UsersClient({ initialUsers }: UsersClientProps) {
  const [users, setUsers] = useState<Profile[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [actionMsg, setActionMsg] = useState<{ success?: boolean; text?: string } | null>(null);

  const pageSize = 10;

  // Filter users
  const filteredUsers = users.filter((u) => {
    const matchesStatus =
      statusFilter === "all" || u.account_status === statusFilter;

    const q = search.toLowerCase();
    const matchesSearch =
      search === "" ||
      u.full_name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.mobile_number?.includes(q) ||
      u.company_name?.toLowerCase().includes(q) ||
      u.designation?.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1;
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleToggleStatus = async (user: Profile) => {
    const newStatus = user.account_status === "active" ? "inactive" : "active";
    setLoadingId(user.id);
    setActionMsg(null);

    const res = await updateUserAccountStatus(user.id, newStatus);
    setLoadingId(null);
    if (res.success) {
      setUsers(
        users.map((u) =>
          u.id === user.id ? { ...u, account_status: newStatus } : u
        )
      );
      setActionMsg({ success: true, text: res.message });
    } else {
      setActionMsg({ success: false, text: res.message });
    }
  };

  const handleDeleteUser = async (user: Profile) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete user account "${user.full_name}" (${user.email})? This action cannot be undone.`
    );
    if (!confirmed) return;

    setLoadingId(user.id);
    setActionMsg(null);

    const res = await deleteUserAccount(user.id);
    setLoadingId(null);
    if (res.success) {
      setUsers(users.filter((u) => u.id !== user.id));
      setActionMsg({ success: true, text: res.message });
    } else {
      setActionMsg({ success: false, text: res.message });
    }
  };

  return (
    <div className="space-y-6">
      {actionMsg && (
        <div
          className={`p-4 rounded-xl flex items-start gap-3 border ${
            actionMsg.success
              ? "bg-emerald-50 text-emerald-900 border-emerald-200"
              : "bg-red-50 text-red-900 border-red-200"
          }`}
        >
          {actionMsg.success ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <span className="text-sm font-medium">{actionMsg.text}</span>
        </div>
      )}

      {/* Toolbar: Search & Filter */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name, email, phone, company..."
            className="pl-10 h-10 text-sm"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => {
                setStatusFilter("all");
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === "all"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All ({users.length})
            </button>
            <button
              onClick={() => {
                setStatusFilter("active");
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === "active"
                  ? "bg-white text-emerald-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Active ({users.filter((u) => u.account_status === "active").length})
            </button>
            <button
              onClick={() => {
                setStatusFilter("inactive");
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                statusFilter === "inactive"
                  ? "bg-white text-red-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Inactive ({users.filter((u) => u.account_status === "inactive").length})
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <Card className="bg-white border-slate-200/80 shadow-sm overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">User ID & Name</th>
                <th className="py-3.5 px-4">Email Address</th>
                <th className="py-3.5 px-4">Mobile Number</th>
                <th className="py-3.5 px-4">Company & Designation</th>
                <th className="py-3.5 px-4">Registration Date</th>
                <th className="py-3.5 px-4">Account Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    <div className="font-bold text-sm text-[#0c1a40]">{user.full_name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      ID: {user.id.substring(0, 13)}...
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {user.email}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-mono">
                    {user.mobile_number}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <div className="font-medium">{user.company_name || "—"}</div>
                    <div className="text-[11px] text-slate-400">{user.designation || "Panelist"}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 text-xs">
                    {formatDate(user.created_at)}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge
                      variant={user.account_status === "active" ? "success" : "destructive"}
                      className="capitalize text-xs font-semibold"
                    >
                      {user.account_status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <Link href={`/admin/users/${user.id}`}>
                      <Button variant="outline" size="sm" className="h-8 px-2.5 text-xs">
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        Details
                      </Button>
                    </Link>

                    <Button
                      variant={user.account_status === "active" ? "secondary" : "default"}
                      size="sm"
                      className="h-8 px-2.5 text-xs"
                      disabled={loadingId === user.id}
                      onClick={() => handleToggleStatus(user)}
                    >
                      {loadingId === user.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : user.account_status === "active" ? (
                        <>
                          <UserX className="w-3.5 h-3.5 mr-1 text-red-600" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <UserCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                          Activate
                        </>
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                      disabled={loadingId === user.id}
                      onClick={() => handleDeleteUser(user)}
                      title="Permanently Delete Account"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}

              {paginatedUsers.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <Users className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <p className="text-sm font-semibold text-slate-600">No users match your filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div>
            Showing <strong>{(currentPage - 1) * pageSize + 1}</strong> to{" "}
            <strong>
              {Math.min(currentPage * pageSize, filteredUsers.length)}
            </strong>{" "}
            of <strong>{filteredUsers.length}</strong> total users
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <span className="font-semibold text-slate-800">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

