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
        <section className="relative min-h-[60vh] md:min-h-[80vh] flex flex-col items-center justify-center page-top container-page overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-100/10  blur-[100px] -z-10" />

          <motion.div className="text-center z-10 w-full max-w-5xl flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="inline-block mb-6 px-6 py-2  border border-yellow-100/30 bg-yellow-100/10 backdrop-blur-md text-yellow-100 text-sm font-semibold tracking-widest uppercase"
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
              className="text-lg md:text-2xl text-white/50 max-w-3xl font-light leading-relaxed"
            >
              Since 1956, Kratu Hall has been the crucible where raw talent is forged into visionary engineering leadership.
            </motion.p>
          </motion.div>
        </section>
        <br />
        <br />

        {/* ===== SAGE KRATU LORE ===== */}
        <section className="container-page mt-12 mb-32">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {loreItems.map((item, index) => (
              <div key={index} className={`glass p-12 2xl text-center ${item.className} ${item.marginTop}`}>
                <div className="text-8xl mb-4 font-black text-white/10 select-none">{item.label}</div>
                <h3 className="text-white font-heading font-bold text-2xl mb-4">{item.title}</h3>
                <p className="text-white/40 text-xl">{item.description}</p>
              </div>
            ))}
          </motion.div>
        </section>
<br />
<br />
<br />
<br />
        {/* ===== TIMELINE ===== */}
        <section className="container-page section-spacing">
          <div className="flex overflow-x-auto gap-16 pb-8 snap-x">

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
            ].map((item) => (
              <div
                key={item.year}
                className="min-w-[280px] snap-start glass p-8 2xl"
              >
                <div className="text-yellow-100 text-5xl font-black mb-4">
                  {item.year}
                </div>

                <h3 className="text-white text-xl font-bold mb-2">
                  {item.title}
                </h3>

                <p className="text-white/50">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>
        </section>
      </div>
    </PageTransition>
  );
}
