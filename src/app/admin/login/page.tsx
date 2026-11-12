"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginAdmin, setupSuperAdmin } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Lock,
  Mail,
  KeyRound,
  ArrowRight,
  BarChart3,
  Sparkles,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("cobenoinfotech@gmail.com");
  const [password, setPassword] = useState("BrandumAdmin@123");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Setup Modal State
  const [showSetup, setShowSetup] = useState(false);
  const [setupKey, setSetupKey] = useState("brandum-secure-setup-2026");
  const [setupPassword, setSetupPassword] = useState("BrandumAdmin@123");
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [setupResult, setSetupResult] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await loginAdmin({ email, password });
      if (res.success) {
        setSuccessMessage("Authentication verified. Redirecting to admin command center...");
        setTimeout(() => {
          router.push("/admin/dashboard");
          router.refresh();
        }, 1000);
      } else {
        setErrorMessage(res.message);
      }
    } catch {
      setErrorMessage("Administrative authentication failed. Please verify credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRunSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSettingUp(true);
    setSetupResult(null);

    const res = await setupSuperAdmin(setupKey, setupPassword);
    setIsSettingUp(false);
    if (res.success) {
      setSetupResult("Super Admin account initialized! You can now log in.");
      setShowSetup(false);
      setSuccessMessage(res.message);
    } else {
      setSetupResult(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#070d1e] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="max-w-md w-full space-y-8">
        {/* Branding */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xl mx-auto border border-blue-400/30">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center justify-center gap-1.5">
            BRANDUM <span className="text-amber-400">ADMIN</span>
          </h1>
          <p className="text-xs uppercase font-bold tracking-widest text-slate-400">
            Single Super Admin Authentication Gateway
          </p>
        </div>

        {/* Login Box */}
        <Card className="border-slate-800 bg-[#0e172f] shadow-2xl rounded-2xl text-white">
          <CardContent className="p-6 sm:p-8 space-y-6">
            {successMessage && (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{successMessage}</span>
              </div>
            )}

            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-950/80 border border-red-700 text-red-300 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  Predefined Super Admin Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@branduminc.com"
                  className="bg-slate-900/80 border-slate-700 text-white placeholder:text-slate-500 focus-visible:border-blue-500"
                  disabled={isSubmitting}
                />
                <p className="text-[10px] text-slate-400">
                  Strictly restricted to single authorized administrator email.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-blue-400" />
                  Admin Master Password
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="bg-slate-900/80 border-slate-700 text-white placeholder:text-slate-500 focus-visible:border-blue-500"
                  disabled={isSubmitting}
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying Super Admin Authorization...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 mr-2 text-amber-400" />
                      Authenticate Super Admin
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Bootstrap Setup Trigger */}
            <div className="pt-4 border-t border-slate-800 text-center">
              <button
                type="button"
                onClick={() => setShowSetup(!showSetup)}
                className="text-xs text-slate-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1"
              >
                <KeyRound className="w-3 h-3 text-amber-400" />
                <span>{showSetup ? "Hide Initial Setup" : "First-time Setup / Bootstrap Single Admin"}</span>
              </button>
            </div>

            {/* Expandable Setup Drawer */}
            {showSetup && (
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 space-y-3 animate-in slide-in-from-top-2">
                <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Single Super Admin Account Initializer
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Use this tool to create or seed the single Super Admin user in Supabase Auth & admin_profiles table.
                </p>

                {setupResult && (
                  <div className="text-xs p-2.5 rounded bg-slate-800 border border-slate-700 text-blue-300">
                    {setupResult}
                  </div>
                )}

                <div className="space-y-2">
                  <Input
                    type="password"
                    value={setupKey}
                    onChange={(e) => setSetupKey(e.target.value)}
                    placeholder="Setup Authorization Key"
                    className="h-8 text-xs bg-slate-800 border-slate-700"
                  />
                  <Input
                    type="text"
                    value={setupPassword}
                    onChange={(e) => setSetupPassword(e.target.value)}
                    placeholder="Set Admin Password"
                    className="h-8 text-xs bg-slate-800 border-slate-700"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="gold"
                    className="w-full text-xs font-bold h-8"
                    onClick={handleRunSetup}
                    disabled={isSettingUp}
                  >
                    {isSettingUp ? "Initializing..." : "Create Single Admin Account"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security Disclaimers */}
        <div className="text-center text-xs text-slate-400 space-y-1">
          <p>Strictly No Public Registration &bull; Single Master Keyholder</p>
          <Link href="/" className="text-blue-400 hover:underline">
            &larr; Return to Public Corporate Site
          </Link>
        </div>
      </div>
    </div>
  );
}

