"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import type { Product } from "@/data/products";

const SWIPE_THRESHOLD = 60;

/**
 * The hero itself IS the featured-products carousel. It's built as three
 * fully independent, stacked absolute layers — none of them share a flex
 * context with each other:
 *   1. the image (bottom layer, full-bleed, swipeable)
 *   2. a gradient scrim (for legibility)
 *   3. the text (logo/title up top, caption/dots at the bottom), which uses
 *      its own internal flex layout but never touches the image's layout.
 */
export function HeroSection({ featured }: { featured: Product[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [logoBroken, setLogoBroken] = useState(false);

  // The very first image falls in from above the screen on page load, like
  // it's dropping out of the sky. Every later transition (swipe, dot tap)
  // uses the normal left/right slide instead. A ref (not state) so it never
  // triggers a re-render, and a timeout so scrolling back to slide 1 later
  // doesn't replay the intro.
  const isInitialLoad = useRef(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      isInitialLoad.current = false;
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  if (featured.length === 0) return null;

  const goTo = (newIndex: number, dir: number) => {
    isInitialLoad.current = false;
    setDirection(dir);
    setIndex((newIndex + featured.length) % featured.length);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) goTo(index + 1, 1);
    else if (info.offset.x > SWIPE_THRESHOLD) goTo(index - 1, -1);
  };

  const active = featured[index];
  const showLandingAnimation = isInitialLoad.current && index === 0;

  return (
    <section className="relative h-screen overflow-hidden bg-background">
      {/* LAYER 1 — the image. Absolute, full-bleed, on its own. */}
      <motion.div
        className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={active.id}
            custom={direction}
            initial={
              showLandingAnimation
                ? { opacity: 0, y: "-100%" }
                : { opacity: 0, x: direction >= 0 ? "100%" : "-100%" }
            }
            animate={{ opacity: 1, x: "0%", y: "0%" }}
            exit={{ opacity: 0, x: direction >= 0 ? "-100%" : "100%" }}
            transition={
              showLandingAnimation
                ? { type: "spring", damping: 15, stiffness: 75, mass: 1 }
                : { duration: 0.4, ease: "easeInOut" }
            }
            className="absolute inset-0"
          >
            {/* soft blurred backdrop so the frame reads full-bleed without
                cropping the actual product photo */}
            <Image
              src={active.image}
              alt=""
              aria-hidden
              fill
              className="pointer-events-none scale-125 select-none object-cover opacity-30 blur-3xl"
              draggable={false}
            />
            {/* the real product photo — big, fully visible, never cropped */}
            <Image
              src={active.image}
              alt={active.name}
              fill
              priority
              className="pointer-events-none relative select-none object-contain p-2 drop-shadow-[0_35px_55px_rgba(0,0,0,0.55)] sm:p-6"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* LAYER 2 — legibility scrim, independent of both the image and the text */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-background/90 via-background/30 to-background" />

      {/* LAYER 3 — the text. Its own flex column, top-to-bottom, with zero
          relation to how the image layer is sized or positioned. */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between px-4 py-14 sm:px-6 sm:py-16">
        <div className="flex flex-col items-center text-center">
          <div className="h-64 overflow-hidden">
            {!logoBroken ? (
              <Image
                src="/chefnahid.png"
                alt="Logo Nahid Snack"
                width={80}
                height={80}
                className="h-full w-full object-cover"
                onError={() => setLogoBroken(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-lg font-bold uppercase tracking-widest text-primary">
                N
              </div>
            )}
          </div>

          <h1 className="mt-4 text-4xl font-extrabold uppercase tracking-tight text-foreground sm:text-5xl">
            CHEF NAHID
          </h1>
          <p className="mx-auto mt-3 max-w-xs text-sm text-black dark:text-white sm:max-w-sm">
            Sandwichs, pizzas, jus &amp; douceurs faits maison — préparés à la commande, à Marrakech.
          </p>
          <span className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            Nos coups de cœur
          </span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="text-center"
            >
              <h3 className="text-base font-semibold text-foreground">{active.name}</h3>
              <div className="mt-1 flex items-baseline justify-center gap-1">
                <span className="text-lg font-bold text-primary">{active.price}</span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {active.currency}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="pointer-events-auto flex gap-1.5">
            {featured.map((p, i) => (
              <button
                key={p.id}
                type="button"
                aria-label={`Voir ${p.name}`}
                onClick={() => goTo(i, i > index ? 1 : -1)}
                className={`h-[3px] transition-all ${
                  i === index ? "w-8 bg-primary" : "w-4 bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}