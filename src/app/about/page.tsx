import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  Award,
  ShieldCheck,
  Users,
  MapPin,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Target,
  Eye,
  Briefcase,
  Layers,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About Us | 10+ Years of Field Research Leadership",
  description:
    "Learn about Brandum INC Market Research, our decade-long history, leadership, multi-lingual field infrastructure, and strict ESOMAR/MRSI compliance across India.",
};

export default function AboutPage() {
  const milestones = [
    {
      year: "2014",
      title: "Founding in New Delhi",
      desc: "Inception as a boutique field operations team specializing in face-to-face consumer intercept surveys.",
    },
    {
      year: "2017",
      title: "100% CAPI Digital Transition",
      desc: "Eliminated paper clipboards completely, introducing GPS-stamped tablet questionnaires with live audio QA.",
    },
    {
      year: "2019",
      title: "PAN India Expansion",
      desc: "Established permanent regional hubs in Mumbai, Bengaluru, and Kolkata with 800+ accredited investigators.",
    },
    {
      year: "2021",
      title: "Sensory & CLT Testing Labs",
      desc: "Launched controlled Central Location Testing facilities across Delhi NCR, Mumbai, and Bengaluru.",
    },
    {
      year: "2024+",
      title: "Healthcare & AI Panels",
      desc: "Expanded specialized physician & B2B panels, serving 1,200+ completed projects across 28 States and 8 UTs.",
    },
  ];

  const leadershipPrinciples = [
    {
      title: "Empirical Ground Truth",
      desc: "We believe synthetic data and armchair assumptions can never replace the nuance of standing face-to-face with a real consumer.",
      icon: Target,
    },
    {
      title: "Statistical Rigor & Honesty",
      desc: "We present raw data transparently without cherry-picking metrics to fit pre-conceived corporate narratives.",
      icon: ShieldCheck,
    },
    {
      title: "Ethical Field Governance",
      desc: "Every respondent is treated with dignity, paid fair incentives, and protected with informed consent under ESOMAR guidelines.",
      icon: Eye,
    },
    {
      title: "Speed Without Compromise",
      desc: "Agile cloud pipelines that give clients preliminary distributions within 48 to 72 hours of field launch.",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Page Header Banner */}
      <section className="bg-[#0c1a40] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/60 text-amber-400 text-xs font-semibold">
              <Award className="w-4 h-4 text-amber-400" />
              10+ Years of Field Excellence
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              About Brandum INC
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              India&apos;s leading on-ground market research and intelligence partner,
              bridging corporate strategy with deep consumer reality across 28 states.
            </p>
          </div>
        </div>
      </section>

      {/* Company Background & Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                <Sparkles className="w-3.5 h-3.5" />
                Company Background
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0c1a40]">
                Built on Rigorous Methodology & Deep Field Presence
              </h2>

              <p className="text-slate-600 leading-relaxed text-base">
                Brandum INC was established more than a decade ago with a single mission:
                to eliminate the systemic inaccuracies and third-party subcontracting
                common in Indian market research.
              </p>

              <p className="text-slate-600 leading-relaxed text-base">
                India is not a monolithic market. It is an intricate subcontinent of 1.4
                billion people speaking dozens of languages, with diverse socio-economic
                strata, varying retail infrastructure, and deeply ingrained cultural habits.
                Capturing this reality requires trained local researchers who live and breathe
                the geographies they study.
              </p>

              <p className="text-slate-600 leading-relaxed text-base">
                Over the past 10+ years, we have conducted more than 1,200 commercial, social,
                and regulatory studies, collecting in excess of 2.5 million verified respondent
                records for clients spanning Fortune 500 multinationals, domestic FMCG giants,
                fintech disruptors, and international NGOs.
              </p>

              <div className="pt-2">
                <Link href="/services">
                  <Button variant="navy" className="font-semibold">
                    Explore Our Research Capabilities
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                  alt="Brandum INC Team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Strengths */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0c1a40]">
              Our Core Company Strengths
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              The operational advantages that guarantee dependable results for every client engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-slate-200 p-6 bg-white space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0c1a40]">Direct Fieldwork Control</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We never broker or subcontract projects to unvetted freelancers. All field
                operations are commanded directly by Brandum INC regional supervisors.
              </p>
            </Card>

            <Card className="border-slate-200 p-6 bg-white space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0c1a40]">1,500+ Local Investigators</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                An active roster of bilingual and multilingual investigators across Tier-1,
                Tier-2, Tier-3, and deep rural clusters who understand local dialects.
              </p>
            </Card>

            <Card className="border-slate-200 p-6 bg-white space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0c1a40]">Triple-Tier Quality Assurance</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                GPS geo-fencing, timestamp duration checks, 100% audio audit samples, and
                immediate telephonic back-checks by an independent audit desk.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 10+ Years Milestones */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 tracking-wider uppercase bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <Award className="w-3.5 h-3.5" />
              A Decade of Growth
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0c1a40]">
              Our Journey Over 10+ Years
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A timeline of milestones that shaped Brandum INC into an industry benchmark.
            </p>
          </div>

          <div className="relative border-l-2 border-blue-600/30 ml-4 md:ml-32 space-y-12">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12 group">
                {/* Marker Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow" />
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                  <span className="text-xl font-extrabold text-amber-500 font-mono">
                    {m.year}
                  </span>
                  <div>
                    <h4 className="text-lg font-bold text-[#0c1a40]">{m.title}</h4>
                    <p className="text-sm text-slate-600 mt-1 max-w-xl">{m.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Expertise & Leadership Values */}
      <section className="py-20 bg-[#0c1a40] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Guiding Principles of Our Research Leadership
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Our leadership team comprises veteran research directors, statisticians,
              and operations heads with an average of 15+ years in market research.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadershipPrinciples.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-[#0c1a40]">
            Partner with India&apos;s Most Reliable Field Intelligence Agency
          </h2>
          <p className="text-slate-600 text-base max-w-2xl mx-auto">
            Contact us today to arrange an introductory consultation with our senior
            research directors or request sample feasibility for your target geography.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link href="/contact">
              <Button variant="navy" size="lg" className="font-bold">
                Contact Our Team
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className="font-semibold">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

