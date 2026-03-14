"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageTransition from "../../components/PageTransition";
import { useRouter } from "next/navigation";

// --- Types ---
type EventData = {
  id: string; title: string; date: string; description: string; photoUrl: string; createdAt: string;
};

type AnnouncementData = {
  id: string; title: string; date: string; description: string; photoUrl: string; attachmentUrl: string; link: string; createdAt: string;
};

type TabType = 'events' | 'announcements';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('events');
  
  // --- State for Events ---
  const [events, setEvents] = useState<EventData[]>([]);
  
  // --- State for Announcements ---
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // --- Unified Form State ---
  const [formData, setFormData] = useState({
    title: "", date: "", description: "", photoUrl: "", attachmentUrl: "", link: ""
  });

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/secret-admin");
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'events') {
        const res = await fetch("/api/events");
        const data = await res.json();
        if (data.success) setEvents(data.events || []);
      } else {
        const res = await fetch("/api/announcements");
        const data = await res.json();
        if (data.success) setAnnouncements(data.announcements || []);
      }
    } catch (error) {
      console.error(`Failed to fetch ${activeTab}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const openModal = (item?: EventData | AnnouncementData) => {
    if (item) {
      if (activeTab === 'events') {
         const ev = item as EventData;
         setFormData({ title: ev.title, date: ev.date, description: ev.description, photoUrl: ev.photoUrl, attachmentUrl: "", link: "" });
      } else {
         const an = item as AnnouncementData;
         setFormData({ title: an.title, date: an.date, description: an.description, photoUrl: an.photoUrl, attachmentUrl: an.attachmentUrl, link: an.link });
      }
      setEditingId(item.id);
    } else {
      setFormData({ title: "", date: "", description: "", photoUrl: "", attachmentUrl: "", link: "" });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ title: "", date: "", description: "", photoUrl: "", attachmentUrl: "", link: "" });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const endpoint = activeTab === 'events' ? '/api/events' : '/api/announcements';
      const url = editingId ? `${endpoint}/${editingId}` : endpoint;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
         method,
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        await fetchData();
        closeModal();
      } else {
        alert("Action failed: " + data.error);
      }
    } catch (error) {
      alert("An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this forever?")) return;
    try {
      const endpoint = activeTab === 'events' ? '/api/events' : '/api/announcements';
      const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        fetchData();
      } else {
        alert("Delete failed: " + data.error);
      }
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <PageTransition>
      <div className="container-page py-32 min-h-screen">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2">Portal Dashboard</h1>
            <p className="text-white/50">Manage Google Sheets Database</p>
          </div>
          <button 
             onClick={handleLogout}
             className="px-6 py-3 border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors uppercase text-sm tracking-widest font-bold cursor-pointer"
          >
             Logout
          </button>
        </div>

        {/* TABS */}
        <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
           <button 
             onClick={() => setActiveTab('events')} 
             className={`px-6 py-3 font-bold uppercase tracking-widest text-sm transition-colors ${activeTab === 'events' ? 'bg-yellow-100 text-dark-950' : 'text-white/50 hover:text-white'}`}
           >
             Manage Events
           </button>
           <button 
             onClick={() => setActiveTab('announcements')} 
             className={`px-6 py-3 font-bold uppercase tracking-widest text-sm transition-colors ${activeTab === 'announcements' ? 'bg-yellow-100 text-dark-950' : 'text-white/50 hover:text-white'}`}
           >
             Manage Announcements
           </button>
        </div>

        <div className="flex justify-end mb-8">
           <button 
              onClick={() => openModal()}
              className="px-6 py-3 bg-white/10 border border-white/20 text-white hover:bg-white text-dark-950 hover:text-dark-950 transition-colors uppercase text-sm tracking-widest font-bold cursor-pointer"
            >
              + Create New {activeTab === 'events' ? 'Event' : 'Announcement'}
            </button>
        </div>
        
        {loading ? (
          <div className="glass-card p-12 text-center border-dashed border-2 border-white/10">
            <p className="text-yellow-100 font-bold uppercase tracking-widest animate-pulse">Fetching {activeTab}...</p>
          </div>
        ) : (activeTab === 'events' && events.length === 0) || (activeTab === 'announcements' && announcements.length === 0) ? (
          <div className="glass-card p-12 text-center border-dashed border-2 border-white/10">
            <p className="text-white/50 text-xl font-light">No {activeTab} found in Google Sheets.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeTab === 'events' ? events : announcements).map((item: any) => (
              <motion.div key={item.id} initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="glass-card flex flex-col p-6">
                 <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 text-yellow-100 text-[10px] uppercase font-bold tracking-widest mb-3">
                      {item.date}
                    </span>
                    <h3 className="text-xl font-black text-white leading-tight mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-white/50 text-sm line-clamp-3 mb-4">{item.description}</p>
                 </div>

                 {/* Visual Indicators */}
                 <div className="flex gap-2 mb-4 text-[10px] uppercase tracking-widest font-bold">
                    {item.photoUrl && <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Image URL ✓</span>}
                    {item.attachmentUrl && <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded">PDF Link ✓</span>}
                    {item.link && <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded">External Link ✓</span>}
                 </div>
                  
                  <div className="mt-auto pt-4 flex gap-3 border-t border-white/5">
                    <button onClick={() => openModal(item)} className="flex-1 py-2 text-white/70 hover:text-white hover:bg-white/5 border border-white/5 text-xs uppercase font-bold tracking-widest transition-colors cursor-pointer">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="flex-1 py-2 text-red-400/70 hover:text-red-400 hover:bg-red-400/10 border border-red-400/20 text-xs uppercase font-bold tracking-widest transition-colors cursor-pointer">
                      Delete
                    </button>
                  </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm">
           <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="max-w-2xl w-full max-h-[90vh] overflow-y-auto glass-card p-8 border border-yellow-100/20 shadow-2xl relative">
              <button onClick={closeModal} className="absolute top-6 right-6 text-2xl text-white/50 hover:text-white cursor-pointer">&times;</button>
              
              <h2 className="text-3xl font-black text-white mb-6 tracking-tighter uppercase">
                 {editingId ? `Edit ${activeTab.slice(0,-1)}` : `Create New ${activeTab.slice(0,-1)}`}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-yellow-100 text-xs font-bold uppercase tracking-widest mb-2">Title</label>
                    <input type="text" required value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full bg-dark-900 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-yellow-100/50" />
                  </div>
                  
                  <div>
                    <label className="block text-yellow-100 text-xs font-bold uppercase tracking-widest mb-2">Date / Posted On</label>
                    <input type="text" required value={formData.date} onChange={e=>setFormData({...formData, date: e.target.value})} className="w-full bg-dark-900 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-yellow-100/50" />
                  </div>

                  <div>
                    <label className="block text-yellow-100 text-xs font-bold uppercase tracking-widest mb-2">Photo URL (Optional)</label>
                    <input type="url" value={formData.photoUrl} onChange={e=>setFormData({...formData, photoUrl: e.target.value})} placeholder="https://..." className="w-full bg-dark-900 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-yellow-100/50" />
                  </div>

                  {activeTab === 'announcements' && (
                     <>
                        <div>
                          <label className="block text-yellow-100 text-xs font-bold uppercase tracking-widest mb-2">PDF Attachment URL (Optional)</label>
                          <input type="url" value={formData.attachmentUrl} onChange={e=>setFormData({...formData, attachmentUrl: e.target.value})} placeholder="https://..." className="w-full bg-dark-900 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-yellow-100/50" />
                        </div>
                        <div>
                          <label className="block text-yellow-100 text-xs font-bold uppercase tracking-widest mb-2">External Link (Optional)</label>
                          <input type="url" value={formData.link} onChange={e=>setFormData({...formData, link: e.target.value})} placeholder="https://..." className="w-full bg-dark-900 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-yellow-100/50" />
                        </div>
                     </>
                  )}

                  <div className="md:col-span-2">
                    <label className="block text-yellow-100 text-xs font-bold uppercase tracking-widest mb-2">Description</label>
                    <textarea required rows={5} value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} className="w-full bg-dark-900 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-yellow-100/50 resize-y" />
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/10">
                   <button type="submit" disabled={submitting} className="flex-1 bg-yellow-100 text-dark-950 font-bold uppercase tracking-widest py-3 hover:bg-white transition-colors cursor-pointer disabled:opacity-50">
                     {submitting ? "Saving to Sheets..." : `Save ${activeTab.slice(0,-1)}`}
                   </button>
                   <button type="button" onClick={closeModal} disabled={submitting} className="px-8 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/5 transition-colors cursor-pointer">
                     Cancel
                   </button>
                </div>
              </form>
           </motion.div>
        </div>
      )}
    </PageTransition>
  );
}
