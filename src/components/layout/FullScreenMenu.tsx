"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import assets from "@/assets";

const links = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Reservation", href: "/reservation" },
  { label: "Contact", href: "/contact" },
];

export default function FullScreenMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen((p) => !p)}
        aria-label="Menu"
        className="fixed right-6 top-6 z-[60] flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-full bg-[#f2c14e]"
      >
        <motion.span
          className="block h-0.5 w-6 bg-[#3a0d12]"
          animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }}
        />
        <motion.span
          className="block h-0.5 w-6 bg-[#3a0d12]"
          animate={{ rotate: open ? -45 : 0, y: open ? -4 : 0 }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex bg-[#1a0508]"
            initial={{ clipPath: "circle(0% at 95% 6%)" }}
            animate={{ clipPath: "circle(150% at 95% 6%)" }}
            exit={{ clipPath: "circle(0% at 95% 6%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* LEFT */}
            <div className="hidden w-1/2 items-center justify-center bg-[#7a2230] md:flex">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="relative h-72 w-72"
              >
                <Image
                  src={assets.images.logo}
                  alt="Broffles"
                  fill
                  className="rounded-full object-cover"
                />
              </motion.div>
            </div>

            {/* RIGHT */}
            <nav className="flex w-full flex-col items-center justify-center gap-4 md:w-1/2">
              {links.map((l, k) => (
                <div key={l.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{
                      delay: 0.35 + k * 0.08,
                      duration: 0.5,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-3 text-5xl font-black uppercase text-white transition hover:translate-x-3 hover:text-[#f2c14e] md:text-6xl"
                    >
                      <span className="text-sm text-[#e0a15f]">0{k + 1}</span>
                      {l.label}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
