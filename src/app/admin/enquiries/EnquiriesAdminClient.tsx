"use client";

import React, { useState } from "react";
import { ContactEnquiry } from "@/types/database.types";
import { updateEnquiryStatus, deleteEnquiry } from "@/app/actions/admin";
import { formatDate } from "@/lib/utils";
import {
  MailQuestion,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2,
  Eye,
  X,
  Phone,
  Mail,
  Building,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface EnquiriesAdminClientProps {
  initialEnquiries: ContactEnquiry[];
}

export function EnquiriesAdminClient({ initialEnquiries }: EnquiriesAdminClientProps) {
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>(initialEnquiries);
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactEnquiry | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [feedback, setFeedback] = useState<{ success?: boolean; text?: string } | null>(null);

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesStatus = statusFilter === "all" || e.status === statusFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      search === "" ||
      e.name.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.phone.includes(q) ||
      e.subject.toLowerCase().includes(q) ||
      (e.company_name && e.company_name.toLowerCase().includes(q));

    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (
    enquiryId: string,
    newStatus: "new" | "read" | "in_progress" | "resolved" | "archived"
  ) => {
    const res = await updateEnquiryStatus(enquiryId, newStatus);
    if (res.success) {
      setEnquiries(
        enquiries.map((e) => (e.id === enquiryId ? { ...e, status: newStatus } : e))
      );
      if (selectedEnquiry?.id === enquiryId) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
      }
      setFeedback({ success: true, text: res.message });
    } else {
      setFeedback({ success: false, text: res.message });
    }
  };

  const handleDelete = async (enquiryId: string) => {
    const confirmed = window.confirm("Permanently delete this enquiry record?");
    if (!confirmed) return;

    const res = await deleteEnquiry(enquiryId);
    if (res.success) {
      setEnquiries(enquiries.filter((e) => e.id !== enquiryId));
      if (selectedEnquiry?.id === enquiryId) {
        setSelectedEnquiry(null);
      }
      setFeedback({ success: true, text: res.message });
    } else {
      setFeedback({ success: false, text: res.message });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="warning">New</Badge>;
      case "read":
        return <Badge variant="secondary">Read</Badge>;
      case "in_progress":
        return <Badge variant="default">In Progress</Badge>;
      case "resolved":
        return <Badge variant="success">Resolved</Badge>;
      case "archived":
        return <Badge variant="outline">Archived</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
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

      {/* Filter and Search Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search enquiries by name, company, email..."
            className="pl-10 h-10 text-sm"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold overflow-x-auto w-full md:w-auto">
          {["all", "new", "in_progress", "resolved", "archived"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg capitalize whitespace-nowrap transition-all ${
                statusFilter === st
                  ? "bg-white text-slate-900 shadow-sm font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {st.replace("_", " ")} (
              {st === "all" ? enquiries.length : enquiries.filter((e) => e.status === st).length}
              )
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Table */}
      <Card className="bg-white border-slate-200/80 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEnquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    <div className="font-bold text-[#0c1a40] text-sm">{enq.name}</div>
                    <div className="text-[11px] text-slate-500">{enq.company_name || "Individual"}</div>
                    <div className="text-[10px] text-slate-400">{enq.email} &bull; {enq.phone}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900 text-xs sm:text-sm line-clamp-1">
                      {enq.subject}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 max-w-sm mt-0.5">
                      {enq.message}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                    {formatDate(enq.created_at)}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {getStatusBadge(enq.status)}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-2.5 text-xs font-semibold"
                      onClick={() => {
                        setSelectedEnquiry(enq);
                        if (enq.status === "new") {
                          handleStatusChange(enq.id, "read");
                        }
                      }}
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      View Full
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={() => handleDelete(enq.id)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}

              {filteredEnquiries.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <MailQuestion className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <p className="text-sm font-semibold text-slate-600">No contact enquiries found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Detail Viewer Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Enquiry ID: {selectedEnquiry.id}
                </span>
                <h3 className="text-xl font-bold text-[#0c1a40] mt-0.5">
                  {selectedEnquiry.subject}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <span className="text-slate-400 block">Sender Name</span>
                <span className="font-bold text-slate-800">{selectedEnquiry.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Company / Organization</span>
                <span className="font-bold text-slate-800">
                  {selectedEnquiry.company_name || "Individual / Not specified"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Email Address</span>
                <span className="font-bold text-slate-800">{selectedEnquiry.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Phone Number</span>
                <span className="font-bold text-slate-800">{selectedEnquiry.phone}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Full Inquiry Scope & Message:
              </span>
              <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200/80 text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                {selectedEnquiry.message}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-semibold">Status:</span>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) =>
                    handleStatusChange(
                      selectedEnquiry.id,
                      e.target.value as any
                    )
                  }
                  className="text-xs font-bold p-1.5 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedEnquiry(null)}
              >
                Close Viewer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

