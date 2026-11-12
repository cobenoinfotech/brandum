"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Profile } from "@/types/database.types";
import { updateUserDetails, updateUserAccountStatus, deleteUserAccount } from "@/app/actions/admin";
import { formatDate } from "@/lib/utils";
import {
  User,
  Mail,
  Phone,
  Building,
  Briefcase,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2,
  UserCheck,
  UserX,
  ArrowLeft,
  Lock,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface UserDetailClientProps {
  user: Profile;
}

export function UserDetailClient({ user: initialUser }: UserDetailClientProps) {
  const router = useRouter();
  const [user, setUser] = useState<Profile>(initialUser);
  const [fullName, setFullName] = useState(user.full_name);
  const [mobileNumber, setMobileNumber] = useState(user.mobile_number);
  const [companyName, setCompanyName] = useState(user.company_name || "");
  const [designation, setDesignation] = useState(user.designation || "");

  const [isSaving, setIsSaving] = useState(false);
  const [isTogglingStatus, setIsTogglingStatus] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [feedback, setFeedback] = useState<{ success?: boolean; text?: string } | null>(null);

  const handleSaveDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback(null);

    const res = await updateUserDetails(user.id, {
      full_name: fullName,
      mobile_number: mobileNumber,
      company_name: companyName,
      designation: designation,
    });

    setIsSaving(false);
    if (res.success) {
      setUser({
        ...user,
        full_name: fullName,
        mobile_number: mobileNumber,
        company_name: companyName,
        designation: designation,
      });
      setFeedback({ success: true, text: res.message });
    } else {
      setFeedback({ success: false, text: res.message });
    }
  };

  const handleToggleStatus = async () => {
    const newStatus = user.account_status === "active" ? "inactive" : "active";
    setIsTogglingStatus(true);
    setFeedback(null);

    const res = await updateUserAccountStatus(user.id, newStatus);
    setIsTogglingStatus(false);
    if (res.success) {
      setUser({ ...user, account_status: newStatus });
      setFeedback({ success: true, text: res.message });
    } else {
      setFeedback({ success: false, text: res.message });
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Permanently delete user account "${user.full_name}"? This will delete auth credentials and associated records.`
    );
    if (!confirmed) return;

    setIsDeleting(true);
    const res = await deleteUserAccount(user.id);
    setIsDeleting(false);

    if (res.success) {
      router.push("/admin/users");
      router.refresh();
    } else {
      setFeedback({ success: false, text: res.message });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/users"
          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Users
        </Link>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-start gap-3 border ${
            feedback.success
              ? "bg-emerald-50 text-emerald-900 border-emerald-200"
              : "bg-red-50 text-red-900 border-red-200"
          }`}
        >
          {feedback.success ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <span className="text-sm font-medium">{feedback.text}</span>
        </div>
      )}

      {/* User Header Profile Card */}
      <Card className="bg-white border-slate-200/80 shadow-sm rounded-2xl overflow-hidden">
        <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
              {user.full_name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-2xl font-extrabold text-[#0c1a40]">
                  {user.full_name}
                </h2>
                <Badge
                  variant={user.account_status === "active" ? "success" : "destructive"}
                  className="capitalize font-semibold text-xs"
                >
                  {user.account_status}
                </Badge>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                User ID: {user.id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant={user.account_status === "active" ? "secondary" : "default"}
              size="sm"
              disabled={isTogglingStatus}
              onClick={handleToggleStatus}
              className="text-xs font-bold"
            >
              {isTogglingStatus ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
              ) : user.account_status === "active" ? (
                <>
                  <UserX className="w-3.5 h-3.5 mr-1.5 text-red-600" />
                  Deactivate Account
                </>
              ) : (
                <>
                  <UserCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                  Activate Account
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="text-xs text-red-600 border-red-200 hover:bg-red-50"
              disabled={isDeleting}
              onClick={handleDelete}
            >
              {isDeleting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
              ) : (
                <>
                  <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                  Delete Account
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Edit Details Form */}
      <Card className="bg-white border-slate-200/80 shadow-sm rounded-2xl">
        <CardHeader>
          <CardTitle>Edit Permitted Information</CardTitle>
          <CardDescription>
            Update field respondent details. Note: Super Admin manages accounts without accessing user passwords.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveDetails} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Full Name
                </label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Email Address (Auth Identity)
                </label>
                <Input
                  value={user.email}
                  disabled
                  className="bg-slate-100 text-slate-500 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Mobile Number
                </label>
                <Input
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Company Name
                </label>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Designation
                </label>
                <Input
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  disabled={isSaving}
                />
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" variant="navy" disabled={isSaving} className="font-bold">
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving Details...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save User Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Read-Only System Auditing Information */}
      <Card className="bg-white border-slate-200/80 shadow-sm rounded-2xl">
        <CardHeader>
          <CardTitle>System Timestamps & Security Telemetry</CardTitle>
          <CardDescription>
            Audit trace for security compliance. Passwords and token secrets are cryptographically shielded.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                <Calendar className="w-4 h-4 text-blue-600" />
                Registration Date
              </div>
              <div className="font-bold text-slate-900 text-sm">
                {formatDate(user.created_at)}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                <Clock className="w-4 h-4 text-emerald-600" />
                Last Login Date
              </div>
              <div className="font-bold text-slate-900 text-sm">
                {formatDate(user.last_login_at)}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                <Lock className="w-4 h-4 text-purple-600" />
                Password Protection
              </div>
              <div className="font-bold text-slate-900 text-sm">
                Bcrypt Hashed in Supabase Auth
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

