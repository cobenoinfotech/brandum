import React from "react";

export default function RootLoading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 space-y-6">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-amber-400 animate-pulse" />
        </div>
      </div>

      <div className="space-y-2 text-center max-w-sm">
        <div className="h-4 w-40 bg-slate-200 rounded-md mx-auto animate-pulse" />
        <div className="h-3 w-56 bg-slate-100 rounded-md mx-auto animate-pulse" />
      </div>
    </div>
  );
}

