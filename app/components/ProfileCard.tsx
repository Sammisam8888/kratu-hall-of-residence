"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  name: string;
  designation: string;
  image: string;
  qualifications?: string;
  specialization?: string;
  phone?: string;
  email?: string;
  profileUrl?: string;
  delay?: number;
}

export default function ProfileCard({
  name,
  designation,
  image,
  qualifications,
  specialization,
  phone,
  email,
  profileUrl,
  delay = 0,
}: Props) {
  const isPlaceholder = image.endsWith(".svg");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-card overflow-hidden group"
    >
      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden bg-dark-700">
        {isPlaceholder ? (
          <div className="w-full h-full placeholder-img">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        ) : (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60" />
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-heading font-bold text-lg text-white mb-1 group-hover:text-yellow-100 transition-colors">
          {name}
        </h3>
        <p className="text-yellow-100/80 text-sm font-medium mb-3">
          {designation}
        </p>

        {qualifications && (
          <p className="text-white/40 text-xs mb-1">
            <span className="text-white/60">Qualifications:</span>{" "}
            {qualifications}
          </p>
        )}
        {specialization && (
          <p className="text-white/40 text-xs mb-3">
            <span className="text-white/60">Specialization:</span>{" "}
            {specialization}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mt-3">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5  bg-yellow-100/10 text-yellow-100/80 hover:bg-yellow-100/20 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {phone}
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5  bg-yellow-100/10 text-yellow-100/80 hover:bg-yellow-100/20 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Email
            </a>
          )}
          {profileUrl && (
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5  bg-yellow-100/10 text-yellow-100/80 hover:bg-yellow-100/20 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15,3 21,3 21,9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Profile
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
