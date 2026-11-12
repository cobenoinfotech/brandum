"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global route error caught:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mb-6 shadow-sm">
        <AlertCircle className="w-8 h-8" />
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/80 text-rose-700 text-xs font-bold uppercase tracking-wider mb-3">
        Application Notice
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
        Something went wrong while rendering this section
      </h1>

      <p className="text-slate-500 text-xs sm:text-sm max-w-md mt-2 mb-8">
        We encountered a temporary processing delay. Please try refreshing or return to the homepage.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        <Button onClick={() => reset()} variant="navy" className="font-semibold">
          <RotateCcw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
        <Link href="/">
          <Button variant="outline" className="border-slate-300 font-semibold">
            <Home className="w-4 h-4 mr-2" />
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

