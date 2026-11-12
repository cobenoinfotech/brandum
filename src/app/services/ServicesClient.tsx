"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Service } from "@/types/database.types";
import {
  Search,
  Filter,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface ServicesClientProps {
  services: Service[];
}

export function ServicesClient({ services }: ServicesClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    "All",
    "Field Operations",
    "Quantitative Research",
    "Qualitative Research",
    "Audits & Compliance",
    "Analytics & Technology",
    "Business Intelligence",
    "Specialized Research",
    "Panel Management",
    "Digital & Strategy",
  ];

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedCategory === "All" ||
      service.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesQuery =
      searchQuery === "" ||
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (service.detailed_content &&
        service.detailed_content.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-12">
      {/* Search and Category Filter Toolbar */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services (e.g. Audit, CLT, F2F, Panel)..."
              className="pl-10 h-10 text-sm"
            />
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-800">{filteredServices.length}</strong> of{" "}
            <strong>{services.length}</strong> services
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#0c1a40] text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid (All 17 Services) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service, index) => (
          <Card
            key={service.id}
            id={service.slug}
            className="overflow-hidden border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
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
                    {service.category || "Research Service"}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 text-[#0c1a40] text-xs font-extrabold flex items-center justify-center shadow">
                  #{service.display_order || index + 1}
                </div>
              </div>

              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-[#0c1a40] group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                {service.detailed_content && (
                  <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <strong className="text-slate-700 block mb-1">Execution Methodology:</strong>
                    {service.detailed_content}
                  </div>
                )}
              </CardContent>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
              <Link
                href="/contact"
                className="text-xs font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1 group-hover:gap-2 transition-all"
              >
                <span>Request RFP for this Service</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <Info className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h4 className="text-lg font-bold text-slate-800">No services match your filter</h4>
          <p className="text-sm text-slate-500 mt-1">Try selecting &quot;All&quot; or clearing your search phrase.</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}

