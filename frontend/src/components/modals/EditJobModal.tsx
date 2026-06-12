import React, { useState, useEffect } from "react";
import { X, Calendar, MapPin, IndianRupee, Link, FileText, Briefcase } from "lucide-react";
import { JobService, JobApplication } from "../../services/job.service";

interface EditJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  job: JobApplication | null;
}

const EditJobModal = ({ isOpen, onClose, onSuccess, job }: EditJobModalProps) => {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [status, setStatus] = useState<JobApplication["status"]>("applied");
  const [appliedDate, setAppliedDate] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (job && isOpen) {
      setCompany(job.company || "");
      setPosition(job.position || "");
      setLocation(job.location || "");
      setSalary(job.salary || "");
      setStatus(job.status || "applied");
      setAppliedDate(job.appliedDate || "");
      setJobUrl(job.jobUrl || "");
      setNotes(job.notes || "");
      setError("");
    }
  }, [job, isOpen]);

  if (!isOpen || !job) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await JobService.update(job.id!, {
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
      } else {
        setError(response.errMessage || "Failed to update application");
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
            <h3 className="text-lg font-bold text-white">Edit Job Application</h3>
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
                <IndianRupee size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="e.g. ₹120k - ₹150k"
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
                className="w-full px-4 py-2.5 bg-[#080B11] border border-[#1E293B] rounded-xl text-slate-200 text-sm outline-none transition-all focus:border-purple-500 focus:ring-1 focus:ring-purple-500 appearance-none cursor-pointer"
              >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Applied Date</label>
              <div className="relative">
                <Calendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="date"
                  value={appliedDate}
                  onChange={(e) => setAppliedDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#080B11] border border-[#1E293B] rounded-xl text-slate-200 text-sm outline-none transition-all focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Job URL */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Job URL</label>
            <div className="relative">
              <Link size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="url"
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                placeholder="https://company.com/careers/job"
                className="w-full pl-10 pr-4 py-2.5 bg-[#080B11] border border-[#1E293B] rounded-xl text-slate-200 placeholder-slate-600 text-sm outline-none transition-all focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Notes / Additional Info</label>
            <div className="relative">
              <FileText size={15} className="absolute left-3.5 top-3 text-slate-500" />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any specific details about this application..."
                rows={3}
                className="w-full pl-10 pr-4 py-2.5 bg-[#080B11] border border-[#1E293B] rounded-xl text-slate-200 placeholder-slate-600 text-sm outline-none transition-all focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-[#1E293B] hover:bg-[#2D3748] text-slate-300 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:from-purple-800 disabled:to-indigo-800 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Update Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobModal;
