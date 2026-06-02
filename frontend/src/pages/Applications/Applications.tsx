import React, { useEffect, useState } from "react";
import { JobService, JobApplication } from "../../services/job.service";
import { Search, Plus, Edit2, Trash2, ExternalLink, Calendar, MapPin, DollarSign, Briefcase } from "lucide-react";
import AddJobModal from "../../components/modals/AddJobModal";
import EditJobModal from "../../components/modals/EditJobModal";
import DeleteConfirmModal from "../../components/modals/DeleteConfirmModal";
import Pagination from "../../components/Pagination";

const Applications = () => {
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  // Selected Job for edit/delete
  const [selectedJob, setSelectedJob] = useState<JobApplication | null>(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await JobService.getAll();
      if (response.success) {
        setJobs(response.data);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Filter & Search Logic
  useEffect(() => {
    let result = jobs;

    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter((job) => job.status === statusFilter);
    }

    // Search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (job) =>
          job.company.toLowerCase().includes(query) ||
          job.position.toLowerCase().includes(query) ||
          (job.location && job.location.toLowerCase().includes(query))
      );
    }

    setFilteredJobs(result);
    setCurrentPage(1); // Reset page on filter/search change
  }, [jobs, searchQuery, statusFilter]);

  // Paginated items
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

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

  const handleEditClick = (job: JobApplication) => {
    setSelectedJob(job);
    setIsEditOpen(true);
  };

  const handleDeleteClick = (job: JobApplication) => {
    setSelectedJob(job);
    setIsDeleteOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#080B10] text-slate-200 p-8 px-6 md:px-12 font-sans relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1A2333] pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Applications</h1>
          <p className="text-slate-400 text-sm mt-1">
            Keep track of all your ongoing and past job applications.
          </p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-purple-500/10 transition-all duration-200 active:scale-[0.98] self-start md:self-auto"
        >
          <Plus size={16} />
          Add Application
        </button>
      </div>

      {/* Controls: Search & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by company, role, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-[#0D111A]/90 border border-[#1E293B] rounded-xl text-slate-200 placeholder-slate-600 text-sm outline-none transition-all focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">Filter:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-[#0D111A]/90 border border-[#1E293B] rounded-xl text-slate-200 text-sm outline-none transition-all focus:border-purple-500 focus:ring-1 focus:ring-purple-500 cursor-pointer"
          >
            <option value="all">All Applications</option>
            <option value="applied">Applied</option>
            <option value="in_progress">In Progress</option>
            <option value="review">Interviews</option>
            <option value="offer">Offers</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[#0E131F]/80 backdrop-blur-md border border-[#1E293B] rounded-2xl overflow-hidden shadow-xl">
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
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A2333] text-sm text-slate-300">
              {loading ? (
                // Table Skeletons
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-5"><div className="h-4 bg-slate-800/60 rounded w-24"></div></td>
                    <td className="px-6 py-5"><div className="h-4 bg-slate-800/60 rounded w-32"></div></td>
                    <td className="px-6 py-5"><div className="h-4 bg-slate-800/60 rounded w-20"></div></td>
                    <td className="px-6 py-5"><div className="h-4 bg-slate-800/60 rounded w-16"></div></td>
                    <td className="px-6 py-5"><div className="h-6 bg-slate-800/60 rounded-full w-24"></div></td>
                    <td className="px-6 py-5"><div className="h-4 bg-slate-800/60 rounded w-20"></div></td>
                    <td className="px-6 py-5 text-right"><div className="h-4 bg-slate-800/60 rounded w-12 ml-auto"></div></td>
                  </tr>
                ))
              ) : paginatedJobs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-slate-800/40 flex items-center justify-center text-slate-500 mb-3">
                        <Briefcase size={22} />
                      </div>
                      <h4 className="text-sm font-semibold text-slate-300">No applications matching criteria</h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-xs">
                        Try modifying your search query or filters, or add a new application.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-6 py-4 font-semibold text-white group-hover:text-purple-400 transition-colors">
                      {job.company}
                    </td>
                    <td className="px-6 py-4">{job.position}</td>
                    <td className="px-6 py-4 text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-slate-600" />
                        {job.location || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-400">
                      <span className="flex items-center gap-1">
                        <DollarSign size={13} className="text-slate-600" />
                        {job.salary || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadgeClass(job.status)}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${getStatusDotColor(job.status)}`} />
                        {job.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-slate-600" />
                        {job.appliedDate}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2.5">
                        {job.jobUrl && (
                          <a
                            href={job.jobUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-500 hover:text-slate-300 rounded-lg hover:bg-white/[0.03] transition-all"
                            title="Job URL"
                          >
                            <ExternalLink size={15} />
                          </a>
                        )}
                        <button
                          onClick={() => handleEditClick(job)}
                          className="p-1.5 text-slate-500 hover:text-purple-400 rounded-lg hover:bg-white/[0.03] transition-all"
                          title="Edit"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(job)}
                          className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-white/[0.03] transition-all"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Reusable Pagination component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredJobs.length}
          itemsPerPage={itemsPerPage}
        />
      </div>

      {/* Modals */}
      <AddJobModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSuccess={fetchApplications}
      />

      <EditJobModal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedJob(null);
        }}
        onSuccess={fetchApplications}
        job={selectedJob}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedJob(null);
        }}
        onSuccess={fetchApplications}
        jobId={selectedJob?.id || null}
        companyName={selectedJob?.company || ""}
      />
    </div>
  );
};

export default Applications;
