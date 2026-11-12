import React from "react";

export default function AdminLoading() {
  return (
    <div className="p-6 sm:p-8 space-y-6">
      {/* Title skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-64 bg-slate-200 rounded-lg animate-pulse" />
        <div className="h-4 w-96 bg-slate-100 rounded animate-pulse" />
      </div>

      {/* KPI Cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm animate-pulse"
          >
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 bg-slate-100 rounded" />
              <div className="w-8 h-8 rounded-lg bg-slate-100" />
            </div>
            <div className="h-8 w-16 bg-slate-200 rounded-md" />
            <div className="h-3 w-32 bg-slate-100 rounded" />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm animate-pulse">
        <div className="h-6 w-48 bg-slate-200 rounded" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((r) => (
            <div key={r} className="h-12 w-full bg-slate-50 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

