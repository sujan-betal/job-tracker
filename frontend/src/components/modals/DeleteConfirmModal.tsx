import React, { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { JobService } from "../../services/job.service";
import { useJobs } from "../../contextApi/JobContext";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  jobId: number | null;
  companyName: string;
}

const DeleteConfirmModal = ({ isOpen, onClose, onSuccess, jobId, companyName }: DeleteConfirmModalProps) => {
  const { refreshStats } = useJobs();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen || !jobId) return null;

  const handleDelete = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await JobService.delete(jobId);
      if (response.success) {
        refreshStats();
        onSuccess();
        onClose();
      } else {
        setError(response.errMessage || "Failed to delete application");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.errMessage || "Failed to delete. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#04060A]/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="w-full max-w-md bg-[#0D111A] border border-[#1E293B] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform scale-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1A2333]">
          <div className="flex items-center gap-2 text-red-400">
            <AlertTriangle size={18} />
            <h3 className="text-md font-bold text-white">Delete Application</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 p-1.5 rounded-lg hover:bg-white/[0.03] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs">
              {error}
            </div>
          )}

          <p className="text-slate-300 text-sm leading-relaxed">
            Are you sure you want to delete your application for{" "}
            <span className="text-white font-semibold">{companyName}</span>?
          </p>
          <p className="text-red-400/80 text-xs">
            Warning: This action cannot be undone and will permanently remove all interview history and notes associated with this job application.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-[#1A2333] bg-[#0A0D14]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold text-sm rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
