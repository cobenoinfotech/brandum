"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Service } from "@/types/database.types";
import { saveService, deleteService } from "@/app/actions/admin";
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  X,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ServicesAdminClientProps {
  initialServices: Service[];
}

export function ServicesAdminClient({ initialServices }: ServicesAdminClientProps) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ success?: boolean; text?: string } | null>(null);

  const openAddModal = () => {
    setEditingService({
      title: "",
      slug: "",
      description: "",
      detailed_content: "",
      category: "Field Operations",
      image_url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
      is_active: true,
      display_order: services.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setEditingService({ ...service });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title || !editingService?.description) return;

    setIsSaving(true);
    setFeedback(null);

    // auto generate slug if empty
    const slug =
      editingService.slug?.trim() ||
      editingService.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const payload = {
      ...editingService,
      slug,
    };

    const res = await saveService(payload);
    setIsSaving(false);

    if (res.success) {
      if (editingService.id) {
        setServices(services.map((s) => (s.id === editingService.id ? ({ ...s, ...payload } as Service) : s)));
      } else {
        setServices([...services, { ...payload, id: `srv-${Date.now()}` } as Service]);
      }
      setIsModalOpen(false);
      setFeedback({ success: true, text: res.message });
    } else {
      setFeedback({ success: false, text: res.message });
    }
  };

  const handleToggleActive = async (service: Service) => {
    const updated = !service.is_active;
    const res = await saveService({ ...service, is_active: updated });
    if (res.success) {
      setServices(services.map((s) => (s.id === service.id ? { ...s, is_active: updated } : s)));
    }
  };

  const handleDelete = async (service: Service) => {
    const confirmed = window.confirm(`Delete service "${service.title}"?`);
    if (!confirmed) return;

    const res = await deleteService(service.id);
    if (res.success) {
      setServices(services.filter((s) => s.id !== service.id));
      setFeedback({ success: true, text: res.message });
    } else {
      setFeedback({ success: false, text: res.message });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#0c1a40]">
            All Services Catalog ({services.length})
          </h2>
          <p className="text-xs text-slate-500">
            Dynamic service catalog displayed across the public website.
          </p>
        </div>

        <Button onClick={openAddModal} variant="navy" size="sm" className="font-bold">
          <Plus className="w-4 h-4 mr-1.5" />
          Add New Service
        </Button>
      </div>

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

      {/* Services Table */}
      <Card className="bg-white border-slate-200/80 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Order</th>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.map((service, idx) => (
                <tr key={service.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-400">
                    #{service.display_order || idx + 1}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 relative shrink-0">
                        <Image
                          src={
                            service.image_url ||
                            "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=100&q=80"
                          }
                          alt={service.title}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-[#0c1a40] text-sm">{service.title}</div>
                        <div className="text-[11px] text-slate-400 line-clamp-1 max-w-md">
                          {service.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant="secondary" className="text-xs">
                      {service.category || "General"}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleActive(service)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                        service.is_active
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                      }`}
                    >
                      {service.is_active ? (
                        <>
                          <Eye className="w-3.5 h-3.5" /> Published
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5" /> Draft
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-2.5 text-xs"
                      onClick={() => openEditModal(service)}
                    >
                      <Edit2 className="w-3.5 h-3.5 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => handleDelete(service)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Edit/Add Modal */}
      {isModalOpen && editingService && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-xl font-bold text-[#0c1a40]">
                {editingService.id ? "Edit Service" : "Add New Service"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 uppercase tracking-wider text-xs">
                  Service Title *
                </label>
                <Input
                  value={editingService.title || ""}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  required
                  placeholder="e.g. Mystery Audit"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 uppercase tracking-wider text-xs">
                    Slug (URL identifier)
                  </label>
                  <Input
                    value={editingService.slug || ""}
                    onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                    placeholder="e.g. mystery-audit"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 uppercase tracking-wider text-xs">
                    Category
                  </label>
                  <Input
                    value={editingService.category || ""}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                    placeholder="e.g. Audits & Compliance"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 uppercase tracking-wider text-xs">
                  Short Description *
                </label>
                <Textarea
                  value={editingService.description || ""}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  required
                  rows={2}
                  placeholder="Summary of this service..."
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 uppercase tracking-wider text-xs">
                  Detailed Execution Methodology
                </label>
                <Textarea
                  value={editingService.detailed_content || ""}
                  onChange={(e) => setEditingService({ ...editingService, detailed_content: e.target.value })}
                  rows={3}
                  placeholder="Detailed research methodology, quality checks, sample size guidelines..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 uppercase tracking-wider text-xs">
                    Image URL
                  </label>
                  <Input
                    value={editingService.image_url || ""}
                    onChange={(e) => setEditingService({ ...editingService, image_url: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 uppercase tracking-wider text-xs">
                    Display Order
                  </label>
                  <Input
                    type="number"
                    value={editingService.display_order ?? 0}
                    onChange={(e) => setEditingService({ ...editingService, display_order: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="navy" disabled={isSaving} className="font-bold">
                  {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                  Save Service
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

