import React from "react";


import React from "react";
import Sidebar from "../components/Sidebar";

// ─── Types ───────────────────────────────────
// type JobStatus = "Applied" | "Interview" | "Offer" | "Rejected";

// interface Job {
//   id:       number;
//   company:  string;
//   role:     string;
//   location: string;
//   salary:   string;
//   applied:  string;
//   status:   JobStatus;
//   logo:     string;
//   color:    string;
// }

// ─── Mock Data ───────────────────────────────
// const JOBS: Job[] = [
//   { id: 1, company: "Stripe",  role: "Senior Frontend Engineer", location: "Remote",        salary: "$160k–$200k", applied: "May 2",  status: "Interview", logo: "S", color: "#635BFF" },
//   { id: 2, company: "Notion",  role: "Product Designer",         location: "San Francisco", salary: "$140k–$170k", applied: "May 5",  status: "Applied",   logo: "N", color: "#1a1a1a" },
//   { id: 3, company: "Vercel",  role: "Developer Advocate",       location: "Remote",        salary: "$130k–$155k", applied: "Apr 28", status: "Offer",     logo: "▲", color: "#333333" },
//   { id: 4, company: "Linear",  role: "UI Engineer",              location: "Remote",        salary: "$150k–$180k", applied: "Apr 20", status: "Rejected",  logo: "L", color: "#5E6AD2" },
//   { id: 5, company: "Figma",   role: "Software Engineer",        location: "New York",      salary: "$155k–$195k", applied: "May 8",  status: "Applied",   logo: "F", color: "#F24E1E" },
//   { id: 6, company: "Arc",     role: "React Developer",          location: "Remote",        salary: "$120k–$145k", applied: "May 10", status: "Interview", logo: "A", color: "#FF5F57" },
// ];

// const STATUS_META: Record<JobStatus, { color: string; bg: string; dot: string }> = {
//   Applied:   { color: "#60A5FA", bg: "rgba(96,165,250,0.12)",  dot: "#60A5FA" },
//   Interview: { color: "#FBBF24", bg: "rgba(251,191,36,0.12)",  dot: "#FBBF24" },
//   Offer:     { color: "#34D399", bg: "rgba(52,211,153,0.12)",  dot: "#34D399" },
//   Rejected:  { color: "#F87171", bg: "rgba(248,113,113,0.12)", dot: "#F87171" },
// };

// ─── Stat Card ───────────────────────────────
// interface StatCardProps {
//   label: string;
//   value: number;
//   accent: string;
//   icon: string;
// }
// const StatCard = ({ label, value, accent, icon }: StatCardProps) => (
//   <div style={{ ...styles.statCard }}>
//     <div style={{ ...styles.statIcon, background: `${accent}18`, color: accent }}>{icon}</div>
//     <div style={{ ...styles.statValue, color: accent }}>{value}</div>
//     <div style={styles.statLabel}>{label}</div>
//     <div style={{ ...styles.statBar, background: `linear-gradient(90deg, ${accent}55, transparent)` }} />
//   </div>
// );

// ─── Job Row (Recent Applications table) ─────
// interface JobRowProps { job: Job }
// const JobRow = ({ job }: JobRowProps) => {
//   const meta = STATUS_META[job.status];
//   return (
//     <div style={styles.jobRow}>
//       <div style={styles.jobRowLeft}>
//         <div style={{ ...styles.logoSm, background: job.color }}>{job.logo}</div>
//         <div>
//           <p style={styles.jobCompany}>{job.company}</p>
//           <p style={styles.jobRole}>{job.role}</p>
//         </div>
//       </div>
//       <p style={styles.jobLocation}>{job.location}</p>
//       <p style={styles.jobSalary}>{job.salary}</p>
//       <span style={{ ...styles.statusBadge, background: meta.bg, color: meta.color, border: `1px solid ${meta.color}33` }}>
//         <span style={{ ...styles.statusDot, background: meta.dot }} />
//         {job.status}
//       </span>
//       <p style={styles.jobDate}>{job.applied}</p>
//     </div>
//   );
// };

// ─── Main Dashboard ───────────────────────────
// const Dashboard = () => {
//   const total     = JOBS.length;
//   const applied   = JOBS.filter(j => j.status === "Applied").length;
//   const interview = JOBS.filter(j => j.status === "Interview").length;
//   const offer     = JOBS.filter(j => j.status === "Offer").length;

//   const pct = (n: number) => `${Math.round((n / total) * 100)}%`;

const Dashboard = () => {
  return (
    <div className="bg-white-700 min-h-screen p-8 px-20">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b border-gray-200 ">
        <div>
          <h1 className="text-gray-900 text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Welcome back, Sujan 🎉</p>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search jobs, companies..."
            className="bg-gray-50 border border-gray-300 rounded-lg px-5 py-2 outline-none text-sm w-64 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />
          <button className="bg-purple-500 hover:bg-purple-600 px-5 py-2 rounded-lg font-semibold text-white transition-colors">
            + Add Job
          </button>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-4 gap-4 mt-3">
        {/* Total Applied Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg">
          <p className="text-sm opacity-90">Total Applied</p>
          <p className="text-4xl font-bold mt-2">0</p>
        </div>

        {/* In Progress Card */}
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-5 text-white shadow-lg">
          <p className="text-sm opacity-90">In Progress</p>
          <p className="text-4xl font-bold mt-2">0</p>
        </div>

        {/* Reviews Card */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg">
          <p className="text-sm opacity-90">Reviews</p>
          <p className="text-4xl font-bold mt-2">0</p>
        </div>

        {/* Offers Card */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg">
          <p className="text-sm opacity-90">Offers</p>
          <p className="text-4xl font-bold mt-2">0</p>
        </div>
      </div>

      <div className="bg-white border-2 border-black rounded-xl overflow-hidden mt-4">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Recent Applications</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="bg-gray-50 rounded-lg">
                        <div className="text-center py-12">
                          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                          </svg>
                          <h3 className="mt-2 text-sm font-medium text-gray-900">No applications found</h3>
                          <p className="mt-1 text-sm text-gray-500">No job applications have been added yet.</p>
                          
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>






    </div>
  );
};

export default Dashboard;
