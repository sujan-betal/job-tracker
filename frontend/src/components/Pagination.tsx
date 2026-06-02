import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const startRange = (currentPage - 1) * itemsPerPage + 1;
  const endRange = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border-t border-[#1A2333] bg-[#0E131F]/50 select-none">
      {/* Description */}
      <div className="text-xs text-slate-500 text-center sm:text-left">
        Showing <span className="text-slate-300 font-semibold">{startRange}</span> to{" "}
        <span className="text-slate-300 font-semibold">{endRange}</span> of{" "}
        <span className="text-slate-300 font-semibold">{totalItems}</span> applications
      </div>

      {/* Pages Controls */}
      <div className="flex items-center justify-center gap-1.5">
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1.5 rounded-lg border border-[#1E293B] bg-[#0D111A]/80 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${
              currentPage === num
                ? "bg-purple-600/10 border-purple-500 text-purple-400"
                : "border-[#1E293B] bg-[#0D111A]/80 text-slate-400 hover:text-slate-200"
            }`}
          >
            {num}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded-lg border border-[#1E293B] bg-[#0D111A]/80 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
