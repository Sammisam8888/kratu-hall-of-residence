"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import PageTransition from "../components/PageTransition";

const secretaries = [
  { role: "General Secretary", name: "Pratyush Kumar Nayak", branch: "Civil, 3rd Yr", phone: "7008974697", img: "/student-council-images/pratyush-kumar-nayak-general-secretary.png", bg: "from-amber-600/20" },
  { role: "Mess Secretary", name: "Ashutosh Gouda", branch: "Civil, 3rd Yr", phone: "8456949047", img: "/student-council-images/ashutosh-gouda-mess-secretary.jpg", bg: "from-orange-600/20" },
  { role: "Maintenance Secretary", name: "Samuel Priyatam", branch: "CSE, 3rd Yr", phone: "9337903728", img: "/student-council-images/samuel-priyatam-maintenance-secretary.jpg", bg: "from-blue-600/20" },  
  { role: "Sports Secretary", name: "Gobinda Behera", branch: "Mech, 3rd Yr", phone: "9178596118", img: "/student-council-images/gobinda-behera-sports-secretary.png", bg: "from-red-600/20" },
  { role: "Health & Hygiene Secretary", name: "Balaji Kumar Sahu", branch: "Mech, 3rd Yr", phone: "6370601509", img: "/student-council-images/balaji-kumar-sahu-health-secretary.png", bg: "from-emerald-600/20" },
  { role: "Cultural Secretary", name: "Srinibas Das", branch: "CSE, 3rd Yr", phone: "7846997262", img: "/student-council-images/srinibas-das-cultural-secretary.jpg", bg: "from-purple-600/20" },
];

const councilors = [
  { role: "Councilor", wing: "Ground floor West Wing", name: "Abhijit Rath", branch: "CSE, 3rd Yr", phone: "8249870125", img: "/student-council-images/abhijit-rath-councilor.jpg" },
  { role: "Councilor", wing: "Ground floor West Wing", name: "Debiprasad Sahoo", branch: "Mech, 3rd Yr", phone: "8249870125", img: "/student-council-images/debiprasad-sahoo-councilor.png" },
  { role: "Councilor", wing: "First floor East Wing", name: "Sangram Keshari Choudhury", branch: "Mech, 3rd Yr", phone: "7894236353", img: "/student-council-images/sangram-keshari-choudhury-councilor.jpg" },
  { role: "Councilor", wing: "First Floor East Wing", name: "Shreyas Dash", branch: "Civil, 3rd Yr", phone: "9439617267", img: "/student-council-images/shreyas-dash-councilor.png" },
  { role: "Councilor", wing: "Second Floor West Wing", name: "Mrutyunjay Sahoo", branch: "Mech, 3rd Yr", phone: "7815049386", img: "/student-council-images/mrutyunjay-sahoo-councilor.jpg" },
  { role: "Councilor", wing: "Second Floor East Wing", name: "Suvam Dora", branch: "Civil, 3rd Yr", phone: "9348123610", img: "/student-council-images/suvam-dora-councilor.jpg" },
];

export default function StudentCouncilPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <PageTransition>
      <div ref={containerRef} className="pb-32 overflow-hidden">
        {/* ===== HEADER ===== */}
        <section className="relative min-h-[60vh] flex flex-col items-center justify-center page-top container-page text-center">
          <motion.div className="z-10 w-full max-w-5xl flex flex-col items-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl lg:text-[10vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30 uppercase mb-4 whitespace-nowrap leading-none"
            >
              The Council
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-8 py-3  border border-yellow-100/30 bg-yellow-100/10 text-yellow-100 font-bold tracking-widest uppercase text-xl"
            >
              Session 2025-26
            </motion.div>
          </motion.div>
        </section>

        {/* ===== SECRETARIES ===== */}
        <section className="container-page mt-12 mb-32 z-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {secretaries.map((sec, i) => (
              <motion.div
                key={sec.role}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`glass-card p-6 relative group overflow-hidden ${i === 0 ? "md:col-span-2 lg:col-span-2 flex flex-col md:flex-row items-center justify-between" : "flex flex-col"}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${sec.bg} to-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                
                <div className={`relative ${i === 0 ? "w-full md:w-1/3 h-64 md:h-80" : "w-full aspect-square"} 2xl overflow-hidden mb-6 ${i===0 && "md:mb-0"} object-cover border border-white/10`}>
                  {(sec as any).ph ? (
                    <div className="w-full h-full bg-dark-800 flex items-center justify-center font-bold tracking-widest text-[10px] text-white/30 uppercase text-center p-4">No Image</div>
                  ) : (
                    <Image src={sec.img} alt={sec.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  )}
                </div>

                <div className={`relative z-10 ${i === 0 ? "md:w-1/2 md:pl-12" : "text-center"}`}>
                  <h4 className="text-yellow-100 font-bold uppercase tracking-widest text-md mb-2">{sec.role}</h4>
                  <h3 className={`text-white font-black mb-2 ${i === 0 ? "text-5xl" : "text-3xl"}`}>{sec.name}</h3>
                  <p className="text-white/40 text-3xl mb-4 font-mono">{sec.branch}</p>
                  <p className="inline-block px-4 py-2  border border-white/10 bg-white/5 text-white/70"><span className="text-yellow-100 font-bold text-xl uppercase tracking-widest mr-2">Tel</span>{sec.phone}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        <br />
        <br />
        <br />
        <br />

        {/* ===== COUNCILORS ===== */}
        <section className="container-page">
          <SectionHeading title="Floor Councilors" subtitle="The bridge between management and boarders" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {councilors.map((c, i) => (
              <motion.div
                key={c.wing}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-8 flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24  overflow-hidden border-2 border-yellow-100/30 mb-6 relative">
                  {(c as any).ph ? (
                    <div className="w-full h-full bg-dark-800 flex items-center justify-center font-bold tracking-widest text-[8px] text-white/30 uppercase text-center p-2 leading-tight">No Image</div>
                  ) : (
                    <Image src={c.img!} alt={c.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  )}
                </div>
                <div className="w-full text-yellow-100 font-bold uppercase text-[10px] tracking-widest mb-2 border-b border-white/10 pb-2">{c.wing}</div>
                <h3 className="text-2xl font-black text-white mb-2 mt-2">{c.name}</h3>
                <p className="text-white/40 text-xs font-mono mb-4">{c.branch}</p>
                <p className="text-white/60 text-sm bg-dark-900 px-4 py-1  border border-white/5"><span className="text-yellow-100 font-bold text-[9px] uppercase tracking-widest mr-2">Tel</span>{c.phone}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
      <br />
      <br />
      <br />
      <br />
    </PageTransition>
  );
}

const SectionHeading = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="text-center mb-10">
    <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">{title}</h2>
    <p className="text-yellow-100 italic text-lg md:text-xl font-serif">{subtitle}</p>
  </div>
);
