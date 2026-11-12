import React from "react";

export default function IndustriesLoading() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="h-6 w-36 bg-slate-200 rounded-full mx-auto animate-pulse" />
          <div className="h-10 w-80 bg-slate-200 rounded-xl mx-auto animate-pulse" />
          <div className="h-4 w-64 bg-slate-100 rounded mx-auto animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm animate-pulse"
            >
              <div className="h-44 w-full bg-slate-200 rounded-xl" />
              <div className="h-6 w-1/2 bg-slate-200 rounded" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-slate-100 rounded" />
                <div className="h-3 w-4/5 bg-slate-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

