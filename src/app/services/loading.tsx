import React from "react";

export default function ServicesLoading() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Skeleton */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="h-6 w-32 bg-slate-200 rounded-full mx-auto animate-pulse" />
          <div className="h-10 w-96 bg-slate-200 rounded-xl mx-auto animate-pulse" />
          <div className="h-4 w-72 bg-slate-100 rounded mx-auto animate-pulse" />
        </div>

        {/* Filter bar Skeleton */}
        <div className="h-12 w-full max-w-2xl bg-white border border-slate-200 rounded-2xl mx-auto animate-pulse" />

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm animate-pulse"
            >
              <div className="h-48 w-full bg-slate-200 rounded-xl" />
              <div className="h-4 w-24 bg-blue-100 rounded" />
              <div className="h-6 w-3/4 bg-slate-200 rounded" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-slate-100 rounded" />
                <div className="h-3 w-5/6 bg-slate-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

