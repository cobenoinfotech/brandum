import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-6 shadow-sm">
        <Compass className="w-8 h-8 animate-spin [animation-duration:8s]" />
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-3">
        404 Page Not Found
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0c1a40] tracking-tight">
        The Page You Are Looking For Does Not Exist
      </h1>

      <p className="text-slate-500 text-sm sm:text-base max-w-md mt-3 mb-8">
        The research page, methodology, or dashboard link may have been updated or moved.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/">
          <Button variant="navy" className="font-semibold">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Homepage
          </Button>
        </Link>
        <Link href="/services">
          <Button variant="outline" className="border-slate-300 font-semibold">
            View All Research Services
          </Button>
        </Link>
      </div>
    </div>
  );
}

