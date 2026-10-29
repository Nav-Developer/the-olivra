"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = { children: ReactNode; delay?: number; y?: number };

export default function FadeIn({ children, delay = 0, y = 30 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
