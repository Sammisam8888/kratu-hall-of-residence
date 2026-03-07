"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import PageTransition from "./components/PageTransition";

const ThreeBackground = dynamic(() => import("./components/ThreeBackground"), {
  ssr: false,
});

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const statsY = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);
  const statsOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  return (
    <PageTransition>
      <ThreeBackground />

      <div ref={containerRef} className="relative w-full">
        {/* ===== MASSIVE HERO ===== */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-8">
          <div className="absolute inset-0 z-0">
            <Image
              src="/hostel-images/kratu-hall-front-gate.png"
              alt="Kratu Hall Hero"
              fill
              className="object-cover opacity-30 mix-blend-screen scale-105 animate-[pulse_10s_ease-in-out_infinite]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 xl:via-dark-950/60 to-dark-950/20" />
            <div className="absolute inset-0 bg-gradient-to-b from-dark-950 to-transparent opacity-80" />
          </div>

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="flex flex-col items-center justify-center text-center max-w-[90vw] z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-yellow-100/30 bg-yellow-100/5 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-yellow-100 animate-pulse" />
                <span className="text-yellow-100 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase">
                  VSSUT Burla • Est. 1956
                </span>
                <span className="w-2 h-2 rounded-full bg-yellow-100 animate-pulse" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] md:text-[8vw] lg:text-[7vw] font-black leading-[0.85] tracking-tighter mb-6 relative"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-yellow-100 to-yellow-100 drop-shadow-[0_0_80px_rgba(245,197,24,0.4)]">
                KRATU
              </span>
              <br />
              <span className="text-[4vw] md:text-[3vw] lg:text-[2vw] text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-white to-yellow-100 font-bold tracking-[0.2em] uppercase">
                Hall of Residence
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/60 text-base md:text-xl max-w-2xl font-light mb-12 leading-relaxed"
            >
              Where ancient wisdom meets cutting-edge engineering. Home to 254
              visionaries shaping the future at India&apos;s premier technical institution.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <Link
                href="/about"
                className="inline-flex items-center justify-center bg-yellow-100 text-dark-950 font-bold px-10 py-4 rounded-full text-lg hover:scale-105 hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(252,246,186,0.3)]"
              >
                Enter The Legacy
              </Link>
              <Link
                href="/administration"
                className="inline-flex items-center justify-center border border-yellow-100/50 bg-dark-900/50 backdrop-blur-md text-yellow-100 font-bold px-10 py-4 rounded-full text-lg hover:border-yellow-100 hover:bg-yellow-100/10 transition-all duration-300"
              >
                Meet The Team
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
          >
            <span className="text-xs tracking-widest text-yellow-100 uppercase">Scroll</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-yellow-100 to-transparent" />
          </motion.div>
        </section>

        {/* ===== FLOATING STATS ===== */}
        <section className="relative py-24 px-4 md:px-8 z-20">
          <motion.div
            style={{ y: statsY, opacity: statsOpacity }}
            className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 md:gap-12"
          >
            {[
              { label: "Established", value: "1956" },
              { label: "Boarders", value: "254" },
              { label: "Legacy Years", value: "65+" },
              { label: "Saptarishi Campus", value: "350 Acre" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative bg-dark-900/40 backdrop-blur-2xl border border-yellow-100/10 rounded-3xl p-8 min-w-[200px] md:min-w-[250px] flex flex-col items-center justify-center shadow-2xl overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-100/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-yellow-100 mb-2 drop-shadow-lg">
                  {stat.value}
                </h3>
                <p className="text-white/40 text-sm md:text-base font-medium tracking-[0.2em] uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ===== BENTO GRID SHOWCASE ===== */}
        <section className="relative py-32 px-4 md:px-8 z-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
                Experience <span className="text-yellow-100 italic font-serif">Kratu</span>
              </h2>
              <p className="text-xl text-white/50 max-w-2xl mx-auto">
                A seamless blend of rigorous academic culture and vibrant student life, set within a state-of-the-art residential complex.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-[350px] lg:auto-rows-[400px]">
              {/* Large Feature Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-2 relative rounded-3xl overflow-hidden group bg-dark-800 border border-white/5"
              >
                <Image
                  src="/hostel-images/kratu-hall-front-gate.png"
                  alt="Kratu Hall Night"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 mix-blend-screen"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-900/50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10 flex flex-col justify-end">
                  <div className="w-12 h-12 rounded-full border border-yellow-100/30 flex items-center justify-center text-yellow-100 mb-6 backdrop-blur-md">
                    ✦
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">Illuminated Legacy</h3>
                  <p className="text-white/60 text-lg max-w-lg leading-relaxed">
                    Witness the grandeur of Kratu Hall at night. A beacon of knowledge and discipline standing tall in the VSSUT campus.
                  </p>
                </div>
              </motion.div>

              {/* Small Vertical Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative rounded-3xl overflow-hidden group bg-gradient-to-b from-dark-800 to-dark-900 border border-white/5 p-8 flex flex-col"
              >
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl opacity-50 transition-opacity duration-1000 group-hover:opacity-100" />
                <div className="flex-1">
                  <div className="text-4xl font-black font-serif text-white/10 mb-6 select-none">01</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Digital Backbone</h3>
                  <p className="text-white/50 leading-relaxed">
                    Equipped with a 1 GBPS high-speed internet backbone, every room is a hub for research, coding, and continuous learning.
                  </p>
                </div>
                <div className="w-full h-[1px] bg-gradient-to-r from-emerald-600/30 to-emerald-600/0 mt-8" />
              </motion.div>

              {/* Small Horizontal Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="relative rounded-3xl overflow-hidden group bg-dark-900 border border-white/5 p-8"
              >
                <div className="absolute left-0 bottom-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl opacity-50 transition-opacity duration-1000 group-hover:opacity-100" />
                <div className="text-4xl font-black font-serif text-white/10 mb-6 select-none">02</div>
                <h3 className="text-2xl font-bold text-white mb-3">Technical Excellence</h3>
                <p className="text-white/50 leading-relaxed">
                  Home to brilliant minds driving VSSUT&apos;s SAE teams, robotics club, and the renowned Student Space Program.
                </p>
              </motion.div>

              {/* Small Horizontal Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative rounded-3xl overflow-hidden group bg-dark-900 border border-white/5 p-8"
              >
                <div className="absolute left-0 bottom-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl opacity-50 transition-opacity duration-1000 group-hover:opacity-100" />
                <div className="text-4xl font-black font-serif text-white/10 mb-6 select-none">03</div>
                <h3 className="text-2xl font-bold text-white mb-3">Unbreakable Brotherhood</h3>
                <p className="text-white/50 leading-relaxed">
                  A lifelong bond forged through night canteens, grand feasts, and the legendary Saptarishi cultural traditions.
                </p>
              </motion.div>

              {/* Image Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative rounded-3xl overflow-hidden group bg-dark-800 border border-white/5"
              >
                <Image
                  src="/hostel-images/kratu-hall-daylight-view.png"
                  alt="Kratu Hall Day"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6">
                  <span className="px-4 py-2 rounded-full bg-dark-900/80 backdrop-blur-md text-white/80 text-sm font-medium border border-white/10">
                    Daylight View
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== MASSIVE WARDEN QUOTE ===== */}
        <section className="relative py-32 px-4 md:px-8 overflow-hidden">
          <div className="absolute inset-0 top-1/2 -translate-y-1/2 w-full h-[500px] bg-yellow-100/5 blur-[100px] -z-10" />
          
          <div className="max-w-6xl mx-auto relative rounded-[3rem] p-10 md:p-20 overflow-hidden bg-gradient-to-br from-dark-800/80 to-dark-950/80 backdrop-blur-2xl border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-yellow-100/10 to-transparent rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24"
            >
              <div className="w-48 h-48 md:w-80 md:h-80 shrink-0 relative rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(245,197,24,0.2)] group">
                <Image
                  src="/faculty-images/dr-sanjib-kumar-nayak-warden.jpg"
                  alt="Warden"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] pointer-events-none" />
              </div>

              <div className="flex-1 text-center lg:text-left relative">
                <span className="absolute -top-10 -left-6 text-[100px] md:-top-16 md:-left-10 md:text-[150px] font-serif text-white/5 leading-none select-none pointer-events-none">
                  &ldquo;
                </span>
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-light text-white leading-tight md:leading-snug mb-10 italic relative z-10">
                  <span className="text-yellow-100 font-medium">Kratu Hall</span> is more than just walls and rooms — it is a family. We nurture not just engineers, but leaders who carry the spirit of Sage Kratu.
                </h3>
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-8">
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-1">Dr. Sanjib Kumar Nayak</h4>
                    <p className="text-yellow-100 tracking-widest uppercase text-sm font-semibold">Warden</p>
                  </div>
                  <Link href="/administration" className="px-6 py-3 rounded-full border border-white/20 hover:border-yellow-100 hover:text-yellow-100 text-white/60 transition-all text-sm font-medium">
                    View Administration →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== FOOTER CTA ===== */}
        <section className="relative py-40 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center"
          >
            <h2 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-t from-white/20 via-white to-white mb-10 tracking-tight">
              Ready to Explore?
            </h2>
            <Link
              href="/facilities"
              className="inline-flex items-center justify-center bg-yellow-100 text-dark-950 font-bold px-12 py-5 rounded-full text-xl shadow-[0_0_40px_rgba(252,246,186,0.3)] hover:scale-105 hover:bg-white transition-all duration-300"
            >
              Discover Facilities
            </Link>
          </motion.div>
        </section>
      </div>
    </PageTransition>
  );
}
