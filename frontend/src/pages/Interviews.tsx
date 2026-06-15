import React, { useEffect, useState } from "react";
import { JobService, JobApplication } from "../services/job.service";
import { Calendar, Briefcase, MapPin, ExternalLink, ArrowUpRight, IndianRupee, Gift, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useJobs } from "../contextApi/JobContext";

const Interviews = () => {
  const [interviews, setInterviews] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const { refreshStats } = useJobs();
  const navigate = useNavigate();

  const fetchInterviews = async () => {
    try {
      const response = await JobService.getAll();
      if (response.success) {
        // Filter jobs with status 'review' (interview) or 'in_progress'
        const filtered = response.data.filter(
          (job: JobApplication) => job.status === "review" || job.status === "in_progress"
        );
        setInterviews(filtered);
      }
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  const handleMoveToOffer = async (job: JobApplication) => {
    setUpdatingId(job.id!);
    try {
      const response = await JobService.update(job.id!, { status: "offer" });
      if (response.success) {
        refreshStats();
        fetchInterviews();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080B10] p-8 space-y-8 animate-pulse text-slate-200">
        <div className="h-10 w-1/3 bg-slate-800/50 rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-44 bg-slate-800/50 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080B10] text-slate-200 p-8 px-6 md:px-12 font-sans relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1A2333] pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Interviews</h1>
          <p className="text-slate-400 text-sm mt-1">
            Focus on your active interview processes, preparations, and follow-ups.
          </p>
        </div>
        <button
          onClick={() => navigate("/applications")}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-purple-500/10 transition-all duration-200 active:scale-[0.98]"
        >
          View All Applications
        </button>
      </div>

      {/* Content Grid */}
      {interviews.length === 0 ? (
        <div className="bg-[#0E131F]/80 border border-[#1E293B] rounded-2xl p-16 text-center max-w-xl mx-auto shadow-xl">
          <div className="w-12 h-12 rounded-full bg-slate-800/40 flex items-center justify-center text-slate-500 mx-auto mb-4">
            <Calendar size={22} />
          </div>
          <h3 className="text-md font-semibold text-white">No active interviews scheduled</h3>
          <p className="text-slate-500 text-xs mt-2 leading-relaxed">
            Interviews appear here automatically when you update your application status to <span className="text-purple-400 font-semibold">Reviews</span> or <span className="text-yellow-400 font-semibold">In Progress</span> on your applications list.
          </p>
          <button
            onClick={() => navigate("/applications")}
            className="mt-6 px-5 py-2.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 font-semibold text-sm rounded-xl border border-purple-500/20 transition-all active:scale-[0.98]"
          >
            Go to Applications List
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interviews.map((job) => (
            <div
              key={job.id}
              className="bg-[#0E131F] border border-[#1E293B] rounded-2xl p-6 shadow-xl relative overflow-hidden transition-all duration-300 hover:border-purple-500/30 hover:translate-y-[-2px] group"
            >
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-purple-500 to-indigo-500"></div>

              {/* Status Badge */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
                    {job.company}
                  </h3>
                  <p className="text-slate-400 text-sm font-medium mt-0.5">{job.position}</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold capitalize bg-purple-500/10 text-purple-400 border border-purple-500/20`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  {job.status.replace("_", " ")}
                </span>
              </div>

              {/* Details Row */}
              <div className="space-y-2 text-xs text-slate-400 border-t border-[#1A2333] pt-4 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-slate-500" />
                  <span>Location: {job.location || "—"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IndianRupee size={13} className="text-slate-500" />
                  <span>Salary: {job.salary || "—"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={13} className="text-slate-500" />
                  <span>Applied Date: {job.appliedDate}</span>
                </div>
              </div>

              {/* Notes */}
              {job.notes && (
                <div className="bg-[#080B11] border border-[#1A2333] rounded-xl p-3.5 text-xs text-slate-400 italic mb-4 leading-relaxed">
                  <span className="font-bold not-italic text-slate-300 block mb-1">Preparation / Notes:</span>
                  {job.notes}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between border-t border-[#1A2333] pt-4 gap-3">
                <button
                  onClick={() => navigate("/applications")}
                  className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-all"
                >
                  Details
                  <ArrowUpRight size={13} />
                </button>

                <button
                  onClick={() => handleMoveToOffer(job)}
                  disabled={updatingId === job.id}
                  className="flex-1 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-green-500/20 transition-all flex items-center justify-center gap-2"
                >
                  {updatingId === job.id ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <>
                      <Gift size={12} />
                      Got Offer
                    </>
                  )}
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

export default Interviews;
