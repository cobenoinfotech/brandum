"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { submitContactEnquiry } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid business email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  company_name: z.string().optional(),
  subject: z.string().min(3, "Please provide a subject for your enquiry"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const searchParams = useSearchParams();
  const territoryParam = searchParams?.get("territory");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseState, setResponseState] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company_name: "",
      subject: territoryParam ? `Territory Feasibility - ${territoryParam}` : "",
      message: territoryParam
        ? `We are requesting a field operations and sampling quota feasibility study for the ${territoryParam} region.`
        : "",
    },
  });

  useEffect(() => {
    if (territoryParam) {
      setValue("subject", `Territory Feasibility - ${territoryParam}`);
      setValue(
        "message",
        `We are requesting a field operations and sampling quota feasibility study for the ${territoryParam} region.`
      );
    }
  }, [territoryParam, setValue]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setResponseState(null);
    try {
      const res = await submitContactEnquiry(data);
      setResponseState(res);
      if (res.success) {
        reset();
      }
    } catch {
      setResponseState({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl border border-slate-200/80">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-[#0c1a40]">Request a Proposal (RFP)</h3>
        <p className="text-slate-500 text-sm mt-1">
          Provide your project objectives and territory requirements. Our research leads respond within 24 business hours.
        </p>
      </div>

      {responseState && (
        <div
          className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
            responseState.success
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          {responseState.success ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div className="text-sm font-medium">{responseState.message}</div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <Input
              {...register("name")}
              placeholder="e.g. Rajesh Sharma"
              className={errors.name ? "border-rose-400 focus-visible:ring-rose-400" : ""}
            />
            {errors.name && (
              <p className="text-xs text-rose-500 font-medium">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              Work Email Address <span className="text-rose-500">*</span>
            </label>
            <Input
              type="email"
              {...register("email")}
              placeholder="e.g. rajesh@enterprise.com"
              className={errors.email ? "border-rose-400 focus-visible:ring-rose-400" : ""}
            />
            {errors.email && (
              <p className="text-xs text-rose-500 font-medium">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              Direct Phone / Mobile <span className="text-rose-500">*</span>
            </label>
            <Input
              type="tel"
              {...register("phone")}
              placeholder="+91 98765 43210"
              className={errors.phone ? "border-rose-400 focus-visible:ring-rose-400" : ""}
            />
            {errors.phone && (
              <p className="text-xs text-rose-500 font-medium">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              Company / Institution
            </label>
            <Input
              {...register("company_name")}
              placeholder="e.g. Apex Consumer Brands"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            Project Subject / Methodological Focus <span className="text-rose-500">*</span>
          </label>
          <Input
            {...register("subject")}
            placeholder="e.g. Pan-India CLT & F2F Sampling Quota RFP"
            className={errors.subject ? "border-rose-400 focus-visible:ring-rose-400" : ""}
          />
          {errors.subject && (
            <p className="text-xs text-rose-500 font-medium">{errors.subject.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            Research Scope & Brief <span className="text-rose-500">*</span>
          </label>
          <Textarea
            rows={5}
            {...register("message")}
            placeholder="Describe target audience demographics, sample size requirements, geographical states, and preferred timelines..."
            className={errors.message ? "border-rose-400 focus-visible:ring-rose-400" : ""}
          />
          {errors.message && (
            <p className="text-xs text-rose-500 font-medium">{errors.message.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          variant="gold"
          size="lg"
          className="w-full font-bold shadow-lg shadow-amber-500/20"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Transmitting to Research Directors...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Submit Research Request (Confidential)
            </>
          )}
        </Button>

        <p className="text-center text-[11px] text-slate-400">
          Strictly confidential. Protected under MRSI & ESOMAR research data standards.
        </p>
      </form>
    </div>
  );
}
