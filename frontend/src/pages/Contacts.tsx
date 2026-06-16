import React, { useState, useEffect } from "react";
import { Users, Search, Phone, Mail, Building, Plus, MoreVertical, ExternalLink, UserPlus, Trash2, Loader2, Edit2 } from "lucide-react";
import useApiCall from "../hooks/useApiCall";
import { fetchContactsService, deleteContactService } from "../services/apiServices";
import AddContactModal from "../components/modals/AddContactModal";
import EditContactModal from "../components/modals/EditContactModal";

interface Contact {
  id: number;
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  linkedIn?: string;
}

const Contacts = () => {
  const { callApi } = useApiCall();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const getContacts = async () => {
    setLoading(true);
    try {
      const response = await fetchContactsService(callApi);
      if (response?.success) {
        setContacts(response.data);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const handleEdit = (contact: Contact) => {
    setSelectedContact(contact);
    setIsEditOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    
    setDeletingId(id);
    try {
      const response = await deleteContactService(callApi, id);
      if (response?.success) {
        getContacts();
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredContacts = contacts.filter(c => 
    c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#080B10] text-slate-200 p-8 px-6 md:px-12 font-sans relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Users className="text-purple-500" />
              Recruiter Network
            </h1>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Manage your professional network. Keep track of recruiters and hiring managers you've connected with.
            </p>
          </div>

          <button 
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-sm transition-all active:scale-95 shadow-lg shadow-purple-500/20"
          >
            <UserPlus size={18} />
            Add Contact
          </button>
        </div>

        <div className="relative max-w-md mb-8">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#0E131F]/90 border border-[#1E293B] rounded-2xl text-slate-200 placeholder-slate-600 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-[#0E131F]/50 border border-[#1E293B] rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : filteredContacts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-[#0E131F] border border-[#1E293B] rounded-2xl p-6 hover:border-purple-500/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500/0 via-purple-500 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 text-lg font-bold">
                    {contact.name.slice(0, 1)}
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => handleEdit(contact)}
                      className="p-2 text-slate-600 hover:text-purple-400 hover:bg-purple-400/5 rounded-lg transition-colors"
                      title="Edit Contact"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(contact.id)}
                      disabled={deletingId === contact.id}
                      className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-colors"
                      title="Delete Contact"
                    >
                      {deletingId === contact.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1 mb-5">
                  <h3 className="text-white font-bold text-lg">{contact.name}</h3>
                  <p className="text-purple-400 text-xs font-semibold uppercase tracking-wider">{contact.role || "Recruiter"}</p>
                  <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                    <Building size={14} className="text-slate-600" />
                    {contact.company || "Unknown Company"}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#1E293B]">
                  {contact.email && (
                    <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-slate-400 hover:text-white text-sm transition-colors group/link">
                      <Mail size={16} className="text-slate-600 group-hover/link:text-purple-400" />
                      {contact.email}
                    </a>
                  )}
                  {contact.phone && (
                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                      <Phone size={16} className="text-slate-600" />
                      {contact.phone}
                    </div>
                  )}
                </div>

                {contact.linkedIn && (
                  <a 
                    href={contact.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full py-2.5 bg-slate-800/50 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-[#1E293B]"
                  >
                    View LinkedIn
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#0E131F]/50 border border-dashed border-[#1E293B] rounded-3xl">
            <Users size={40} className="text-slate-700 mx-auto mb-4" />
            <h3 className="text-white font-bold">No contacts found</h3>
            <p className="text-slate-500 text-sm mt-1">Add your professional connections to track your network.</p>
            <button 
              onClick={() => setIsAddOpen(true)}
              className="mt-6 px-5 py-2.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 font-semibold text-sm rounded-xl border border-purple-500/20 transition-all"
            >
              Add Your First Contact
            </button>
          </div>
        )}
      </div>

      <AddContactModal 
        isOpen={isAddOpen} 
        onClose={() => setIsAddOpen(false)} 
        onSuccess={getContacts} 
      />

      <EditContactModal
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedContact(null);
        }}
        onSuccess={getContacts}
        contact={selectedContact}
      />
    </div>
  );
};

export default Contacts;
