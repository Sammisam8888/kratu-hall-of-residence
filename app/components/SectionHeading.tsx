"use client";
import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = true,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${centered ? "flex flex-col items-center text-center" : ""}`}
    >
      <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl gradient-text mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-white/50 text-lg md:text-xl max-w-2xl">
          {subtitle}
        </p>
      )}
      <div className="animated-line w-24 mt-6" />
    </motion.div>
  );
}
