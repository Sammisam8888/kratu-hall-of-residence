"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import PageTransition from "../components/PageTransition";

const profiles = [
  {
    role: "Vice Chancellor",
    name: "Prof. (Dr.) Dipak Kumar Sahoo",
    image: "/faculty-images/prof-dipak-kumar-sahoo-vice-chancellor.jpg",
    email: "vc@vssut.ac.in",
    phone: "0663-2430211",
  },
  {
    role: "Dean, Students' Welfare",
    name: "Prof. Rakesh Roshan Dash",
    image: "/faculty-images/prof-rakesh-roshan-dash-dsw.jpg",
    email: "rrdash_ce@vssut.ac.in",
    phone: "8280122184",
  },
  {
    role: "Warden, Kratu Hall",
    name: "Dr. Sanjib Kumar Nayak",
    image: "/faculty-images/dr-sanjib-kumar-nayak-warden.jpg",
    email: "sknayak_ca@vssut.ac.in",
    phone: "8249715656",
  },
  {
    role: "Assistant Warden",
    name: "LT BIRENDRA KUMAR BARIK",
    image: "/faculty-images/lt-birenbarik-assistant-warden.jpg",
    email: "birenbarik_pe@vssut.ac.in",
    phone: "8297969444",
  },
  {
    role: "Financial Manager",
    name: "Mr. Aswini Kumar Mohapatra",
    image: "/faculty-images/mr-aswini-kumar-mohapatra-financial-manager.jpg",
    email: "aswinimohapatra1980@gmail.com",
    phone: "8908944014",
  },
];

export default function AdministrationPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, 150]);

  return (
    <PageTransition>
      <div ref={containerRef} className="pb-32">
        {/* ===== MASSIVE HEADER ===== */}
        <section className="relative min-h-[60vh] md:min-h-[80vh] flex flex-col items-center justify-center page-top container-page overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-yellow-100/5 [100%] blur-[100px] -z-10" />

          <motion.div className="text-center z-10 w-full max-w-5xl flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="inline-block mb-6 px-6 py-2  border border-yellow-100/30 bg-yellow-100/10 backdrop-blur-md text-yellow-100 text-sm font-semibold tracking-widest uppercase"
            >
              Leadership
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-[8vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-yellow-100 mb-8 leading-none drop-shadow-2xl"
            >
              The Visionaries
            </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-2xl text-center text-white/50 max-w-2xl font-light leading-relaxed"
          > Meet the dedicated faculty and staff of Kratu Hall, ensuring the residence remains a beacon of excellence, discipline, and student welfare. </motion.p>
          </motion.div>
        </section>

        {/* ===== MASONRY BENTO PROFILES ===== */}
        <section className="container-page mt-12 mb-32 z-20 relative">
          <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-3 gap-8">
            {profiles.map((profile, i) => (
              <motion.div
                key={profile.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`glass-card group overflow-hidden flex flex-col ${i === 0 ? "md:col-span-2 lg:col-span-3 md:flex-row" : "h-full"
                  }`}
              >
                {/* Image Section */}
                <div className={`relative bg-dark-900 overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-white/5 ${i === 0 ? "w-full md:w-1/3 aspect-[4/3] md:aspect-[3/4] lg:aspect-auto lg:h-[450px]" : "w-full aspect-[3/4]"
                  }`}>
                  {(profile as any).placeholder ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
                      <span className="text-4xl mb-4">👤</span>
                      <span className="font-bold tracking-widest uppercase text-xs">No Image</span>
                    </div>
                  ) : (
                    <Image
                      src={profile.image}
                      alt={profile.name}
                      fill
                      className="object-contain object-bottom md:object-cover md:object-top transition-transform duration-1000 group-hover:scale-105"
                    />
                  )}
                  {/* Subtle Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-950/20 to-transparent pointer-events-none ${i === 0 ? "md:bg-gradient-to-r" : ""}`} />
                </div>

                {/* Content Section */}
                <div className={`relative flex flex-col p-8 lg:p-10 flex-1 justify-center`}>
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                    <span className="text-8xl font-serif">"</span>
                  </div>
                  <h4 className="text-yellow-100 font-bold tracking-widest uppercase text-xs mb-3">
                    {profile.role}
                  </h4>
                  <h3 className={`text-white font-black leading-tight mb-6 ${i === 0 ? "text-4xl md:text-5xl lg:text-6xl" : "text-3xl"}`}>
                    {profile.name}
                  </h3>

                  <div className="space-y-4 mt-auto text-2xl">
                    {profile.email && (
                      <div className="flex items-center gap-4 text-white/50 text-sm bg-white/5 px-4 py-3  border border-white/5">
                        <span className="text-yellow-100 font-bold uppercase tracking-widest text-xl">Email</span>
                        <span className="font-mono text-xl font-semibold break-all">{profile.email}</span>
                      </div>
                    )}
                    {profile.phone && (
                      <div className="flex items-center gap-4 text-white/50 text-xl font-semibold bg-white/5 px-4 py-3  border border-white/5">
                        <span className="text-yellow-100 font-bold uppercase tracking-widest text-xl">Tel</span>
                        <span className="font-mono text-xl font-semibold break-all">{profile.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        <br />
        <br />
        <br />
        <br />
      </div>
    </PageTransition>
  );
}
