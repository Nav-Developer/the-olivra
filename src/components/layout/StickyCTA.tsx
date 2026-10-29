"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import StorefrontIcon from "@mui/icons-material/Storefront";

const PHONE = "+919XXXXXXXXX"; // TODO: client's number
const WA = "919XXXXXXXXX"; // TODO: no + sign for wa.me

const actions = [
  {
    label: "Call Franchise Desk",
    href: `tel:${PHONE}`,
    icon: PhoneIcon,
    cls: "bg-wine-950 text-cream-200 border border-gold-400/50",
  },
  {
    label: "Become a Partner",
    href: "/contact#franchise",
    icon: StorefrontIcon,
    cls: "bg-gold-400 text-wine-950",
  },
  {
    label: "WhatsApp Us",
    href: `https://wa.me/${WA}?text=Hi%20Broffles%2C%20I%27m%20interested%20in%20a%20franchise`,
    icon: WhatsAppIcon,
    cls: "bg-[#3fa35c] text-white",
  },
];

export default function StickyCTA() {
  const [fabOpen, setFabOpen] = useState(false);
  const [barVisible, setBarVisible] = useState(false);
  const [barDismissed, setBarDismissed] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  // show the bar after the visitor scrolls a bit
  useEffect(() => {
    try {
      if (sessionStorage.getItem("bar-dismissed")) setBarDismissed(true);
    } catch {}
    const onScroll = () => setBarVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showBar = barVisible && !barDismissed;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <div
        className={`fixed right-4 z-[60] flex flex-col items-end gap-3 transition-all md:right-6 ${
          showBar ? "bottom-4 md:bottom-28" : "bottom-4 md:bottom-6"
        }`}
      >
        <AnimatePresence>
          {fabOpen &&
            actions.map((a, i) => (
              <motion.a
                key={a.label}
                href={a.href}
                target={a.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ delay: (actions.length - 1 - i) * 0.05 }}
                className={`flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-extrabold shadow-xl ${a.cls}`}
              >
                <a.icon fontSize="small" />
                {a.label}
              </motion.a>
            ))}
        </AnimatePresence>

        <button
          aria-label={fabOpen ? "Close quick actions" : "Open quick actions"}
          onClick={() => setFabOpen((v) => !v)}
          className="grid h-14 w-14 place-items-center rounded-full border border-gold-400/60 bg-wine-950 text-gold-400 shadow-2xl transition hover:scale-105"
        >
          {fabOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* ---------- Sticky enquiry bar (desktop) ---------- */}
      <AnimatePresence>
        {showBar && (
          <motion.div
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            exit={{ y: 120 }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed inset-x-0 bottom-0 z-50 hidden border-t border-gold-400/40 bg-wine-950/95 backdrop-blur md:block"
          >
            <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
              <div className="shrink-0">
                <p className="font-display text-xl font-bold text-gold-400">
                  Own a Broffles franchise
                </p>
                <p className="text-xs text-cream-200/70">
                  Low investment · Proven model · 30+ outlets
                </p>
              </div>

              {status === "done" ? (
                <p className="flex-1 text-center font-bold text-gold-400">
                  Thank you! Our team will call you shortly.
                </p>
              ) : (
                <form
                  onSubmit={submit}
                  className="flex flex-1 items-center gap-3"
                >
                  <input
                    name="name"
                    required
                    placeholder="Your Name"
                    className="field"
                  />
                  <input
                    name="phone"
                    required
                    type="tel"
                    pattern="[0-9+\s]{10,14}"
                    placeholder="Phone Number"
                    className="field"
                  />
                  <input
                    name="city"
                    required
                    placeholder="Your City"
                    className="field"
                  />
                  <button
                    disabled={status === "sending"}
                    className="shrink-0 rounded-full bg-gold-400 px-8 py-3.5 text-sm font-extrabold text-wine-950 transition hover:brightness-110 disabled:opacity-60"
                  >
                    {status === "sending"
                      ? "Sending…"
                      : "Get Franchise Details →"}
                  </button>
                </form>
              )}
              {status === "error" && (
                <span className="text-xs text-red-300">Try again</span>
              )}

              <button
                aria-label="Dismiss"
                onClick={() => {
                  setBarDismissed(true);
                  try {
                    sessionStorage.setItem("bar-dismissed", "1");
                  } catch {}
                }}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold-400/40 text-gold-400"
              >
                <CloseIcon fontSize="small" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
