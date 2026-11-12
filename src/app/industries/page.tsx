import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getIndustries } from "@/lib/services";
import {
  Compass,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "11 Industry Practice Verticals | Sector-Specific Research",
  description:
    "Explore Brandum INC's specialized research practices across Retail, Agriculture, Government, Healthcare & Pharma, Real Estate, FMCG, and IT.",
};

export const revalidate = 60;

export default async function IndustriesPage() {
  const industries = await getIndustries();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-[#0c1a40] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/60 text-amber-400 text-xs font-semibold">
              <Compass className="w-4 h-4 text-amber-400" />
              11 Industry Practices
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Industry Verticals
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Every vertical requires tailored sampling quotas, regulatory awareness,
              and nuanced questioning. Discover our domain-specific frameworks.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind, index) => (
              <Card
                key={ind.id}
                id={ind.slug}
                className="overflow-hidden border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl group flex flex-col justify-between bg-white"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={
                        ind.image_url ||
                        "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=800&q=80"
                      }
                      alt={ind.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 text-[#0c1a40] text-xs font-extrabold flex items-center justify-center shadow">
                      #{ind.display_order || index + 1}
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-[#0c1a40] group-hover:text-blue-600 transition-colors">
                      {ind.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {ind.description}
                    </p>

                    {ind.detailed_content && (
                      <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                        <strong className="text-slate-700 block mb-1">Our Sector Experience:</strong>
                        {ind.detailed_content}
                      </div>
                    )}
                  </CardContent>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <Link
                    href="/contact"
                    className="text-xs font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    <span>Consult with Industry Practice Lead</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-[#0c1a40]">
            Don&apos;t See Your Specific Niche?
          </h2>
          <p className="text-slate-600 text-base max-w-2xl mx-auto">
            Our methodology is custom-engineered to adapt to unique B2B, industrial, or
            demographic cohorts across India. Talk to our research architects.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link href="/contact">
              <Button variant="navy" size="lg" className="font-bold">
                Speak to a Sector Specialist
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

