import React from "react";
import { FolderOpen, Info } from "lucide-react";

const Documents = () => {
  return (
    <div className="min-h-screen bg-[#080B10] text-slate-200 p-8 px-6 md:px-12 font-sans flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-md w-full bg-[#0E131F]/90 border border-[#1E293B] rounded-2xl p-8 text-center shadow-xl relative overflow-hidden transition-all duration-300 hover:border-purple-500/20">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-purple-500 to-indigo-500"></div>

        <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 mx-auto mb-6 border border-purple-500/20 animate-pulse">
          <FolderOpen size={24} />
        </div>

        <h2 className="text-xl font-extrabold text-white tracking-tight">Documents Vault</h2>
        <p className="text-slate-400 text-sm mt-3 leading-relaxed">
          Store, track, and manage specific versions of your resumes, cover letters, and transcripts tailored for each of your job applications.
        </p>

        <div className="mt-6 flex items-center gap-2.5 p-3.5 bg-slate-800/20 border border-[#1E293B] rounded-xl text-left text-[11px] text-slate-400 leading-snug">
          <Info size={16} className="text-purple-400 flex-shrink-0" />
          <p>
            This feature is currently under active development. You will soon be able to upload PDFs and match resumes with applied positions.
          </p>
        </div>

        <div className="mt-6 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
          Coming Soon in Version 1.1
        </div>
      </div>
    </div>
  );
};

export default Documents;
