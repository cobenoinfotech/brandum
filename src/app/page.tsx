import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BarChart3,
  CheckCircle2,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Users,
  Award,
  Globe2,
  FileCheck,
  Sparkles,
  Layers,
  ChevronRight,
  PhoneCall,
  Search,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getServices, getIndustries, getCompanyProfile } from "@/lib/services";
import { LocationExplorer } from "@/components/home/LocationExplorer";

export const revalidate = 60; // revalidate every 60 seconds

export default async function HomePage() {
  const [services, industries, company] = await Promise.all([
    getServices(),
    getIndustries(),
    getCompanyProfile(),
  ]);

  const featuredServices = services.slice(0, 6);
  const featuredIndustries = industries.slice(0, 8);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0c1a40] text-white overflow-hidden py-20 lg:py-28">
        {/* Abstract background decorative elements */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/70 border border-blue-700/60 text-amber-400 text-xs sm:text-sm font-semibold tracking-wide">
                <Award className="w-4 h-4 text-amber-400" />
                <span>10+ Years of Field Research Excellence</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Empowering Decisions with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300">
                  High-Integrity
                </span>{" "}
                Ground Intelligence
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Brandum INC is India&apos;s trusted full-service market research and field
                operations agency. We transform complex consumer behavior into
                actionable growth strategies with audited face-to-face fieldwork,
                sensory testing, retail audits, and pan-India consumer panels.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link href="/services">
                  <Button variant="gold" size="lg" className="font-bold shadow-lg">
                    Explore 17 Services
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/join/register">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-slate-500 text-white hover:bg-slate-800"
                  >
                    Join Field Panel
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-slate-300 hover:text-white"
                  >
                    Request a Proposal
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>GPS Geo-stamped CAPI</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Audio Audit QA</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>ESOMAR & MRSI Compliant</span>
                </div>
              </div>
            </div>

            {/* Hero Stats Card / Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-blue-950/90 p-6 sm:p-8 border border-slate-700/80 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                  <div>
                    <h3 className="text-lg font-bold text-white">PAN India Footprint</h3>
                    <p className="text-xs text-slate-400">Verified Empirical Field Ops</p>
                  </div>
                  <Badge variant="navy" className="bg-blue-600/40 text-blue-200 border-blue-500/50">
                    Active Operations
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 py-6">
                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">
                      10+
                    </div>
                    <div className="text-xs font-medium text-slate-300 mt-1">
                      Years Field Experience
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-3xl sm:text-4xl font-extrabold text-blue-400">
                      1,200+
                    </div>
                    <div className="text-xs font-medium text-slate-300 mt-1">
                      Studies Executed
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">
                      2.5M+
                    </div>
                    <div className="text-xs font-medium text-slate-300 mt-1">
                      Survey Responses Captured
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-3xl sm:text-4xl font-extrabold text-sky-400">
                      28+8
                    </div>
                    <div className="text-xs font-medium text-slate-300 mt-1">
                      States & UTs Covered
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-900/30 border border-blue-700/50 text-xs text-blue-200 flex items-center justify-between">
                  <span>Field Team Capacity:</span>
                  <span className="font-bold text-white">1,500+ Local Investigators</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPANY INTRODUCTION & 10+ YEARS EXPERIENCE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] border border-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80"
                  alt="Market Research Field Execution"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a40]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
                    Quality Controlled Operations
                  </div>
                  <div className="text-lg font-bold">
                    Real-time field validation across Urban & Deep Rural India
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#0c1a40] text-white p-4 rounded-xl shadow-xl border border-slate-700 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-amber-500 flex items-center justify-center font-black text-xl text-white">
                  10+
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-300">Years of</div>
                  <div className="text-sm font-bold text-white">Research Excellence</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                <Sparkles className="w-3.5 h-3.5" />
                About Brandum INC
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0c1a40] leading-tight">
                Decade-Long Mastery in Quantitative & Qualitative Field Research
              </h2>

              <p className="text-slate-600 leading-relaxed text-base">
                Established with a vision to deliver unadulterated field data,{" "}
                <strong>Brandum INC</strong> has grown into a cornerstone research partner
                for Fortune 500 enterprises, prominent FMCG corporations, government bodies,
                and social policy think tanks.
              </p>

              <p className="text-slate-600 leading-relaxed text-base">
                Unlike agencies that subcontract fieldwork, we maintain dedicated local
                supervisory infrastructure across every major Indian economic cluster. Our
                investigators speak 22 recognized regional languages, understanding local
                nuances, cultural mores, and dialectal idioms that off-the-shelf surveys miss.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Direct Fieldwork Control</h4>
                    <p className="text-xs text-slate-500">In-house trained investigators with zero third-party leakage.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Digital CAPI Precision</h4>
                    <p className="text-xs text-slate-500">Tablet-based data collection with live GPS, time & audio stamping.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">B2B & Hard-to-Reach Panels</h4>
                    <p className="text-xs text-slate-500">Access to C-level executives, doctors, engineers, and rural farmers.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">End-to-End Analytics</h4>
                    <p className="text-xs text-slate-500">From raw data cleansing in SPSS/R to executive board decks.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/about">
                  <Button variant="navy" className="font-semibold">
                    Read Our Company Story
                    <ChevronRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES OVERVIEW */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 tracking-wider uppercase bg-blue-100/60 px-3 py-1 rounded-full">
                <Layers className="w-3.5 h-3.5" />
                Comprehensive Capabilities
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0c1a40]">
                Full-Spectrum Research & Field Services
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
                We offer 17 specialized research and operational services designed to
                meet rigorous corporate, regulatory, and demographic requirements.
              </p>
            </div>

            <Link href="/services">
              <Button variant="navy" className="shrink-0 font-semibold">
                View All 17 Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, idx) => (
              <Card
                key={service.id}
                className="overflow-hidden border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl group flex flex-col"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={
                      service.image_url ||
                      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
                    }
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="navy" className="text-[11px] font-medium shadow">
                      {service.category || "Service"}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 text-[#0c1a40] text-xs font-bold flex items-center justify-center shadow">
                    #{idx + 1}
                  </div>
                </div>

                <CardContent className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#0c1a40] group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-700">
                    <Link
                      href={`/services#${service.slug}`}
                      className="inline-flex items-center gap-1 group-hover:gap-2 transition-all hover:underline"
                    >
                      <span>Explore Methodology</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INDUSTRY VERTICALS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 tracking-wider uppercase bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <Compass className="w-3.5 h-3.5" />
              Sectors We Serve
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0c1a40]">
              Deep Domain Expertise Across 11 Key Industries
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Every market sector has unique operational dynamics and customer habits.
              Our dedicated industry practice teams bring specialized research frameworks.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredIndustries.map((ind) => (
              <Link
                key={ind.id}
                href={`/industries#${ind.slug}`}
                className="group relative rounded-xl p-5 border border-slate-200 bg-white hover:border-blue-400 hover:shadow-lg transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#0c1a40] group-hover:text-blue-600 transition-colors">
                    {ind.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                    {ind.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
                  <span>Learn more</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/industries">
              <Button variant="outline" size="lg" className="border-slate-300 text-slate-800 font-semibold">
                View All 11 Industry Practices
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="py-20 bg-[#0c1a40] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 tracking-wider uppercase bg-blue-900/60 px-3 py-1 rounded-full border border-blue-700">
              <ShieldCheck className="w-3.5 h-3.5" />
              Quality & Trust Framework
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Why Corporate Leaders Choose Brandum INC
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Market decisions worth millions cannot be made on suspect data. Here is
              how we protect research integrity at every phase of the project lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Uncompromised Data Integrity</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Triple-layer QA protocols including GPS geo-stamping on surveys, 100%
                audio-audit recording checks, and independent telephonic supervisor re-contact.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-600/30 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">PAN India Operational Reach</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Field investigators located across 28 states and 8 union territories,
                enabling simultaneous multi-state rollout without prohibitive travel lag.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Rapid Field Turnaround</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Automated CAPI synchronization with cloud pipelines delivers raw
                frequency counts in as little as 48 hours for fast-moving business decisions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Domain-Specialized Moderators</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Depth interviews and focus groups facilitated by senior researchers with
                at least a decade of domain expertise in medicine, FMCG, or industrial tech.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Ethical Standards & Privacy</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Fully compliant with the ESOMAR International Code and MRSI guidelines,
                guaranteeing respondent anonymity, digital consent, and data encryption.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-600/30 border border-sky-500/40 flex items-center justify-center text-sky-400">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Customized Hybrid Frameworks</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Bespoke integration of quantitative statistical scale with qualitative
                ethnography to explain not just what consumers buy, but why they buy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PAN INDIA PRESENCE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                <MapPin className="w-3.5 h-3.5" />
                Nationwide Field Network
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0c1a40] leading-tight">
                PAN India Operational Strength Across All Geographies
              </h2>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Whether assessing consumer sentiment in the heart of Mumbai or auditing
                fertilizer distribution in remote rural Punjab, Brandum INC maintains an
                active, accredited investigator footprint.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="text-sm font-bold text-[#0c1a40]">North Hub (Delhi NCR)</div>
                  <div className="text-xs text-slate-500 mt-1">450+ Field Surveyors</div>
                  <div className="text-[11px] text-slate-400 mt-1">Delhi, UP, Punjab, Haryana, Rajasthan</div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="text-sm font-bold text-[#0c1a40]">West Hub (Mumbai)</div>
                  <div className="text-xs text-slate-500 mt-1">380+ Field Surveyors</div>
                  <div className="text-[11px] text-slate-400 mt-1">Maharashtra, Gujarat, MP, Goa</div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="text-sm font-bold text-[#0c1a40]">South Hub (Bengaluru)</div>
                  <div className="text-xs text-slate-500 mt-1">420+ Field Surveyors</div>
                  <div className="text-[11px] text-slate-400 mt-1">Karnataka, Tamil Nadu, Telangana, Kerala</div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <div className="text-sm font-bold text-[#0c1a40]">East Hub (Kolkata)</div>
                  <div className="text-xs text-slate-500 mt-1">350+ Field Surveyors</div>
                  <div className="text-[11px] text-slate-400 mt-1">West Bengal, Bihar, Odisha, North-East</div>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/contact">
                  <Button variant="navy" className="font-semibold">
                    Discuss Territory Scope with Our Leads
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 aspect-[4/3] bg-slate-900">
                <Image
                  src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80"
                  alt="PAN India Research"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1a40] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <Badge variant="gold" className="text-xs font-bold">
                    Multi-Lingual Capabilities
                  </Badge>
                  <h4 className="text-xl font-bold">
                    Conducting interviews in 22 Official Indian Languages
                  </h4>
                  <p className="text-xs text-slate-300">
                    Hindi, Bengali, Marathi, Telugu, Tamil, Gujarati, Urdu, Kannada, Odia, Malayalam, Punjabi, Assamese, and regional dialects.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Fast Location & Capacity Explorer */}
          <div className="mt-16">
            <LocationExplorer />
          </div>
        </div>
      </section>

      {/* 7. CONTACT CTA BANNER */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-[#0c1a40] to-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest bg-blue-950/80 px-3.5 py-1.5 rounded-full border border-blue-800">
            <PhoneCall className="w-3.5 h-3.5" />
            Start Your Next Research Study
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold max-w-3xl mx-auto leading-tight">
            Ready to Unlock Ground Truth and Accelerated Market Growth?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Contact our senior research directors today for a complimentary methodology consultation and territory feasibility study.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/contact">
              <Button variant="gold" size="lg" className="font-bold text-base shadow-xl">
                Submit Research RFP
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/join/register">
              <Button
                variant="outline"
                size="lg"
                className="border-slate-500 text-white hover:bg-slate-800 font-semibold"
              >
                Join Panel Member
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
