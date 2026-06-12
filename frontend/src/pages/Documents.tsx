import React, { useState, useEffect, useRef } from "react";
import { FolderOpen, Info, Upload, FileText, ExternalLink, Loader2, Trash2 } from "lucide-react";
import useApiCall from "../hooks/useApiCall";
import { fetchDocuments, uploadDocument } from "../services/apiServices";

interface Document {
  id: number;
  name: string;
  type: string;
  url: string;
  createdAt: string;
}

const Documents = () => {
  const { callApi } = useApiCall();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getDocs = async () => {
    setLoading(true);
    const response = await fetchDocuments(callApi);
    if (response?.success) {
      setDocuments(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDocs();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "resume"); // Default type

    const response = await uploadDocument(callApi, formData);
    if (response?.success) {
      getDocs(); // Refresh list
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-[#080B10] text-slate-200 p-8 px-6 md:px-12 font-sans relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <FolderOpen className="text-purple-500" />
              Documents Vault
            </h1>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Manage your resumes, cover letters, and transcripts. Keep everything organized for your job search.
            </p>
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800/50 text-white rounded-xl font-semibold text-sm transition-all active:scale-95 shadow-lg shadow-purple-500/20"
          >
            {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
            {uploading ? "Uploading..." : "Upload Document"}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            className="hidden"
            accept=".pdf,.doc,.docx,image/*"
          />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={40} className="text-purple-500 animate-spin mb-4" />
            <p className="text-slate-500 font-medium">Loading documents...</p>
          </div>
        ) : documents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-[#0E131F] border border-[#1E293B] rounded-2xl p-5 hover:border-purple-500/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                    <FileText size={20} />
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      title="View Document"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>

                <h3 className="text-white font-bold text-sm truncate pr-2" title={doc.name}>
                  {doc.name}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-800/50 px-2 py-0.5 rounded">
                    {doc.type}
                  </span>
                  <span className="text-[10px] text-slate-600 font-medium">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#0E131F]/50 border border-dashed border-[#1E293B] rounded-3xl p-16 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-800/30 flex items-center justify-center text-slate-600 mx-auto mb-6">
              <FolderOpen size={32} />
            </div>
            <h3 className="text-white font-bold text-lg">No documents yet</h3>
            <p className="text-slate-400 text-sm mt-2 max-w-xs mx-auto">
              Upload your first resume or cover letter to get started with your document vault.
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-8 text-purple-400 font-semibold text-sm hover:text-purple-300 flex items-center gap-2 mx-auto transition-colors"
            >
              <Upload size={16} />
              Upload your first file
            </button>
          </div>
        )}

        <div className="mt-12 flex items-center gap-3 p-4 bg-purple-500/5 border border-purple-500/10 rounded-2xl text-slate-400 text-xs leading-relaxed">
          <Info size={18} className="text-purple-400 flex-shrink-0" />
          <p>
            Secure Storage: All documents are stored securely using Cloudinary. You can access them anytime, and they will soon be linkable directly to your job applications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Documents;
