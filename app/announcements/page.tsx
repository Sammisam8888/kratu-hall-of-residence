"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";

type AnnouncementData = {
  id: string;
  title: string;
  date: string;
  description: string;
  photoUrl: string;
  attachmentUrl: string;
  link: string;
};

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const res = await fetch("/api/announcements");
        const data = await res.json();
        if (data.success) {
           setAnnouncements(data.announcements || []);
        }
      } catch (err) {
        console.error("Error fetching announcements:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAnnouncements();
  }, []);

  return (
    <PageTransition>
      <div className="pb-32 overflow-hidden">
        {/* ===== HEADER ===== */}
        <section className="relative min-h-[40vh] flex flex-col items-center justify-center page-top container-page text-center">
          <motion.div className="z-10 w-full max-w-5xl flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block mb-6 px-6 py-2 border border-blue-400/30 bg-blue-400/10 backdrop-blur-md text-blue-300 text-sm font-semibold tracking-widest uppercase"
            >
              Official Notices
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl lg:text-[8vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30 uppercase mb-4 leading-none"
            >
              Announcements
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-center text-white/50 max-w-2xl font-light leading-relaxed mt-4"
            >
              Stay updated with the latest official notices, circulars, and important information from the Kratu Hall administration.
            </motion.p>
          </motion.div>
        </section>

        {/* ===== ANNOUNCEMENTS LIST ===== */}
        <section className="container-page mt-8 mb-32 z-20 relative min-h-[50vh] max-w-4xl mx-auto">
          {loading ? (
             <div className="flex items-center justify-center h-64">
                <div className="text-blue-300 font-bold uppercase tracking-widest animate-pulse">Loading Official Notices...</div>
             </div>
          ) : announcements.length === 0 ? (
             <div className="glass-card p-12 text-center border-dashed border-2 border-white/10">
                <p className="text-white/50 text-xl font-light">There are no active announcements at this time.</p>
             </div>
          ) : (
            <div className="space-y-6">
              {announcements.map((ann, i) => (
                <motion.div
                  key={ann.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: (({i} as any) % 5) * 0.1 }}
                  className="glass-card p-8 border-l-4 border-l-blue-400/50 hover:border-l-blue-400 transition-colors flex flex-col md:flex-row gap-8"
                >
                  
                  {/* Optional Image Thumbnail */}
                  {ann.photoUrl && (
                     <div className="w-full md:w-48 h-48 md:h-auto shrink-0 bg-dark-900 rounded overflow-hidden border border-white/5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={ann.photoUrl} alt="Announcement cover" className="w-full h-full object-cover" />
                     </div>
                  )}

                  <div className="flex-1 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-white/5 text-blue-300 text-[10px] uppercase font-bold tracking-widest border border-blue-400/20">
                          {ann.date}
                        </span>
                        {/* Status badge if recently posted, but we just use date for now */}
                      </div>
                      
                      <h3 className="text-2xl font-black text-white leading-tight mb-4">
                        {ann.title}
                      </h3>
                      
                      <div className="prose prose-sm prose-invert text-white/60 mb-6 font-light">
                          {ann.description.split('\n').map((p, idx) => (
                             <p key={idx} className="mb-2">{p}</p>
                          ))}
                      </div>

                      <div className="mt-auto flex flex-wrap gap-4">
                        {ann.attachmentUrl && (
                           <a 
                             href={ann.attachmentUrl} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors bg-red-500/10 px-4 py-2 border border-red-500/20"
                           >
                              📄 View PDF Attachment
                           </a>
                        )}
                        {ann.link && (
                           <a 
                             href={ann.link} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-400 hover:text-green-300 transition-colors bg-green-500/10 px-4 py-2 border border-green-500/20"
                           >
                              🔗 External Link
                           </a>
                        )}
                      </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </PageTransition>
  );
}
