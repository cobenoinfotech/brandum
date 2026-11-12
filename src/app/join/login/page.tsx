"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginUser } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  Mail,
  ArrowRight,
  LogIn,
} from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address").toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setInfoMessage("Registration complete! Please sign in with your new credentials.");
    }
    if (searchParams.get("error") === "account_deactivated") {
      setErrorMessage("Your account has been deactivated. Please contact support.");
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await loginUser(data);
      if (res.success) {
        const redirectTo = searchParams.get("redirectTo") || "/join/dashboard";
        router.push(redirectTo);
        router.refresh();
      } else {
        setErrorMessage(res.message);
      }
    } catch {
      setErrorMessage("Failed to authenticate. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-slate-200/80 shadow-xl bg-white rounded-2xl overflow-hidden">
      <CardContent className="p-6 sm:p-8 space-y-6">
        {infoMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span className="text-sm font-medium">{infoMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <span className="text-sm font-medium">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              Email Address <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              {...register("email")}
              placeholder="name@example.com"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-blue-600" />
                Password <span className="text-red-500">*</span>
              </label>
            </div>
            <Input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="navy"
              size="lg"
              className="w-full font-bold shadow-md hover:shadow-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2 text-amber-400" />
                  Sign In to Panel
                </>
              )}
            </Button>
          </div>
        </form>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>New to Brandum INC?</span>
          <Link
            href="/join/register"
            className="font-bold text-blue-600 hover:text-blue-800 underline"
          >
            Create an Account
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
              <BarChart3 className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-[#0c1a40]">
              BRANDUM <span className="text-amber-500">INC</span>
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0c1a40]">
            Member Login
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Access your research dashboard, active survey assignments, and profile.
          </p>
        </div>

        <Suspense fallback={<div className="text-center text-slate-400 py-8">Loading form...</div>}>
          <LoginForm />
        </Suspense>

        <div className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Secure HTTP-Only Cookie Session Storage</span>
        </div>
      </div>
    </div>
  );
}

