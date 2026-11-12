"use client";

import React, { useState } from "react";
import { CompanyProfile } from "@/types/database.types";
import { updateCompanyProfileDetails } from "@/app/actions/admin";
import {
  Building2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Save,
  MapPin,
  Phone,
  Mail,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface CompanyProfileAdminClientProps {
  initialProfile: CompanyProfile;
}

export function CompanyProfileAdminClient({ initialProfile }: CompanyProfileAdminClientProps) {
  const [profile, setProfile] = useState<CompanyProfile>(initialProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ success?: boolean; text?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback(null);

    const res = await updateCompanyProfileDetails(profile);
    setIsSaving(false);
    if (res.success) {
      setFeedback({ success: true, text: res.message });
    } else {
      setFeedback({ success: false, text: res.message });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-start gap-3 border ${
            feedback.success
              ? "bg-emerald-50 text-emerald-900 border-emerald-200"
              : "bg-red-50 text-red-900 border-red-200"
          }`}
        >
          {feedback.success ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <span className="text-sm font-medium">{feedback.text}</span>
        </div>
      )}

      <Card className="bg-white border-slate-200/80 shadow-sm rounded-2xl">
        <CardHeader>
          <CardTitle>Corporate Identity & Contact Information</CardTitle>
          <CardDescription>
            These details are displayed in the header, footer, contact page, and structured schema across the site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Company Legal Name *
                </label>
                <Input
                  value={profile.company_name}
                  onChange={(e) => setProfile({ ...profile, company_name: e.target.value })}
                  required
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Corporate Tagline
                </label>
                <Input
                  value={profile.tagline || ""}
                  onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                  disabled={isSaving}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Full Company Description & Positioning
              </label>
              <Textarea
                rows={3}
                value={profile.description}
                onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                required
                disabled={isSaving}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Experience Highlight (e.g. 10+ Years)
                </label>
                <Input
                  value={profile.experience}
                  onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                  required
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Official Email Address
                </label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  required
                  disabled={isSaving}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Contact Phone Numbers
                </label>
                <Input
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  required
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  PAN India Details Summary
                </label>
                <Input
                  value={profile.pan_india_details || ""}
                  onChange={(e) => setProfile({ ...profile, pan_india_details: e.target.value })}
                  disabled={isSaving}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Headquarters Physical Address
              </label>
              <Textarea
                rows={2}
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                required
                disabled={isSaving}
              />
            </div>

            <div className="pt-3">
              <Button type="submit" variant="navy" size="lg" disabled={isSaving} className="font-bold">
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Company Profile
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

