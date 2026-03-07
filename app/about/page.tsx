"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PageTransition from "../components/PageTransition";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const loreItems = [
    { label: "01", title: "Cosmic Inspiration", description: "Part of the legendary Ursa Major constellation naming tradition.", className: "yellow-100-glow border-yellow-100/20", marginTop: "" },
    { label: "02", title: "Since 1956", description: "Decades of producing top-tier engineers and leaders.", className: "border-white/5", marginTop: "mt-8" },
    { label: "03", title: "254 Strong", description: "A tight-knit community of brilliant minds from across the state.", className: "border-white/5", marginTop: "" },
    { label: "04", title: "VSSUT Proud", description: "Integral part of Odisha's premier technical institution.", className: "yellow-100-glow border-yellow-100/20", marginTop: "mt-8" }
  ];

  return (
    <PageTransition>
      <div ref={containerRef} className="pb-32">
        {/* ===== MASSIVE HEADER ===== */}
        <section className="relative min-h-[60vh] md:min-h-[80vh] flex flex-col items-center justify-center pt-32 px-4 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-100/10 rounded-full blur-[100px] -z-10" />
          
          <motion.div style={{ y: headerY, opacity: headerOpacity }} className="text-center z-10 w-full max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="inline-block mb-6 px-6 py-2 rounded-full border border-yellow-100/30 bg-yellow-100/10 backdrop-blur-md text-yellow-100 text-sm font-semibold tracking-widest uppercase"
            >
              Our History
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl lg:text-[9vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 mb-8 leading-none drop-shadow-2xl"
            >
              A Legacy of <br />
              <span className="text-yellow-100 italic font-serif pointer-events-none">Excellence</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-lg md:text-2xl text-white/50 max-w-3xl mx-auto font-light leading-relaxed"
            >
              Since 1956, Kratu Hall has been the crucible where raw talent is forged into visionary engineering leadership.
            </motion.p>
          </motion.div>
        </section>

        {/* ===== SAGE KRATU LORE ===== */}
        <section className="max-w-6xl mx-auto px-4 mt-12 mb-32">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {loreItems.map((item, index) => (
              <div key={index} className={`glass p-6 rounded-2xl text-center ${item.className} ${item.marginTop}`}>
                <div className="text-4xl mb-4 font-black text-white/10 select-none">{item.label}</div>
                <h3 className="text-white font-heading font-bold mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm">{item.description}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ===== TIMELINE ===== */}
        <section className="max-w-4xl mx-auto px-4 relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-yellow-100/30 to-transparent" />
          
          {[
            {
              year: "1956",
              title: "The Genesis",
              desc: "Founded alongside the University College of Engineering (UCE). A cornerstone of technical education in Odisha."
            },
            {
              year: "2009",
              title: "A New Era",
              desc: "UCE transforms into VSSUT. Kratu Hall embraces modernization while preserving its deeply rooted traditions."
            },
            {
              year: "2025",
              title: "SEARCH Cluster",
              desc: "Integration into the state-of-the-art SEARCH architectural cluster, maintaining our distinct identity and unparalleled facilities."
            }
          ].map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative flex items-center mb-24 md:mb-32 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-yellow-100 shadow-[0_0_20px_rgba(252,246,186,0.6)] z-20 border-2 border-dark-950" />
              
              {/* Empty Space for Grid Alignment */}
              <div className="hidden md:block w-[45%]" />
              
              {/* Content Box */}
              <div className={`ml-20 md:ml-0 md:w-[45%] flex flex-col ${index % 2 === 0 ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
                <div className={`text-yellow-100 font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter mb-0 opacity-20 select-none leading-none ${index % 2 === 0 ? 'md:-ml-4' : 'md:-mr-4'}`}>
                  {item.year}
                </div>
                <div className={`relative z-10 -mt-6 ${index % 2 === 0 ? 'md:ml-4' : 'md:mr-4'}`}>
                  <h3 className="text-3xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-white/50 text-lg leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </section>
      </div>
    </PageTransition>
  );
}
