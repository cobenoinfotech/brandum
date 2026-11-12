"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  MapPin,
  Search,
  Users,
  Clock,
  Languages,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Territory {
  id: string;
  name: string;
  region: "North" | "West" | "South" | "East" | "Central";
  hubCity: string;
  surveyors: number;
  languages: string[];
  turnaroundHours: number;
  urbanCenters: string[];
  ruralReach: string;
}

const TERRITORIES: Territory[] = [
  // North
  {
    id: "delhi",
    name: "Delhi NCR",
    region: "North",
    hubCity: "New Delhi",
    surveyors: 140,
    languages: ["Hindi", "English", "Punjabi"],
    turnaroundHours: 24,
    urbanCenters: ["New Delhi", "Noida", "Gurugram", "Faridabad", "Ghaziabad"],
    ruralReach: "Peri-urban & NCR belts",
  },
  {
    id: "up",
    name: "Uttar Pradesh",
    region: "North",
    hubCity: "Lucknow / Kanpur",
    surveyors: 180,
    languages: ["Hindi", "Urdu", "Awadhi", "Bhojpuri"],
    turnaroundHours: 48,
    urbanCenters: ["Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj"],
    ruralReach: "75 Districts coverage across Eastern & Western UP",
  },
  {
    id: "punjab",
    name: "Punjab & Haryana",
    region: "North",
    hubCity: "Chandigarh",
    surveyors: 120,
    languages: ["Punjabi", "Hindi", "Haryanvi"],
    turnaroundHours: 48,
    urbanCenters: ["Ludhiana", "Amritsar", "Jalandhar", "Karnal", "Panipat"],
    ruralReach: "Extensive agrarian mandi & rural household panel",
  },
  {
    id: "rajasthan",
    name: "Rajasthan",
    region: "North",
    hubCity: "Jaipur",
    surveyors: 95,
    languages: ["Hindi", "Marwari", "Mewari"],
    turnaroundHours: 48,
    urbanCenters: ["Jaipur", "Jodhpur", "Kota", "Udaipur", "Bikaner"],
    ruralReach: "Desert & semi-arid district surveyor clusters",
  },

  // West
  {
    id: "maharashtra",
    name: "Maharashtra",
    region: "West",
    hubCity: "Mumbai / Pune",
    surveyors: 210,
    languages: ["Marathi", "Hindi", "English", "Konkani"],
    turnaroundHours: 24,
    urbanCenters: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
    ruralReach: "Vidarbha, Marathwada & Western belt agriculture panels",
  },
  {
    id: "gujarat",
    name: "Gujarat",
    region: "West",
    hubCity: "Ahmedabad",
    surveyors: 130,
    languages: ["Gujarati", "Hindi"],
    turnaroundHours: 36,
    urbanCenters: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
    ruralReach: "Saurashtra & North Gujarat commercial networks",
  },
  {
    id: "mp",
    name: "Madhya Pradesh",
    region: "West",
    hubCity: "Indore / Bhopal",
    surveyors: 85,
    languages: ["Hindi", "Malvi", "Nimadi"],
    turnaroundHours: 48,
    urbanCenters: ["Indore", "Bhopal", "Gwalior", "Jabalpur", "Ujjain"],
    ruralReach: "Tribal & central agrarian belts",
  },

  // South
  {
    id: "karnataka",
    name: "Karnataka",
    region: "South",
    hubCity: "Bengaluru",
    surveyors: 150,
    languages: ["Kannada", "English", "Telugu", "Hindi"],
    turnaroundHours: 24,
    urbanCenters: ["Bengaluru", "Mysuru", "Hubli-Dharwad", "Mangaluru", "Belagavi"],
    ruralReach: "Coffee estates, coastal & North Karnataka rural pods",
  },
  {
    id: "tamilnadu",
    name: "Tamil Nadu",
    region: "South",
    hubCity: "Chennai",
    surveyors: 140,
    languages: ["Tamil", "English"],
    turnaroundHours: 36,
    urbanCenters: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
    ruralReach: "Delta regions & industrial corridor rural clusters",
  },
  {
    id: "telangana_ap",
    name: "Telangana & Andhra Pradesh",
    region: "South",
    hubCity: "Hyderabad / Vizag",
    surveyors: 160,
    languages: ["Telugu", "Urdu", "English"],
    turnaroundHours: 36,
    urbanCenters: ["Hyderabad", "Visakhapatnam", "Vijayawada", "Warangal", "Guntur"],
    ruralReach: "Coastal Andhra & Telangana tier-3/4 mandals",
  },
  {
    id: "kerala",
    name: "Kerala",
    region: "South",
    hubCity: "Kochi / Thiruvananthapuram",
    surveyors: 80,
    languages: ["Malayalam", "English"],
    turnaroundHours: 36,
    urbanCenters: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Kollam"],
    ruralReach: "High-density semi-urban panchayat clusters",
  },

  // East
  {
    id: "bengal",
    name: "West Bengal",
    region: "East",
    hubCity: "Kolkata",
    surveyors: 130,
    languages: ["Bengali", "Hindi", "English"],
    turnaroundHours: 36,
    urbanCenters: ["Kolkata", "Howrah", "Siliguri", "Asansol", "Durgapur"],
    ruralReach: "Delta, tea plantation & rural Rarh regions",
  },
  {
    id: "bihar_jharkhand",
    name: "Bihar & Jharkhand",
    region: "East",
    hubCity: "Patna / Ranchi",
    surveyors: 120,
    languages: ["Hindi", "Bhojpuri", "Maithili", "Magahi"],
    turnaroundHours: 48,
    urbanCenters: ["Patna", "Ranchi", "Jamshedpur", "Dhanbad", "Gaya"],
    ruralReach: "Extensive rural consumer & political polling network",
  },
  {
    id: "odisha",
    name: "Odisha",
    region: "East",
    hubCity: "Bhubaneswar",
    surveyors: 75,
    languages: ["Odia", "Hindi", "Sambalpuri"],
    turnaroundHours: 48,
    urbanCenters: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur"],
    ruralReach: "Coastal & mining belt communities",
  },
  {
    id: "northeast",
    name: "North-Eastern States (7 Sisters)",
    region: "East",
    hubCity: "Guwahati",
    surveyors: 65,
    languages: ["Assamese", "Bengali", "English", "Bodo", "Khasi"],
    turnaroundHours: 72,
    urbanCenters: ["Guwahati", "Shillong", "Imphal", "Agartala", "Aizawl"],
    ruralReach: "Hilly terrain & indigenous community reach",
  },
];

export function LocationExplorer() {
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredTerritories = useMemo(() => {
    return TERRITORIES.filter((t) => {
      const matchesRegion =
        selectedRegion === "All" || t.region === selectedRegion;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        t.name.toLowerCase().includes(q) ||
        t.hubCity.toLowerCase().includes(q) ||
        t.urbanCenters.some((c) => c.toLowerCase().includes(q)) ||
        t.languages.some((l) => l.toLowerCase().includes(q));

      return matchesRegion && matchesSearch;
    });
  }, [selectedRegion, searchQuery]);

  const totalSurveyors = useMemo(() => {
    return filteredTerritories.reduce((acc, t) => acc + t.surveyors, 0);
  }, [filteredTerritories]);

  const regions = ["All", "North", "West", "South", "East"];

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 text-white shadow-2xl space-y-6">
      {/* Header and Live Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 mb-2">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            Live PAN India Field Coverage Explorer
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Explore Ground Field Presence by State & Regional Hub
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time capacity across 28 States & 8 Union Territories with 100% CAPI & GPS validation.
          </p>
        </div>

        {/* Live Active Field Surveyor Counter Badge */}
        <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-2.5 rounded-2xl border border-slate-700/80">
          <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Field Surveyors in View</div>
            <div className="text-lg font-black text-amber-400">{totalSurveyors}+ Field Personnel</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Region Pills */}
        <div className="md:col-span-8 flex flex-wrap items-center gap-2">
          {regions.map((reg) => (
            <button
              key={reg}
              type="button"
              onClick={() => setSelectedRegion(reg)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 ${
                selectedRegion === reg
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-400/40"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60"
              }`}
            >
              {reg === "All" ? "All India (Pan-National)" : `${reg} Zone`}
            </button>
          ))}
        </div>

        {/* Instant Search Bar */}
        <div className="md:col-span-4 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search state, city, language..."
            className="w-full bg-slate-800/90 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Territories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-1">
        {filteredTerritories.map((t) => (
          <div
            key={t.id}
            className="group p-5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/70 hover:border-blue-500/50 transition-all duration-200 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-base font-extrabold text-white group-hover:text-blue-300 transition-colors">
                    {t.name}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Regional Command: {t.hubCity}</span>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="bg-blue-900/40 text-blue-300 border-blue-700/60 text-[10px] font-bold"
                >
                  {t.region} Zone
                </Badge>
              </div>

              {/* Quick Stat Tags */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-700/60">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-semibold text-white">{t.surveyors}+ Fielders</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{t.turnaroundHours}h Rollout</span>
                </div>
              </div>

              {/* Supported Languages */}
              <div className="mt-3 space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Languages className="w-3 h-3 text-sky-400" />
                  <span>Languages:</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {t.languages.map((lang) => (
                    <span
                      key={lang}
                      className="px-2 py-0.5 rounded-md bg-slate-900/80 text-[10px] text-slate-300 font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Urban Centers */}
              <div className="mt-3 text-[11px] text-slate-400">
                <span className="text-slate-500">Major Hubs: </span>
                {t.urbanCenters.slice(0, 3).join(", ")}
                {t.urbanCenters.length > 3 && ` +${t.urbanCenters.length - 3} more`}
              </div>
            </div>

            {/* Quick Territory RFP Link */}
            <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between">
              <span className="text-[10px] text-emerald-400 inline-flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3 h-3" />
                CAPI & GPS Verified
              </span>
              <Link href={`/contact?territory=${encodeURIComponent(t.name)}`}>
                <span className="text-xs font-bold text-amber-400 hover:text-amber-300 inline-flex items-center gap-1">
                  Book Feasibility
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </div>
        ))}

        {filteredTerritories.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-400 space-y-2">
            <MapPin className="w-8 h-8 mx-auto text-slate-600" />
            <p className="text-sm font-semibold text-slate-300">
              No state found matching &quot;{searchQuery}&quot;
            </p>
            <p className="text-xs text-slate-500">
              Brandum INC operates across all 28 states and 8 union territories. Contact our operations team for custom rural coordinates.
            </p>
          </div>
        )}
      </div>

      {/* Footer Assurance Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-blue-950/40 border border-blue-900/60">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-xs text-slate-300">
            Need a custom field feasibility study or sample quota for tier-2/3/4 rural talukas?
          </span>
        </div>
        <Link href="/contact" className="shrink-0">
          <Button size="sm" variant="gold" className="text-xs font-bold">
            Request Territory Feasibility
          </Button>
        </Link>
      </div>
    </div>
  );
}

