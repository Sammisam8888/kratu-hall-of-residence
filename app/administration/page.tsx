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
    name: "Mr. Dharamvir Kumar",
    image: "/faculty-images/mr-dharamvir-kumar-assistant-warden.jpg",
    email: "dharma.kumar009@gmail.com",
    phone: "9891894153",
  },
  {
    role: "Financial Manager",
    name: "Mr. Aswini Kumar Mohapatra",
    image: "/faculty-images/mr-aswini-kumar-mohapatra-financial-manager.jpg",
    placeholder: true,
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
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <PageTransition>
      <div ref={containerRef} className="pb-32">
        {/* ===== MASSIVE HEADER ===== */}
        <section className="relative min-h-[60vh] md:min-h-[80vh] flex flex-col items-center justify-center pt-32 px-4 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gold-400/5 rounded-[100%] blur-[100px] -z-10" />
          
          <motion.div style={{ y: headerY, opacity: headerOpacity }} className="text-center z-10 w-full max-w-5xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="inline-block mb-6 px-6 py-2 rounded-full border border-gold-400/30 bg-gold-400/10 backdrop-blur-md text-gold-400 text-sm font-semibold tracking-widest uppercase"
            >
              Leadership
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-[8vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gold-400 mb-8 leading-none drop-shadow-2xl"
            >
              The Visionaries
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-lg md:text-2xl text-white/50 max-w-3xl mx-auto font-light leading-relaxed"
            >
              Meet the dedicated faculty and staff ensuring Kratu Hall remains a beacon of excellence, discipline, and student welfare.
            </motion.p>
          </motion.div>
        </section>

        {/* ===== MASONRY BENTO PROFILES ===== */}
        <section className="max-w-7xl mx-auto px-4 mt-12 mb-32 z-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profiles.map((profile, i) => (
              <motion.div
                key={profile.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`glass-card group overflow-hidden ${
                  i === 0 ? "md:col-span-2 lg:col-span-3 flex flex-col md:flex-row min-h-[400px]" : "flex flex-col h-[500px]"
                }`}
              >
                {/* Image Section */}
                <div className={`relative ${i === 0 ? "w-full md:w-1/2 h-64 md:h-full" : "w-full h-3/5"}`}>
                  {profile.placeholder ? (
                    <div className="w-full h-full bg-dark-800 flex items-center justify-center font-bold tracking-widest text-white/20 uppercase text-xs">
                      No Image Available
                    </div>
                  ) : (
                    <Image
                      src={profile.image}
                      alt={profile.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  )}
                  {/* Gradient Overlay for Image */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${i === 0 ? "md:bg-gradient-to-r" : ""} from-dark-950 via-dark-950/20 to-transparent`} />
                </div>
                
                {/* Content Section */}
                <div className={`relative flex flex-col justify-end p-8 ${i === 0 ? "md:w-1/2 justify-center" : "h-2/5"}`}>
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="text-6xl font-serif">"</span>
                  </div>
                  <h4 className="text-gold-400 font-bold tracking-widest uppercase text-xs mb-2">
                    {profile.role}
                  </h4>
                  <h3 className={`text-white font-black leading-tight mb-4 ${i === 0 ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"}`}>
                    {profile.name}
                  </h3>
                  
                  <div className="space-y-3 mt-auto">
                    {profile.email && (
                      <div className="flex items-center gap-3 text-white/50 text-sm">
                        <span className="text-gold-400 font-bold uppercase tracking-widest text-[10px]">Email</span> {profile.email}
                      </div>
                    )}
                    {profile.phone && (
                      <div className="flex items-center gap-3 text-white/50 text-sm">
                        <span className="text-gold-400 font-bold uppercase tracking-widest text-[10px]">Tel</span> {profile.phone}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
