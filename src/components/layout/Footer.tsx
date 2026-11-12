"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

export function Footer() {
  const pathname = usePathname();

  // Don't show public footer on admin pages
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-[#0a1128] text-slate-300 border-t border-slate-800">
      {/* Top Banner / PAN India Accent */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 py-6 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-semibold tracking-wide">
              PAN India Operations: Active Field Force Across 28 States & 8 Union Territories
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-blue-200">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> ESOMAR Code Compliant
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> MRSI Registered
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 10+ Years Trust
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Company Profile */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight text-white flex items-center gap-1.5">
                  BRANDUM <span className="text-amber-400">INC</span>
                </span>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                  Market Research & Field Intelligence
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Brandum INC is a full-service market research firm specializing in
              face-to-face consumer interviews, central location sensory tests,
              mystery audits, industrial surveys, and pan-India empirical data
              collection with unmatched quality control.
            </p>

            <div className="flex flex-col space-y-2 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                <span>
                  Corporate Towers, Level 4, Business Bay, New Delhi & Mumbai, India
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+91 11 4982 7700 / +91 98110 55432</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>contact@branduminc.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-blue-500" /> Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-blue-500" /> About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-blue-500" /> Services (17)
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-blue-500" /> Industries (11)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-blue-500" /> Contact & Enquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Key Research Capabilities */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
              Core Capabilities
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/services#face-to-face-connect" className="hover:text-amber-400 transition-colors">
                  Face-to-Face Connect
                </Link>
              </li>
              <li>
                <Link href="/services#clt-central-location-test" className="hover:text-amber-400 transition-colors">
                  Central Location Test (CLT)
                </Link>
              </li>
              <li>
                <Link href="/services#mystery-audit" className="hover:text-amber-400 transition-colors">
                  Mystery & Physical Audits
                </Link>
              </li>
              <li>
                <Link href="/services#depth-interview" className="hover:text-amber-400 transition-colors">
                  KOL Depth Interviews
                </Link>
              </li>
              <li>
                <Link href="/services#cati-and-online-data-collection" className="hover:text-amber-400 transition-colors">
                  CATI & Digital Panels
                </Link>
              </li>
              <li>
                <Link href="/services#election-campaign-management" className="hover:text-amber-400 transition-colors">
                  Election Campaign Polling
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Join Panel & Portals */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
              Portals
            </h4>
            <div className="space-y-3">
              <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs space-y-2">
                <span className="font-semibold text-white block">Field Panel Community</span>
                <p className="text-slate-400">
                  Join our verified nationwide consumer, trade & healthcare panel to participate in surveys.
                </p>
                <div className="flex gap-2 pt-1">
                  <Link
                    href="/join/register"
                    className="text-amber-400 hover:underline font-medium inline-flex items-center gap-1"
                  >
                    Register <ChevronRight className="w-3 h-3" />
                  </Link>
                  <span className="text-slate-600">|</span>
                  <Link
                    href="/join/login"
                    className="text-blue-400 hover:underline font-medium inline-flex items-center gap-1"
                  >
                    Member Login
                  </Link>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/admin/login"
                  className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors bg-slate-900/40 px-3 py-2 rounded border border-slate-800/80"
                >
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>Super Admin Gateway</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Brandum INC Market Research. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>ISO 20252:2019 Market Research Standards</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

