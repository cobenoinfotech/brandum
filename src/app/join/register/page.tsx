"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerUser } from "@/app/actions/auth";
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
  User,
  Phone,
  Building,
  Briefcase,
  ArrowRight,
} from "lucide-react";

const registerSchema = z
  .object({
    full_name: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please provide a valid email address"),
    mobile_number: z
      .string()
      .min(10, "Mobile number must be at least 10 digits")
      .regex(/^[0-9+\s-]{10,15}$/, "Invalid mobile number format"),
    company_name: z.string().optional(),
    designation: z.string().optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Include at least one uppercase letter")
      .regex(/[0-9]/, "Include at least one number"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await registerUser(data);
      if (res.success) {
        setSuccessMessage(
          "Registration successful! Redirecting to login portal..."
        );
        setTimeout(() => {
          router.push("/join/login?registered=true");
        }, 1500);
      } else {
        setErrorMessage(res.message);
      }
    } catch {
      setErrorMessage("An unexpected registration error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-xl mx-auto w-full space-y-8">
        {/* Header Branding */}
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
            Join Our Research Panel
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            Register to participate in verified market research, sensory testing,
            consumer panels, and field audits across India.
          </p>
        </div>

        {/* Card Form */}
        <Card className="border-slate-200/80 shadow-xl bg-white rounded-2xl overflow-hidden">
          <CardContent className="p-6 sm:p-8 space-y-6">
            {successMessage && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{successMessage}</span>
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
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  {...register("full_name")}
                  placeholder="e.g. Ramesh Chandra"
                  disabled={isSubmitting}
                />
                {errors.full_name && (
                  <p className="text-xs text-red-600">{errors.full_name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    {...register("email")}
                    placeholder="ramesh@example.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="tel"
                    {...register("mobile_number")}
                    placeholder="9876543210"
                    disabled={isSubmitting}
                  />
                  {errors.mobile_number && (
                    <p className="text-xs text-red-600">
                      {errors.mobile_number.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    Company Name (Optional)
                  </label>
                  <Input
                    {...register("company_name")}
                    placeholder="Organization / Self"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    Designation (Optional)
                  </label>
                  <Input
                    {...register("designation")}
                    placeholder="e.g. Field Analyst"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-blue-600" />
                    Password <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="password"
                    {...register("password")}
                    placeholder="Min 8 chars, 1 uppercase, 1 digit"
                    disabled={isSubmitting}
                  />
                  {errors.password && (
                    <p className="text-xs text-red-600">{errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-blue-600" />
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="password"
                    {...register("confirm_password")}
                    placeholder="Re-type password"
                    disabled={isSubmitting}
                  />
                  {errors.confirm_password && (
                    <p className="text-xs text-red-600">
                      {errors.confirm_password.message}
                    </p>
                  )}
                </div>
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
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Register for Field Panel
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
              Already have an account?{" "}
              <Link
                href="/join/login"
                className="font-bold text-blue-600 hover:text-blue-800 underline"
              >
                Log In Here
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Encrypted JWT Sessions & Strict ESOMAR Respondent Data Privacy</span>
        </div>
      </div>
    </div>
  );
}

