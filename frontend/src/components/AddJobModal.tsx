import React, { useState } from "react";
import { X, Calendar, MapPin, DollarSign, Link, FileText, Briefcase } from "lucide-react";
import { JobService, JobApplication } from "../services/job.service";

interface AddJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddJobModal = ({ isOpen, onClose, onSuccess }: AddJobModalProps) => {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [status, setStatus] = useState<JobApplication["status"]>("applied");
  const [appliedDate, setAppliedDate] = useState(new Date().toISOString().split("T")[0]);
  const [jobUrl, setJobUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await JobService.create({
        company,
        position,
        location,
        salary,
        status,
        appliedDate,
        jobUrl,
        notes,
      });

      if (response.success) {
        onSuccess();
        onClose();
        // Reset form
        setCompany("");
        setPosition("");
        setLocation("");
        setSalary("");
        setStatus("applied");
        setAppliedDate(new Date().toISOString().split("T")[0]);
        setJobUrl("");
        setNotes("");
      } else {
        setError(response.errMessage || "Failed to create application");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.errMessage || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#04060A]/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="w-full max-w-xl bg-[#0D111A] border border-[#1E293B] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform scale-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1A2333]">
          <div className="flex items-center gap-2">
            <Briefcase size={20} className="text-purple-400" />
            <h3 className="text-lg font-bold text-white">Add Job Application</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 p-1.5 rounded-lg hover:bg-white/[0.03] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs">
              {error}
            </div>
          )}

          {/* Company & Position */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Company Name *</label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Google, Stripe, etc."
                className="w-full px-4 py-2.5 bg-[#080B11] border border-[#1E293B] rounded-xl text-slate-200 placeholder-slate-600 text-sm outline-none transition-all focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Position / Role *</label>
              <input
                type="text"
                required
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Software Engineer"
                className="w-full px-4 py-2.5 bg-[#080B11] border border-[#1E293B] rounded-xl text-slate-200 placeholder-slate-600 text-sm outline-none transition-all focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Location & Salary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Location</label>
              <div className="relative">
                <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Remote, SF, New York"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#080B11] border border-[#1E293B] rounded-xl text-slate-200 placeholder-slate-600 text-sm outline-none transition-all focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Salary Range</label>
              <div className="relative">
                <DollarSign size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="e.g. $120k - $150k"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#080B11] border border-[#1E293B] rounded-xl text-slate-200 placeholder-slate-600 text-sm outline-none transition-all focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Status & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Application Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-4 py-2.5 bg-[#080B11] border border-[#1E293B] rounded-xl text-slate-200 text-sm outline-none transition-all focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              >
                <option value="applied">Applied</option>
                <option value="in_progress">In Progress / Interviewing</option>
                <option value="review">Reviews / Follow-Up</option>
                <option value="offer">Offer Received</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Date Applied *</label>
              <div className="relative">
                <Calendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="date"
                  required
                  value={appliedDate}
                  onChange={(e) => setAppliedDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#080B11] border border-[#1E293B] rounded-xl text-slate-200 text-sm outline-none transition-all focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Job URL */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Job Posting URL</label>
            <div className="relative">
              <Link size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="url"
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                placeholder="https://jobs.company.com/role"
                className="w-full pl-10 pr-4 py-2.5 bg-[#080B11] border border-[#1E293B] rounded-xl text-slate-200 placeholder-slate-600 text-sm outline-none transition-all focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Notes / Next Steps</label>
            <div className="relative">
              <FileText size={15} className="absolute left-3.5 top-3 text-slate-500" />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Add details about recruiters, follow-ups, or notes..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#080B11] border border-[#1E293B] rounded-xl text-slate-200 placeholder-slate-600 text-sm outline-none transition-all focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
              />
            </div>
          </div>
        </form>

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
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : "Save Job"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddJobModal;
