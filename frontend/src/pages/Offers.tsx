import React, { useEffect, useState } from "react";
import { JobService, JobApplication } from "../services/job.service";
import { Award, DollarSign, MapPin, Calendar, Check, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Offers = () => {
  const [offers, setOffers] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await JobService.getAll();
        if (response.success) {
          const filtered = response.data.filter((job: JobApplication) => job.status === "offer");
          setOffers(filtered);
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080B10] p-8 space-y-8 animate-pulse text-slate-200">
        <div className="h-10 w-1/3 bg-slate-800/50 rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-44 bg-slate-800/50 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080B10] text-slate-200 p-8 px-6 md:px-12 font-sans relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-green-500/5 blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1A2333] pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Offers Received</h1>
          <p className="text-slate-400 text-sm mt-1">
            Congratulations! Manage and review your active job offers, salary options, and details.
          </p>
        </div>
        <button
          onClick={() => navigate("/applications")}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-green-500/10 transition-all duration-200 active:scale-[0.98]"
        >
          View Applications
        </button>
      </div>

      {/* Grid Content */}
      {offers.length === 0 ? (
        <div className="bg-[#0E131F]/80 border border-[#1E293B] rounded-2xl p-16 text-center max-w-xl mx-auto shadow-xl">
          <div className="w-12 h-12 rounded-full bg-slate-800/40 flex items-center justify-center text-slate-500 mx-auto mb-4">
            <Award size={22} />
          </div>
          <h3 className="text-md font-semibold text-white">No job offers logged yet</h3>
          <p className="text-slate-500 text-xs mt-2 leading-relaxed">
            Keep applying and doing interviews! When you receive an offer, change your application status to <span className="text-green-400 font-semibold">Offer</span> to display it here.
          </p>
          <button
            onClick={() => navigate("/applications")}
            className="mt-6 px-5 py-2.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 font-semibold text-sm rounded-xl border border-green-500/20 transition-all active:scale-[0.98]"
          >
            Go to Applications List
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((job) => (
            <div
              key={job.id}
              className="bg-[#0E131F]/90 border border-[#1E293B] rounded-2xl p-6 shadow-xl relative overflow-hidden transition-all duration-300 hover:border-green-500/30 hover:translate-y-[-2px] group"
            >
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-green-500 to-emerald-500"></div>

              {/* Header Info */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">
                    {job.company}
                  </h3>
                  <p className="text-slate-400 text-sm font-medium mt-0.5">{job.position}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/20">
                  <Check size={16} />
                </div>
              </div>

              {/* Salary & Details */}
              <div className="space-y-2.5 text-xs text-slate-400 border-t border-[#1A2333] pt-4 mb-4">
                <div className="flex items-center gap-2">
                  <DollarSign size={14} className="text-green-400 font-bold" />
                  <span className="text-white font-semibold">Salary/Package: {job.salary || "—"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-slate-500" />
                  <span>Location: {job.location || "—"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={13} className="text-slate-500" />
                  <span>Applied Date: {job.appliedDate}</span>
                </div>
              </div>

              {/* Notes */}
              {job.notes && (
                <div className="bg-[#080B11] border border-[#1A2333] rounded-xl p-3.5 text-xs text-slate-400 italic mb-4 leading-relaxed">
                  <span className="font-bold not-italic text-slate-300 block mb-1">Offer notes:</span>
                  {job.notes}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between border-t border-[#1A2333] pt-4">
                <button
                  onClick={() => navigate("/applications")}
                  className="text-xs font-semibold text-green-400 hover:text-green-300 flex items-center gap-1 transition-all"
                >
                  Manage Details
                </button>
                {job.jobUrl && (
                  <a
                    href={job.jobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-slate-500 hover:text-slate-300 rounded-lg hover:bg-white/[0.03] transition-all"
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Offers;
