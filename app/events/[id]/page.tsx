"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import PageTransition from "../../components/PageTransition";
import Link from "next/link";
import Image from "next/image";

type EventData = {
  id: string;
  title: string;
  date: string;
  description: string;
  photoUrl: string;
};

export default function SingleEventPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
        // Fetch all events and find the one matching the ID
        // (In a highly optimized app, we'd have a specific GET /api/events/[id] endpoint, 
        // but for a small sheet, filtering clientside or via the generic GET is fine for now)
        const res = await fetch("/api/events");
        const data = await res.json();
        
        if (data.success && data.events) {
           const found = data.events.find((e: EventData) => e.id === params.id);
           if (found) {
             setEvent(found);
           } else {
             // Event not found, redirect to events gallery
             router.push('/events');
           }
        }
      } catch (err) {
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    }
    
    if (params.id) {
       fetchEvent();
    }
  }, [params.id, router]);

  if (loading) {
     return (
        <div className="min-h-screen flex items-center justify-center">
           <div className="text-yellow-100 font-bold uppercase tracking-widest animate-pulse">Loading Event...</div>
        </div>
     );
  }

  if (!event) return null;

  return (
    <PageTransition>
      <div className="pb-32 pt-32 overflow-hidden container-page min-h-screen">
        
        <Link href="/events" className="inline-block mb-12 text-yellow-100 hover:text-white uppercase tracking-widest font-bold text-sm transition-colors">
          ← Back to All Events
        </Link>
        
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            <span className="inline-block px-4 py-2 border border-white/20 bg-white/5 text-yellow-100 text-sm font-bold tracking-widest uppercase mb-6">
              {event.date}
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
              {event.title}
            </h1>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full h-[50vh] md:h-[60vh] relative mb-16 rounded-sm overflow-hidden border border-white/10 glass-card"
          >
            {event.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={event.photoUrl} alt={event.title} className="w-full h-full object-cover" />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20 font-bold uppercase tracking-widest text-xl bg-dark-900">
                  No Image Available
                </div>
            )}
          </motion.div>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="prose prose-invert prose-lg max-w-none text-white/80 leading-relaxed"
          >
             {/* Render description with basic line breaks */}
             {event.description.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-6 font-light">{paragraph}</p>
             ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
