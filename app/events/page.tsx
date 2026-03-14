"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import Link from "next/link";
import Image from "next/image";

type EventData = {
  id: string;
  title: string;
  date: string;
  description: string;
  photoUrl: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        if (data.success) {
           setEvents(data.events || []);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <PageTransition>
      <div className="pb-32 overflow-hidden">
        {/* ===== HEADER ===== */}
        <section className="relative min-h-[50vh] flex flex-col items-center justify-center page-top container-page text-center">
          <motion.div className="z-10 w-full max-w-5xl flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="inline-block mb-6 px-6 py-2  border border-yellow-100/30 bg-yellow-100/10 backdrop-blur-md text-yellow-100 text-sm font-semibold tracking-widest uppercase"
            >
              Hall Activities
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl lg:text-[10vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30 uppercase mb-4 leading-none"
            >
              Events
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-lg md:text-2xl text-center text-white/50 max-w-2xl font-light leading-relaxed mt-4"
            >
              A visual archive of the cultural, technical, and sports events organized at Kratu Hall of Residence.
            </motion.p>
          </motion.div>
        </section>

        {/* ===== EVENTS GRID ===== */}
        <section className="container-page mt-12 mb-32 z-20 relative min-h-[40vh]">
          {loading ? (
             <div className="flex items-center justify-center h-64">
                <div className="text-yellow-100 font-bold uppercase tracking-widest animate-pulse">Loading Events Archive...</div>
             </div>
          ) : events.length === 0 ? (
             <div className="glass-card p-12 text-center border-dashed border-2 border-white/10">
                <p className="text-white/50 text-xl font-light">No events have been posted yet. Check back later!</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((ev, i) => (
                <Link href={`/events/${ev.id}`} key={ev.id} className="block group">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6, delay: (({i} as any) % 3) * 0.1 }}
                    className="glass-card h-full flex flex-col relative overflow-hidden"
                  >
                    <div className="h-64 md:h-80 w-full relative bg-dark-900 border-b border-white/10 overflow-hidden">
                       {ev.photoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img 
                            src={ev.photoUrl} 
                            alt={ev.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          />
                       ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/20 font-bold uppercase tracking-widest text-xs bg-dark-800">No Image</div>
                       )}
                       <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-transparent to-transparent opacity-80" />
                       <div className="absolute bottom-4 left-6">
                         <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-yellow-100 text-[10px] uppercase font-bold tracking-widest">
                           {ev.date}
                         </span>
                       </div>
                    </div>
                    
                    <div className="p-8 flex-1 flex flex-col">
                      <h3 className="text-3xl font-black text-white leading-tight mb-4 group-hover:text-yellow-100 transition-colors">{ev.title}</h3>
                      <p className="text-white/50 text-base line-clamp-3 mb-6 relative z-10">{ev.description}</p>
                      <div className="mt-auto flex items-center text-yellow-100 font-bold uppercase tracking-widest text-xs group-hover:translate-x-2 transition-transform">
                        Read More <span className="ml-2">→</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </PageTransition>
  );
}
