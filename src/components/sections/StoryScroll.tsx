"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import cone from "@/assets/Images/waffle.png";
import { chapters } from "@/data/story";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEP = 3;

export default function StoryScroll() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const total = chapters.length * STEP;
      const last = chapters.length - 1;

      gsap.set(".chapter", { autoAlpha: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `+=${chapters.length * 1400}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      chapters.forEach((_, i) => {
        const t = i * STEP;
        const sel = `.chapter-${i}`;

        tl.to(sel, { autoAlpha: 1, duration: 0.4 }, t)
          .fromTo(
            `${sel} .reveal`,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.12, duration: 0.8 },
            t,
          )
          .fromTo(
            `${sel} .photo`,
            { clipPath: "inset(0 100% 0 0)", scale: 1.15 },
            { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1.2 },
            t,
          )
          .fromTo(
            `${sel} .bignum`,
            { xPercent: -15, opacity: 0 },
            { xPercent: 0, opacity: 1, duration: 1 },
            t,
          );

        if (i < last) {
          tl.to(
            sel,
            { autoAlpha: 0, y: -40, duration: 0.5, ease: "power2.in" },
            t + STEP - 0.6,
          );
        }
      });

      // Animated counters in the final chapter
      root.current?.querySelectorAll<HTMLElement>(".stat").forEach((el) => {
        const o = { v: 0 };
        tl.to(
          o,
          {
            v: Number(el.dataset.value),
            duration: 1.4,
            ease: "power1.out",
            snap: { v: 1 },
            onUpdate: () => {
              el.textContent = String(o.v);
            },
          },
          last * STEP + 0.3,
        );
      });

      // Gold progress line + cone travelling along it
      tl.fromTo(
        ".track-fill",
        { scaleX: 0 },
        { scaleX: 1, ease: "none", duration: total },
        0,
      );
      tl.fromTo(
        ".cone",
        { left: "0%" },
        { left: "100%", ease: "none", duration: total },
        0,
      );
      tl.to(".cone", { rotate: 360, ease: "none", duration: total }, 0);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative h-screen overflow-hidden text-cream-200"
      style={{
        background:
          "radial-gradient(ellipse at 75% 40%, #7a1f26 0%, #4a1820 40%, #1f070b 100%)",
      }}
    >
      {/* subtle grain + vignette for a premium feel */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:3px_3px]" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.6)]" />

      {chapters.map((c, i) => (
        <div
          key={i}
          className={`chapter chapter-${i} absolute inset-0 grid items-center gap-10 px-8 pb-28 pt-36 md:grid-cols-2 md:px-20`}
        >
          {/* huge outlined chapter number */}
          <span
            className="bignum pointer-events-none absolute left-8 top-28 font-display text-[16rem] font-black leading-none text-transparent md:left-16"
            style={{ WebkitTextStroke: "1px rgba(233,196,106,0.18)" }}
          >
            0{i + 1}
          </span>

          <div className="relative z-10">
            <p className="reveal mb-4 inline-block rounded-full bg-gold-400 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.25em] text-wine-950">
              {c.tag}
            </p>
            <h2 className="reveal font-sans text-4xl font-black uppercase leading-[1.05] text-white md:text-6xl">
              {c.title}
            </h2>
            <div className="reveal my-6 h-px w-24 bg-gradient-to-r from-gold-400 to-transparent" />
            <p className="reveal max-w-md text-lg text-cream-200/75">
              {c.text}
            </p>

            {c.stats && (
              <div className="reveal mt-10 flex gap-10">
                {c.stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-5xl font-black text-gold-400 md:text-6xl">
                      <span className="stat" data-value={s.value}>
                        0
                      </span>
                      {s.suffix}
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-cream-200/70">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* {c.image && (
            <div className="relative z-10 mx-auto w-full max-w-md">
              <div className="photo relative aspect-[4/5] overflow-hidden rounded-2xl border border-gold-400/60 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(min-width:808px) 28rem, 90vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine-950/60 via-transparent to-transparent" />
              </div>
            </div>
          )} */}
          {c.image && (
            <div
              className={`relative z-10 mx-auto w-full ${
                c.aspect === "tall" ? "max-w-md" : "max-w-2xl"
              }`}
            >
              <div
                className={`photo relative overflow-hidden rounded-2xl border border-gold-400/60 shadow-[0_30px_80px_rgba(0,0,0,0.6)] ${
                  c.aspect === "tall" ? "aspect-[4/5]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes={
                    c.aspect === "tall"
                      ? "(min-width:768px) 28rem, 90vw"
                      : "(min-width:768px) 42rem, 90vw"
                  }
                  className={`object-cover ${
                    c.aspect === "tall" ? "object-center" : "object-top"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine-950/60 via-transparent to-transparent" />
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Progress track with travelling waffle cone */}
      <div className="absolute inset-x-8 bottom-10 md:inset-x-20">
        <div className="relative h-px bg-gold-400/25">
          <div className="track-fill h-full origin-left bg-gold-400" />
          <div className="cone absolute top-1/2 w-12 -translate-x-1/2 -translate-y-1/2 md:w-14">
            <Image
              src={cone}
              alt=""
              sizes="56px"
              className="h-auto w-full drop-shadow-[0_6px_10px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
