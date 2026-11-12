import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { getServices } from "@/lib/services";
import { ServicesClient } from "./ServicesClient";
import { Layers, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "17 Comprehensive Market Research Services",
  description:
    "Explore Brandum INC's 17 full-service market research solutions: F2F surveys, CLT sensory testing, Depth Interviews, Focus Groups, Mystery Audits, Census, and Healthcare Panels.",
};

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Services Header */}
      <section className="bg-[#0c1a40] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/60 text-amber-400 text-xs font-semibold">
              <Layers className="w-4 h-4 text-amber-400" />
              17 Specialized Methodologies
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Our Research Services
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              From large-scale national quantitative sampling to intimate qualitative
              ethnography, our field operations infrastructure provides end-to-end
              research fidelity across India.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Container */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServicesClient services={services} />
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-blue-900 to-[#0c1a40] text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-extrabold">
                Need a Custom Research Architecture?
              </h3>
              <p className="text-sm sm:text-base text-slate-300">
                Our senior methodologists can design multi-phase hybrid studies combining
                CLT sensory testing, CAPI quantitative surveys, and depth interviews.
              </p>
            </div>
            <Link href="/contact" className="shrink-0">
              <Button variant="gold" size="lg" className="font-bold text-base shadow-lg">
                Request Custom Proposal
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

