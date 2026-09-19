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
 *
 * Only a single image is rendered per slide (no blurred duplicate behind
 * it) — that blur was the main thing making the drag feel laggy on phones,
 * since large blurred layers are expensive to repaint every frame.
 */
export function HeroSection({ featured }: { featured: Product[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
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

  const scrollToNext = () => {
    sectionRef.current?.nextElementSibling?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const active = featured[index];
  const showLandingAnimation = isInitialLoad.current && index === 0;

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden bg-background">
      {/* LAYER 1 — the image. Absolute, full-bleed, on its own. */}
      <motion.div
        className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
        style={{ willChange: "transform" }}
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
            style={{ willChange: "transform, opacity" }}
          >
            <Image
                src={active.image}
                alt={active.name}
                fill
                priority
                sizes="100vw"
                className="pointer-events-none select-none object-contain p-2 sm:p-6"
                draggable={false}
              />
          </motion.div>
        </AnimatePresence>
      </motion.div>


      {/* LAYER 3 — the text. Its own flex column, top-to-bottom, with zero
          relation to how the image layer is sized or positioned. */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between px-4 py-14 sm:px-6 sm:py-16">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-display text-7xl leading-tight text-foreground sm:text-6xl">
            Chef Nahid
          </h1>
          <p className="mx-auto mt-3 max-w-xs text-sm text-foreground sm:max-w-sm">
            Sandwichs, pizzas, jus &amp; douceurs faits maison — préparés à la commande, à Marrakech.
          </p>
          <span className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            Nos coups de cœur
          </span>
        </div>

        <div className="flex w-full flex-col items-center gap-4 sm:max-w-sm mx-auto">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="flex max-w-sm w-full items-center justify-between gap-4 pt-3 "
            >
              <h3 className="font-display text-4xl leading-none text-foreground sm:text-3xl">
                {active.name}
              </h3>
              <div className="flex shrink-0 items-baseline gap-1">
                <span className="text-7xl font-semibold leading-none text-primary sm:text-3xl">
                  {active.price}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
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

          <button
            type="button"
            aria-label="Voir le menu"
            onClick={scrollToNext}
            className="pointer-events-auto flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em]">
              Voir le menu
            </span>
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M2 5L8 11L14 5" stroke="currentColor" strokeWidth="1.5" />
            </motion.svg>
          </button>
        </div>
      </div>
    </section>
  );
}