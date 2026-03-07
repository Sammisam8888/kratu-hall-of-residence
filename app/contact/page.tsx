"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PageTransition from "../components/PageTransition";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <PageTransition>
      <div ref={containerRef} className="pb-32 overflow-hidden">
        {/* ===== MASSIVE HEADER ===== */}
        <section className="relative min-h-[50vh] flex flex-col items-center justify-center pt-32 px-4 text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-600/10 rounded-[100%] blur-[120px] -z-10 pointer-events-none" />

          <motion.div style={{ y }} className="z-10 w-full max-w-5xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-[10vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 uppercase leading-none drop-shadow-2xl"
            >
              Reach Out
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mt-6 text-xl md:text-3xl text-yellow-100 font-serif italic max-w-2xl mx-auto"
            >
              Connect with the Kratu Administration
            </motion.p>
          </motion.div>
        </section>

        {/* ===== CONTACT CARDS ===== */}
        <section className="max-w-7xl mx-auto px-4 mt-12 z-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card p-12 relative overflow-hidden group"
            >
              <div className="absolute -right-10 -bottom-10 text-[180px] opacity-[0.03] font-serif group-hover:scale-110 transition-transform duration-700 select-none text-yellow-100">@</div>
              <h2 className="text-3xl font-black text-white mb-2">General Inquiry</h2>
              <div className="w-12 h-1 bg-yellow-100 mb-8" />

              <div className="space-y-6">
                <div>
                  <h4 className="text-yellow-100 text-xs font-bold tracking-widest uppercase mb-1">Email Details</h4>
                  <p className="text-2xl text-white font-medium">kratuhr@vssut.ac.in</p>
                </div>
                <div>
                  <h4 className="text-yellow-100 text-xs font-bold tracking-widest uppercase mb-1">Contact Phone</h4>
                  <p className="text-2xl text-white font-medium">+91 98612 16180</p>
                </div>
                <div>
                  <h4 className="text-yellow-100 text-xs font-bold tracking-widest uppercase mb-1">EPABX Extensions</h4>
                  <p className="text-xl text-white/70 font-mono">VC: 2430211 | Security: 2112</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card p-12 relative overflow-hidden"
            >
              <h2 className="text-3xl font-black text-white mb-2">Location</h2>
              <div className="w-12 h-1 bg-yellow-100 mb-8" />
              <p className="text-2xl text-white font-light pr-12 leading-relaxed mb-8">
                Kratu Hall of Residence,<br />
                VSSUT Campus, Burla,<br />
                Sambalpur, Odisha<br />
                PIN — 768018
              </p>
              <div className="inline-block px-6 py-3 rounded-full border border-white/20 bg-white/5 text-white shadow-xl backdrop-blur-md hover:bg-white/10 transition-colors cursor-none">
                View on Maps ↗
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== MASSIVE MAP ===== */}
        <section className="max-w-7xl mx-auto px-4 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full h-[600px] glass-card overflow-hidden p-2 group"
          >
            <div className="w-full h-full rounded-2xl overflow-hidden relative transition-all duration-1000">
              <iframe
                src="https://maps.app.goo.gl/HVnrdTecFhzme1FVA"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-2xl mix-blend-overlay"></div>
            </div>
          </motion.div>
        </section>
      </div>
    </PageTransition>
  );
}
