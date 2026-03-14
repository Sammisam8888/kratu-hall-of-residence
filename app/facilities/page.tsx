"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PageTransition from "../components/PageTransition";

const amenities = [
  { icon: "01", title: "Premium Living", desc: "Spacious 4-seater and 3-seater rooms with ample ventilation and natural light.", gradient: "from-blue-600/20" },
  { icon: "02", title: "High-Speed LAN", desc: "1 GBPS dedicated internet backbone across all rooms.", gradient: "from-emerald-600/20" },
  { icon: "03", title: "Sports Complex", desc: "Dedicated badminton and volleyball courts inside the premises.", gradient: "from-red-600/20" },
  { icon: "04", title: "Common Room", desc: "Entertainment zone with large TV, indoor games, and lounge seating.", gradient: "from-purple-600/20" },
  { icon: "05", title: "Pure Water", desc: "Industrial-grade RO water purifiers and coolers on every wing.", gradient: "from-cyan-600/20" },
];

export default function FacilitiesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <PageTransition>
      <div ref={containerRef} className="pb-32 overflow-hidden">
        {/* ===== HERO ===== */}
        <section className="relative min-h-[60vh] flex flex-col items-center justify-center page-top container-page text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-100/5 [100%] blur-[120px] -z-10 pointer-events-none" />

          <motion.div className="z-10 w-full max-w-5xl flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-block mb-6 px-6 py-2  border border-yellow-100/30 bg-yellow-100/10 text-yellow-100 text-2xl font-semibold tracking-widest uppercase"
            >
              Beyond the Classroom
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl lg:text-[9vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-yellow-100/30 mb-8 leading-none"
            >
              Living in <span className="italic font-serif">Kratu</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-lg md:text-2xl text-white/50 max-w-3xl font-light leading-relaxed"
            >
              A holistic environment designed to foster academic excellence, physical fitness, and unbreakable bonds.
            </motion.p>
          </motion.div>
        </section>
        <br />
        <br />
        <br />
        <br />
        {/* ===== BENTO AMENITIES ===== */}
        <section className="container-page mt-8 z-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {amenities.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card p-10 relative overflow-hidden group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} to-transparent opacity-10 group-hover:opacity-30 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="text-6xl font-black font-serif text-white/20 mb-6 bg-dark-900/50 w-24 h-24 flex items-center justify-center 2xl border border-white/5 shadow-2xl">
                    {item.icon}
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4 tracking-tight">{item.title}</h3>
                  <p className="text-white/50 text-lg leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        <br />
        <br />
        <br />
        <br />
        {/* ===== THE MESS ===== */}
        <section className="container-page mt-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="glass-card overflow-hidden flex flex-col lg:flex-row relative"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-600/10  blur-[100px] -z-10" />

            <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center border-r border-white/5">
              <div className="inline-block px-4 py-1.5  border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs tracking-widest uppercase mb-6 self-start font-bold">
                Student-Run Cooperative
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6">The Grand<br /><span className="text-orange-400 italic font-serif">Mess</span></h2>
              <p className="text-xl text-white/60 mb-8 leading-relaxed font-light">
                Kratu Hall features one of the largest and most well-managed dining facilities in the university, operated entirely by student representatives to ensure quality, hygiene, and taste.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-white/70">
                  <div className="w-10 h-10  bg-yellow-100/10 flex items-center justify-center border border-yellow-100/20 font-serif text-yellow-100 italic">I</div>
                  <span className="text-lg">4 Nutritious Meals Daily</span>
                </div>
                <div className="flex items-center gap-4 text-white/70">
                  <div className="w-10 h-10  bg-yellow-100/10 flex items-center justify-center border border-yellow-100/20 font-serif text-yellow-100 italic">II</div>
                  <span className="text-lg">Legendary Night Canteen</span>
                </div>
                <div className="flex items-center gap-4 text-white/70">
                  <div className="w-10 h-10  bg-yellow-100/10 flex items-center justify-center border border-yellow-100/20 font-serif text-yellow-100 italic">III</div>
                  <span className="text-lg">Monthly Grand Feasts</span>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 bg-dark-900/50 p-10 md:p-16 relative min-h-[400px] flex items-center justify-center overflow-hidden">
              <div className="text-[200px] opacity-5 absolute font-serif text-yellow-100 pointer-events-none select-none -right-10 -bottom-10">K</div>
              <div className="relative z-10 w-full">
                <h3 className="text-yellow-100 uppercase tracking-widest font-bold text-sm mb-6 border-b border-white/10 pb-4">Hall Capacity Stats</h3>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-5xl font-black text-white mb-2">254</div>
                    <div className="text-white/40 text-sm tracking-wider uppercase">Total Boarders</div>
                  </div>
                  <div>
                    <div className="text-5xl font-black text-white mb-2">78</div>
                    <div className="text-white/40 text-sm tracking-wider uppercase">Living Rooms</div>
                  </div>
                  <div>
                    <div className="text-5xl font-black text-white mb-2">2</div>
                    <div className="text-white/40 text-sm tracking-wider uppercase">Residential Wings</div>
                  </div>
                  <div>
                    <div className="text-5xl font-black text-white mb-2">3</div>
                    <div className="text-white/40 text-sm tracking-wider uppercase">Building Floors</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
      <br />
      <br />
      <br />
      <br />
    </PageTransition>
  );
}
