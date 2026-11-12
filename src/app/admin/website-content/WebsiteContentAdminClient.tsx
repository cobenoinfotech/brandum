"use client";

import React, { useState } from "react";
import { WebsiteContent } from "@/types/database.types";
import { updateWebsiteContentSection } from "@/app/actions/admin";
import {
  FileText,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Layers,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface WebsiteContentAdminClientProps {
  initialContent: Record<string, WebsiteContent>;
}

export function WebsiteContentAdminClient({ initialContent }: WebsiteContentAdminClientProps) {
  const [activeSection, setActiveSection] = useState<string>("home_hero");
  const [contentMap, setContentMap] = useState<Record<string, WebsiteContent>>(initialContent);

  const current = contentMap[activeSection] || {
    id: activeSection,
    section_key: activeSection,
    title: "",
    description: "",
    content: {},
    image_url: null,
    updated_at: new Date().toISOString(),
  };

  const [title, setTitle] = useState(current.title);
  const [description, setDescription] = useState(current.description || "");
  const [jsonText, setJsonText] = useState(JSON.stringify(current.content, null, 2));
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ success?: boolean; text?: string } | null>(null);

  const handleSelectSection = (key: string) => {
    setActiveSection(key);
    const item = contentMap[key];
    if (item) {
      setTitle(item.title);
      setDescription(item.description || "");
      setJsonText(JSON.stringify(item.content, null, 2));
    }
    setFeedback(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setFeedback(null);

    let parsedJson = {};
    try {
      parsedJson = JSON.parse(jsonText);
    } catch {
      setIsSaving(false);
      setFeedback({ success: false, text: "Invalid JSON format in the content field." });
      return;
    }

    const res = await updateWebsiteContentSection(
      activeSection,
      title,
      description,
      parsedJson
    );

    setIsSaving(false);
    if (res.success) {
      setContentMap({
        ...contentMap,
        [activeSection]: {
          ...current,
          title,
          description,
          content: parsedJson,
        },
      });
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

      {/* Section Selector */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => handleSelectSection("home_hero")}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            activeSection === "home_hero"
              ? "bg-[#0c1a40] text-white shadow"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Homepage Hero
        </button>
        <button
          onClick={() => handleSelectSection("why_choose_us")}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            activeSection === "why_choose_us"
              ? "bg-[#0c1a40] text-white shadow"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Why Choose Us
        </button>
        <button
          onClick={() => handleSelectSection("pan_india_presence")}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            activeSection === "pan_india_presence"
              ? "bg-[#0c1a40] text-white shadow"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          PAN India Presence
        </button>
      </div>

      <Card className="bg-white border-slate-200/80 shadow-sm rounded-2xl">
        <CardHeader>
          <CardTitle className="capitalize">
            Edit Section: {activeSection.replace(/_/g, " ")}
          </CardTitle>
          <CardDescription>
            Updates are reflected dynamically across the corporate landing page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Section Headline / Title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={isSaving}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Section Subtitle / Description
              </label>
              <Textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isSaving}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                <span>Structured Section Data (JSON Schema)</span>
                <span className="text-[11px] text-slate-400 font-mono">Format: Valid JSON</span>
              </label>
              <Textarea
                rows={10}
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                required
                disabled={isSaving}
                className="font-mono text-xs bg-slate-900 text-emerald-400 border-slate-800"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="navy" size="lg" disabled={isSaving} className="font-bold">
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving Content...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Section Content
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

