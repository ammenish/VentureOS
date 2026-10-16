"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Upload,
  Download,
  Trash2,
  FileCheck,
  FolderLock,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface DocItem {
  id: string;
  name: string;
  category: string;
  size: string;
  uploadedAt: string;
}

export default function DocumentsPage() {
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [docName, setDocName] = useState("");
  const [docCategory, setDocCategory] = useState("pitch_deck");

  const loadDocs = async () => {
    try {
      const res = await fetch("/api/v1/documents?orgId=org_pulseai");
      const json = await res.json();
      if (json.success) {
        setDocs(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const handleUploadDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim()) return;

    try {
      const res = await fetch("/api/v1/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: docName.endsWith(".pdf") || docName.endsWith(".xlsx") ? docName : `${docName}.pdf`,
          category: docCategory,
          size: "2.4 MB",
          orgId: "org_pulseai",
        }),
      });
      const json = await res.json();
      if (json.success) {
        setDocs((prev) => [json.data, ...prev]);
        setShowUploadModal(false);
        setDocName("");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Investor Data Room & Documents
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Secure vault for pitch materials, cap tables, DPIIT compliance certificates, and clinical trial results.
          </p>
        </div>

        <Button
          onClick={() => setShowUploadModal(true)}
          className="bg-[#111110] hover:bg-neutral-800 text-white rounded-xl text-xs shadow-xs"
        >
          <Upload className="w-3.5 h-3.5 mr-1" />
          Upload Document
        </Button>
      </div>

      {/* Storage & Privacy Alert */}
      <div className="p-4 rounded-2xl bg-[#111110]/[0.03] border border-[#E5E5E0] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FolderLock className="w-5 h-5 text-[#111110] flex-shrink-0" />
          <div>
            <span className="text-xs font-bold text-[#111110]">
              Encrypted Local Data Room Storage Adapter
            </span>
            <p className="text-[11px] text-neutral-500">
              Files are safeguarded with strict tenant-isolation policies. Pre-signed access keys required for download.
            </p>
          </div>
        </div>
        <Badge variant="outline" className="text-[10px] text-emerald-700 border-emerald-300 bg-emerald-50">
          Private S3 Compatible
        </Badge>
      </div>

      {/* Documents List */}
      <Card className="border-[#E5E5E0] shadow-xs">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-bold text-[#111110]">Repository Files</CardTitle>
          <Badge variant="outline" className="text-xs font-semibold">
            {docs.length} Documents
          </Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[#E5E5E0]/60">
            {docs.map((doc) => (
              <div
                key={doc.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-black/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#111110]/[0.06] text-[#111110] flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#111110] block">{doc.name}</span>
                    <span className="text-[11px] text-neutral-400">
                      {doc.category.replace(/_/g, " ")} • {doc.size} • Uploaded{" "}
                      {new Date(doc.uploadedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <Button
                    onClick={() => {
                      alert(`Downloading pre-signed secure copy of ${doc.name}...`);
                    }}
                    variant="outline"
                    size="sm"
                    className="text-xs h-8"
                  >
                    <Download className="w-3.5 h-3.5 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl max-w-md w-full p-6 animate-scale-in">
            <h2 className="text-lg font-bold text-slate-900">Upload to Data Room</h2>
            <p className="text-xs text-slate-500 mt-1">
              Add diligence artifacts to your secure startup repository.
            </p>

            <form onSubmit={handleUploadDoc} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Document Title / File Name
                </label>
                <Input
                  required
                  placeholder="e.g. PulseAI_Financial_Model_Q2_2026.xlsx"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Diligence Category
                </label>
                <select
                  value={docCategory}
                  onChange={(e) => setDocCategory(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                >
                  <option value="pitch_deck">Pitch Deck</option>
                  <option value="financials">Financial Model / Runway</option>
                  <option value="legal">Legal & Incorporation (MCA / DPIIT)</option>
                  <option value="research">Clinical / Technical Research Paper</option>
                  <option value="product">Architecture & Security Specs</option>
                </select>
              </div>

              <div className="p-6 border-2 border-dashed border-slate-200 rounded-xl text-center text-xs text-slate-400">
                Drag and drop PDF, XLSX, or DOCX files here (simulated S3 storage adapter active)
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-[#111110] hover:bg-[#27272A] text-white">
                  Save Document
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
