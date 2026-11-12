import React, { Suspense } from "react";
import { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Building2,
  HelpCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact Us & Research Enquiries | PAN India Offices",
  description:
    "Get in touch with Brandum INC Market Research for RFPs, territory feasibility, methodology consultations, and field operations across India.",
};

export default function ContactPage() {
  const regionalOffices = [
    {
      region: "North & Corporate Headquarters",
      city: "New Delhi & NCR",
      address: "Corporate Towers, Level 4, Business Bay, New Delhi, India",
      phone: "+91 11 4982 7700",
      email: "delhi@branduminc.com",
    },
    {
      region: "West Regional Hub",
      city: "Mumbai",
      address: "Bandra-Kurla Complex (BKC), Commercial Hub, Mumbai, Maharashtra",
      phone: "+91 22 6194 3300",
      email: "mumbai@branduminc.com",
    },
    {
      region: "South Regional Hub",
      city: "Bengaluru",
      address: "Residency Road, Tech & Research Park, Bengaluru, Karnataka",
      phone: "+91 80 4421 9900",
      email: "bengaluru@branduminc.com",
    },
    {
      region: "East Regional Hub",
      city: "Kolkata",
      address: "Sector V, Salt Lake Electronic Complex, Kolkata, West Bengal",
      phone: "+91 33 2357 8800",
      email: "kolkata@branduminc.com",
    },
  ];

  const faqs = [
    {
      q: "What is your typical turnaround time for preliminary data?",
      a: "Thanks to our tablet-based CAPI workflows with real-time cloud sync, preliminary frequency distributions and quota counts are typically available within 48 to 72 hours of field launch.",
    },
    {
      q: "How do you guarantee respondent authenticity and quality control?",
      a: "Every interview is verified through a triple-layer protocol: GPS geo-stamping at respondent coordinates, 100% audio recording audit samples, and independent telephonic supervisor re-checks on a minimum 20% sample.",
    },
    {
      q: "Can you execute studies in regional Indian dialects?",
      a: "Yes. Our field investigator network covers 28 States and 8 Union Territories and speaks 22 recognized regional languages plus local socio-cultural dialects.",
    },
    {
      q: "How can individuals or field investigators join your research panel?",
      a: "You can register directly through our Join Panel portal (/join/register) to be notified of paid survey opportunities and focus groups matching your demographic profile.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-[#0c1a40] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Contact & Project Enquiries
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Connect with our research directors, discuss study scopes, or request a
              formal proposal for quantitative, qualitative, or retail audit engagements.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form & Info Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Info & Value Prop */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0c1a40]">
                  Get in Touch with Our Research Directors
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We reply to all research RFPs and feasibility inquiries within 24
                  business hours with territory availability and sampling recommendations.
                </p>
              </div>

              {/* Direct Details Box */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Headquarters
                    </h4>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">
                      Corporate Towers, Level 4, Business Bay, New Delhi & Mumbai, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Direct Inquiries
                    </h4>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">
                      +91 11 4982 7700 / +91 98110 55432
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Official Email
                    </h4>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">
                      contact@branduminc.com / rfp@branduminc.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Business Hours
                    </h4>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">
                      Monday – Saturday: 9:30 AM – 6:30 PM IST
                    </p>
                  </div>
                </div>
              </div>

              {/* Security & Confidentiality */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-blue-900 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Strict Non-Disclosure Agreement (NDA):</strong> All project
                  concepts, sample designs, and questionnaire drafts submitted through this
                  portal are protected under our mandatory institutional confidentiality protocol.
                </p>
              </div>
            </div>

            {/* Right: The Interactive Form */}
            <div className="lg:col-span-7">
              <Suspense
                fallback={
                  <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200/80 animate-pulse space-y-6">
                    <div className="h-8 w-48 bg-slate-200 rounded-lg" />
                    <div className="h-4 w-72 bg-slate-100 rounded" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-10 bg-slate-100 rounded-lg" />
                      <div className="h-10 bg-slate-100 rounded-lg" />
                    </div>
                    <div className="h-32 bg-slate-100 rounded-lg" />
                    <div className="h-12 bg-amber-200 rounded-xl" />
                  </div>
                }
              >
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Field Hubs */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-[#0c1a40]">
              Regional Field Command Centers
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Direct local management across North, South, East, and West India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {regionalOffices.map((office, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-md transition-all space-y-2"
              >
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  {office.region}
                </div>
                <h4 className="text-base font-bold text-slate-900">{office.city}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{office.address}</p>
                <div className="pt-2 text-xs font-semibold text-slate-800">
                  {office.phone}
                </div>
                <div className="text-xs text-slate-500">{office.email}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0c1a40]">
              Quick Answers to Common Enquiries
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm space-y-2"
              >
                <h4 className="text-base font-bold text-slate-900">{faq.q}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

