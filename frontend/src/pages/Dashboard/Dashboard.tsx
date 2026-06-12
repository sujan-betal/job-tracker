import React, { useEffect, useState } from "react";
import { useAuth } from "../../contextApi/AuthContext";
import { JobService, JobApplication } from "../../services/job.service";
import { Briefcase, Clock, Award, CheckCircle, ArrowUpRight, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddJobModal from "../../components/modals/AddJobModal";

interface Stats {
  total_applied: number;
  in_progress: number;
  reviews: number;
  offers: number;
}

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({
    total_applied: 0,
    in_progress: 0,
    reviews: 0,
    offers: 0,
  });
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const fetchDashboardData = async () => {
    const token = localStorage.getItem("token");
    console.log("🚀 [Dashboard Sub] fetchDashboardData called. Token exists:", !!token);

    if (!token) {
      console.error("❌ [Dashboard Sub] No token found in localStorage!");
      setLoading(false);
      return;
    }

    setLoading(true);

    // Fetch Stats independently
    const fetchStats = async () => {
      try {
        const res = await JobService.getStats();
        console.log("📊 [Dashboard Sub] Stats Raw Response:", res);
        if (res && res.success) {
          setStats(res.data);
          console.log("✅ [Dashboard Sub] Stats updated");
        }
      } catch (err) {
        console.error("❌ [Dashboard Sub] Stats fetch error:", err);
      }
    };

    // Fetch Applications independently
    const fetchApps = async () => {
      try {
        const res = await JobService.getAll();
        console.log("📋 [Dashboard Sub] Apps Raw Response:", res);

        if (res && res.success) {
          let data = res.data;
          // If data is an object with a 'rows' property (common in Sequelize findAndCountAll)
          if (data && !Array.isArray(data) && Array.isArray(data.rows)) {
            data = data.rows;
          }

          const finalData = Array.isArray(data) ? data : [];
          console.log(`✅ [Dashboard Sub] Setting ${finalData.length} applications`);
          setApplications(finalData);
        } else {
          console.warn("⚠️ [Dashboard Sub] Apps fetch success was false or res null", res);
        }
      } catch (err) {
        console.error("❌ [Dashboard Sub] Apps fetch error:", err);
      }
    };

    await Promise.allSettled([fetchStats(), fetchApps()]);
    setLoading(false);
  };

  useEffect(() => {
    console.log("📌 Dashboard Sub Component (src/pages/Dashboard/Dashboard.tsx) Mounted");
    fetchDashboardData();
  }, []);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      case "in_progress":
        return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
      case "review":
        return "bg-purple-500/10 text-purple-400 border border-purple-500/20";
      case "offer":
        return "bg-green-500/10 text-green-400 border border-green-500/20";
      case "rejected":
        return "bg-red-500/10 text-red-400 border border-red-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border border-slate-500/20";
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case "applied": return "bg-blue-400";
      case "in_progress": return "bg-yellow-400";
      case "review": return "bg-purple-400";
      case "offer": return "bg-green-400";
      case "rejected": return "bg-red-400";
      default: return "bg-slate-400";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080B10] p-8 space-y-8 animate-pulse text-slate-200">
        <div className="h-10 w-1/3 bg-slate-800/50 rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-800/50 rounded-2xl"></div>
          ))}
        </div>
        <div className="h-64 bg-slate-800/50 rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080B10] text-slate-200 p-8 px-6 md:px-12 font-sans relative overflow-hidden">
      {/* Subtle Glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1A2333] pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">
            Welcome back, <span className="text-purple-400 font-semibold">{user?.name}</span> 🎉 Here is your search progress.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/applications")}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-purple-500/10 transition-all duration-200 active:scale-[0.98]"
          >
            <PlusCircle size={16} />
            Manage Applications
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {/* Total Applied */}
        <div className="bg-[#0E131F]/90 backdrop-blur-md border border-[#1E293B] rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-blue-500/30 hover:translate-y-[-2px] relative group overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 to-indigo-500"></div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">Total Applied</p>
              <h3 className="text-4xl font-extrabold text-white mt-3">{stats.total_applied}</h3>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
              <Briefcase size={20} />
            </div>
          </div>
        </div>

        {/* In Progress */}
        <div className="bg-[#0E131F]/90 backdrop-blur-md border border-[#1E293B] rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-yellow-500/30 hover:translate-y-[-2px] relative group overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-yellow-500 to-amber-500"></div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">In Progress</p>
              <h3 className="text-4xl font-extrabold text-white mt-3">{stats.in_progress}</h3>
            </div>
            <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-400">
              <Clock size={20} />
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-[#0E131F]/90 backdrop-blur-md border border-[#1E293B] rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-purple-500/30 hover:translate-y-[-2px] relative group overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-purple-500 to-pink-500"></div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">Interviews</p>
              <h3 className="text-4xl font-extrabold text-white mt-3">{stats.reviews}</h3>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
              <Award size={20} />
            </div>
          </div>
        </div>

        {/* Offers */}
        <div className="bg-[#0E131F]/90 backdrop-blur-md border border-[#1E293B] rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-green-500/30 hover:translate-y-[-2px] relative group overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-green-500 to-emerald-500"></div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">Offers</p>
              <h3 className="text-4xl font-extrabold text-white mt-3">{stats.offers}</h3>
            </div>
            <div className="p-3 rounded-xl bg-green-500/10 text-green-400">
              <CheckCircle size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* All Applications Section */}
      <div className="bg-[#0E131F]/80 backdrop-blur-md border border-[#1E293B] rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-[#1A2333] flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">All Applications</h2>
          <div className="text-xs font-semibold text-slate-500">
            Showing {applications.length} applications
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-[#0B0E17]/60 text-slate-400 text-xs font-bold tracking-wider uppercase border-b border-[#1A2333]">
              <tr>
                <th className="px-6 py-4 text-left">Company</th>
                <th className="px-6 py-4 text-left">Position</th>
                <th className="px-6 py-4 text-left">Location</th>
                <th className="px-6 py-4 text-left">Salary</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Applied Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A2333] text-sm text-slate-300">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-slate-800/40 flex items-center justify-center text-slate-500 mb-3">
                        <Briefcase size={22} />
                      </div>
                      <h4 className="text-sm font-semibold text-slate-300">No applications added yet</h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-xs">
                        Start tracking your job search by adding your very first job application.
                      </p>
                      <button
                        onClick={() => setIsAddOpen(true)}
                        className="mt-4 px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 font-semibold text-xs rounded-xl border border-purple-500/20 transition-all active:scale-[0.98]"
                      >
                        Add Job Application
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                applications.map((job) => (
                  <tr key={job.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-6 py-4 font-semibold text-white group-hover:text-purple-400 transition-colors">
                      {job.company}
                    </td>
                    <td className="px-6 py-4">{job.position}</td>
                    <td className="px-6 py-4 text-slate-400">{job.location || "—"}</td>
                    <td className="px-6 py-4 font-mono text-slate-400">{job.salary || "—"}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadgeClass(job.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(job.status)}`} />
                        {job.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{job.appliedDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <AddJobModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onSuccess={fetchDashboardData} />
    </div>
  );
};

export default Dashboard;
