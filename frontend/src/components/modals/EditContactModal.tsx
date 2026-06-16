import React, { useState, useEffect } from "react";
import { X, User, Building, Mail, Phone, Link, Loader2 } from "lucide-react";
import { updateContactService } from "../../services/apiServices";
import useApiCall from "../../hooks/useApiCall";

interface Contact {
  id: number;
  name: string;
  role?: string;
  company?: string;
  email?: string;
  phone?: string;
  linkedIn?: string;
}

interface EditContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  contact: Contact | null;
}

const EditContactModal = ({ isOpen, onClose, onSuccess, contact }: EditContactModalProps) => {
  const { callApi } = useApiCall();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (contact && isOpen) {
      setName(contact.name || "");
      setRole(contact.role || "");
      setCompany(contact.company || "");
      setEmail(contact.email || "");
      setPhone(contact.phone || "");
      setLinkedIn(contact.linkedIn || "");
      setError("");
    }
  }, [contact, isOpen]);

  if (!isOpen || !contact) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = { name, role, company, email, phone, linkedIn };
      const response = await updateContactService(callApi, contact.id, payload);

      if (response?.success) {
        onSuccess();
        onClose();
      } else {
        setError(response?.errMessage || "Failed to update contact");
      }
    } catch (err: any) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#04060A]/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="w-full max-w-lg bg-[#0D111A] border border-[#1E293B] rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform scale-100 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1A2333]">
          <div className="flex items-center gap-2">
            <User className="text-purple-500" size={20} />
            <h3 className="text-lg font-bold text-white">Edit Contact</h3>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 p-1.5 rounded-lg hover:bg-white/[0.03] transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Full Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sarah Chen"
                className="w-full px-4 py-2.5 bg-[#080B11] border border-[#1E293B] rounded-xl text-slate-200 placeholder-slate-600 text-sm outline-none focus:border-purple-500 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Role / Title</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Technical Recruiter"
                className="w-full px-4 py-2.5 bg-[#080B11] border border-[#1E293B] rounded-xl text-slate-200 placeholder-slate-600 text-sm outline-none focus:border-purple-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Company</label>
            <div className="relative">
              <Building size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Google, Stripe, etc."
                className="w-full pl-10 pr-4 py-2.5 bg-[#080B11] border border-[#1E293B] rounded-xl text-slate-200 placeholder-slate-600 text-sm outline-none focus:border-purple-500 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#080B11] border border-[#1E293B] rounded-xl text-slate-200 placeholder-slate-600 text-sm outline-none focus:border-purple-500 transition-all"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Phone Number</label>
              <div className="relative">
                <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#080B11] border border-[#1E293B] rounded-xl text-slate-200 placeholder-slate-600 text-sm outline-none focus:border-purple-500 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">LinkedIn Profile</label>
            <div className="relative">
              <Link size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="url"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className="w-full pl-10 pr-4 py-2.5 bg-[#080B11] border border-[#1E293B] rounded-xl text-slate-200 placeholder-slate-600 text-sm outline-none focus:border-purple-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-6">
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
              className="flex-[2] px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : "Update Contact"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContactModal;
