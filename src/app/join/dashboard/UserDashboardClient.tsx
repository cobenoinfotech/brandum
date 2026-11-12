"use client";

import React, { useState } from "react";
import { Profile } from "@/types/database.types";
import { updateUserProfile, changeUserPassword, logoutUser } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  LogOut,
  KeyRound,
  FileCheck2,
  Activity,
  Layers,
} from "lucide-react";

interface UserDashboardClientProps {
  profile: Profile;
}

export function UserDashboardClient({ profile }: UserDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "edit_profile" | "change_password">("overview");

  // Edit Profile Form State
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ success?: boolean; text?: string } | null>(null);
  const [fullName, setFullName] = useState(profile.full_name);
  const [mobileNumber, setMobileNumber] = useState(profile.mobile_number);
  const [companyName, setCompanyName] = useState(profile.company_name || "");
  const [designation, setDesignation] = useState(profile.designation || "");

  // Change Password Form State
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [passMsg, setPassMsg] = useState<{ success?: boolean; text?: string } | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    setProfileMsg(null);

    const res = await updateUserProfile({
      full_name: fullName,
      mobile_number: mobileNumber,
      company_name: companyName,
      designation: designation,
    });

    setIsUpdatingProfile(false);
    setProfileMsg({ success: res.success, text: res.message });
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPassMsg({ success: false, text: "New passwords do not match" });
      return;
    }
    setIsChangingPass(true);
    setPassMsg(null);

    const res = await changeUserPassword({
      current_password: currentPassword,
      new_password: newPassword,
      confirm_new_password: confirmPassword,
    });

    setIsChangingPass(false);
    setPassMsg({ success: res.success, text: res.message });
    if (res.success) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
            {profile.full_name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-2xl font-extrabold text-[#0c1a40]">
                {profile.full_name}
              </h2>
              <Badge
                variant={profile.account_status === "active" ? "success" : "destructive"}
                className="capitalize"
              >
                {profile.account_status}
              </Badge>
            </div>
            <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-2">
              <span>{profile.email}</span>
              <span>•</span>
              <span>PAN India Field Panel Member</span>
            </p>
          </div>
        </div>

        <form action={logoutUser}>
          <Button
            type="submit"
            variant="outline"
            className="border-slate-300 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </form>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
            activeTab === "overview"
              ? "bg-[#0c1a40] text-white shadow"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Profile Overview
        </button>
        <button
          onClick={() => setActiveTab("edit_profile")}
          className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
            activeTab === "edit_profile"
              ? "bg-[#0c1a40] text-white shadow"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Edit Profile
        </button>
        <button
          onClick={() => setActiveTab("change_password")}
          className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
            activeTab === "change_password"
              ? "bg-[#0c1a40] text-white shadow"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Security & Password
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 bg-white border-slate-200/80">
            <CardHeader>
              <CardTitle>Registration Details</CardTitle>
              <CardDescription>
                Verified personal and professional panel information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Full Name
                  </span>
                  <span className="text-sm font-bold text-slate-900 mt-1 block">
                    {profile.full_name}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Email Address
                  </span>
                  <span className="text-sm font-bold text-slate-900 mt-1 block">
                    {profile.email}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Mobile Number
                  </span>
                  <span className="text-sm font-bold text-slate-900 mt-1 block">
                    {profile.mobile_number}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Company / Organization
                  </span>
                  <span className="text-sm font-bold text-slate-900 mt-1 block">
                    {profile.company_name || "Not specified"}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Designation / Role
                  </span>
                  <span className="text-sm font-bold text-slate-900 mt-1 block">
                    {profile.designation || "Panel Respondent"}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Account Status
                  </span>
                  <span className="text-sm font-bold text-emerald-700 mt-1 block capitalize">
                    {profile.account_status}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Member Since: {formatDate(profile.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Last Active: {formatDate(profile.last_login_at)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Info & Stats */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-900 to-[#0c1a40] text-white border-0 shadow-lg">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-semibold text-amber-400 tracking-wider">
                    Panel Status
                  </span>
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold">Verified Respondent</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your profile is active in Brandum INC&apos;s PAN India sampling pool.
                  You will receive invitations for consumer research, tasting labs, and phone surveys.
                </p>
                <div className="pt-2">
                  <Button
                    variant="gold"
                    size="sm"
                    className="w-full text-xs font-bold"
                    onClick={() => setActiveTab("edit_profile")}
                  >
                    Keep Profile Updated
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200/80">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Panel Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Confidentiality of survey questions is mandatory.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Honest, uninfluenced feedback is required.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Incentives are credited after supervisor QA audit.</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Tab 2: Edit Profile */}
      {activeTab === "edit_profile" && (
        <Card className="max-w-2xl bg-white border-slate-200/80">
          <CardHeader>
            <CardTitle>Update Profile Details</CardTitle>
            <CardDescription>
              Modify your permitted personal and contact information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {profileMsg && (
              <div
                className={`p-4 rounded-xl flex items-start gap-3 border ${
                  profileMsg.success
                    ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                    : "bg-red-50 text-red-900 border-red-200"
                }`}
              >
                {profileMsg.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                )}
                <span className="text-sm font-medium">{profileMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Full Name
                </label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  disabled={isUpdatingProfile}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Email Address (Read-only)
                </label>
                <Input value={profile.email} disabled className="bg-slate-100 text-slate-500" />
                <p className="text-[11px] text-slate-400">
                  Email cannot be changed directly for security and verification reasons.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Mobile Number
                </label>
                <Input
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                  disabled={isUpdatingProfile}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Company / Organization
                  </label>
                  <Input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    disabled={isUpdatingProfile}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Designation
                  </label>
                  <Input
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    disabled={isUpdatingProfile}
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <Button
                  type="submit"
                  variant="navy"
                  disabled={isUpdatingProfile}
                  className="font-bold"
                >
                  {isUpdatingProfile ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    "Save Profile Changes"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("overview")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Tab 3: Security & Password */}
      {activeTab === "change_password" && (
        <Card className="max-w-xl bg-white border-slate-200/80">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Ensure your account is protected with a strong, unique password.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {passMsg && (
              <div
                className={`p-4 rounded-xl flex items-start gap-3 border ${
                  passMsg.success
                    ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                    : "bg-red-50 text-red-900 border-red-200"
                }`}
              >
                {passMsg.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                )}
                <span className="text-sm font-medium">{passMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Current Password
                </label>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  placeholder="Enter current password"
                  disabled={isChangingPass}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  New Password
                </label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="Min 8 chars, 1 uppercase, 1 digit"
                  disabled={isChangingPass}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Confirm New Password
                </label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Re-type new password"
                  disabled={isChangingPass}
                />
              </div>

              <div className="pt-2 flex gap-3">
                <Button
                  type="submit"
                  variant="navy"
                  disabled={isChangingPass}
                  className="font-bold"
                >
                  {isChangingPass ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating Password...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("overview")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

