"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useProgress } from "@react-three/drei";

// ---- TWEAK THESE ----------------------------------------------------------
const BRAND = "Chef Nahid";
const TAGLINE = "Sandwichs · Pizzas · Jus · Douceurs";

// Leading color first, final color last. The last one is what the wordmark
// ends up as, so keep it your primary brand color.
const COLORS = ["#e63946", "#2a9d8f", "#f5b82e"];

const INTRO_MS = 700; // outline alone, before the fill starts
const MIN_FILL_MS = 1800; // fill never finishes faster than this
const MAX_DURATION = 10000; // safety net so it never hangs
const LAG = 0.18; // gap between color layers while filling

const HOLD_MS = 500; // pause on the finished wordmark before the outro
const OUTRO_MS = 2200; // total slide-up duration
const OUT_LAG = 0.25; // gap between color layers while leaving
const OUTRO_EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

// ---------------------------------------------------------------------------

// Padding gives the script font's ascenders/descenders room inside the box,
// so nothing gets clipped. Every layer uses the same box so they line up.
const TEXT_CLASS =
  "whitespace-nowrap px-8 py-12 font-display text-7xl leading-none sm:text-8xl";

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

function FillLayer({
  progress,
  outro,
  index,
  count,
  color,
}: {
  progress: MotionValue<number>;
  outro: MotionValue<number>;
  index: number;
  count: number;
  color: string;
}) {
  // One value drives both phases:
  //   fill:  100 -> 0   (window rises, revealing the color bottom to top)
  //   outro:   0 -> -100 (window keeps rising, erasing the color bottom to top)
  // The top layer leaves first, so the layers underneath show as it goes.
  const shift = useTransform([progress, outro], ([p, o]: number[]) => {
    const fillLevel = clamp01((p - index * LAG) / (1 - (count - 1) * LAG));
    const outLevel = clamp01(
      (o - (count - 1 - index) * OUT_LAG) / (1 - (count - 1) * OUT_LAG)
    );
    return (1 - fillLevel) * 100 - outLevel * 100;
  });

  // Mask trick: the window moves one way, the text moves the opposite way by
  // the same amount, so the text stays put. Transforms only, no repaint.
  const maskY = useTransform(shift, (s) => `${s}%`);
  const textY = useTransform(shift, (s) => `${-s}%`);

  return (
    <motion.div
      aria-hidden
      className="col-start-1 row-start-1 overflow-hidden"
      style={{ y: maskY, willChange: "transform" }}
    >
      <motion.div
        className={TEXT_CLASS}
        style={{ color, y: textY, willChange: "transform" }}
      >
        {BRAND}
      </motion.div>
    </motion.div>
  );
}

export function PageLoader() {
  const { progress: modelProgress, total: modelTotal } = useProgress();
  const modelRef = useRef({ progress: 0, total: 0 });
  modelRef.current = { progress: modelProgress, total: modelTotal };

  const [done, setDone] = useState(false);
  const readyRef = useRef(false);
  const finishingRef = useRef(false);

  // Overdamped spring: glides toward the target, never overshoots or jumps.
  const progress = useSpring(0, { stiffness: 45, damping: 16, restDelta: 0.0005 });

  // 0 -> 1 during the outro
  const outro = useMotionValue(0);

  // Outline fades out once the fill is essentially complete, so it is
  // already gone before the outro starts.
  const outlineOpacity = useTransform(progress, [0.96, 1], [1, 0]);
  const taglineOpacity = useTransform(outro, [0, 0.3], [1, 0]);
  // Background only dissolves at the very end of the slide
  const bgOpacity = useTransform(outro, [0.75, 1], [1, 0]);

  // Track real loading and feed the target to the spring
  useEffect(() => {
    if (done) return;
    const start = performance.now();
    let best = 0;
    let last = -1;

    const tick = () => {
      const elapsed = performance.now() - start;

      // Below-the-fold images are lazy and would never load behind the loader
      const imgs = Array.from(document.images);
      imgs.forEach((img) => {
        if (img.loading === "lazy" && !img.complete) img.loading = "eager";
      });
      const videos = Array.from(document.querySelectorAll("video"));

      const imgsDone = imgs.filter((i) => i.complete).length;
      const videosDone = videos.filter((v) => v.readyState >= 2 || v.error).length;
      const fontsDone = document.fonts.status === "loaded";
      const pageDone = document.readyState === "complete";
      const { progress: mp, total: mt } = modelRef.current;
      const modelDone = mt === 0 || mp >= 100;

      const total = imgs.length + videos.length + 2 + (mt > 0 ? 1 : 0);
      const doneCount =
        imgsDone +
        videosDone +
        (fontsDone ? 1 : 0) +
        (pageDone ? 1 : 0) +
        (mt > 0 ? Math.min(mp, 100) / 100 : 0);

      const allDone =
        imgsDone === imgs.length &&
        videosDone === videos.length &&
        fontsDone &&
        pageDone &&
        modelDone;

      let target = 0;
      if (elapsed >= INTRO_MS) {
        const fillElapsed = elapsed - INTRO_MS;
        // slow asymptotic creep so the fill always feels alive
        const creep = 0.85 * (1 - Math.exp(-fillElapsed / 2200));
        const real = (doneCount / total) * 0.92;
        best = Math.max(best, real, creep);

        const ready =
          (allDone && fillElapsed >= MIN_FILL_MS) || elapsed >= MAX_DURATION;
        readyRef.current = ready;
        target = ready ? 1 : Math.min(0.92, best);
      }

      if (target !== last) {
        progress.set(target);
        last = target;
      }
    };

    tick();
    const id = setInterval(tick, 150);
    return () => clearInterval(id);
  }, [done, progress]);

  // When the fill visually completes: hold a beat, play the outro, then
  // remove the loader.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let controls: ReturnType<typeof animate> | undefined;

    const unsub = progress.on("change", (v) => {
      if (readyRef.current && v >= 0.995 && !finishingRef.current) {
        finishingRef.current = true;
        timer = setTimeout(() => {
          controls = animate(outro, 1, {
            duration: OUTRO_MS / 1000,
            ease: OUTRO_EASE,
            onComplete: () => setDone(true),
        });
        }, HOLD_MS);
      }
    });

    return () => {
      unsub();
      clearTimeout(timer);
      controls?.stop();
    };
  }, [progress, outro]);

  // Lock scroll while the loader is visible
  useEffect(() => {
    if (done) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [done]);

  if (done) return null;

  return (
    <div
      role="status"
      aria-label="Chargement"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
    >
      {/* Background is its own layer so it can dissolve without fading the text */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-background"
        style={{ opacity: bgOpacity }}
      />

      <motion.div className="relative -mb-4" style={{ opacity: taglineOpacity }}>
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: INTRO_MS / 1400, duration: 0.6, ease: "easeOut" }}
          className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground"
        >
          BIENVENUE CHEZ
        </motion.p>
      </motion.div>

      <div className="relative grid place-items-center">
        {/* 1. Outline only, fades in first, gone before the outro */}
        <motion.div
        aria-hidden
        className="col-start-1 row-start-1"
        style={{ opacity: outlineOpacity }}
        >
        <div
            className={TEXT_CLASS}
            style={{
            opacity: 0.5,
            WebkitTextStroke: "1px #808080",
            WebkitTextFillColor: "transparent",
            }}
        >
            {BRAND}
        </div>
        </motion.div>

        {/* 2. Flat color layers: rise to fill, then keep rising to leave */}
        {COLORS.map((color, i) => (
          <FillLayer
            key={color}
            progress={progress}
            outro={outro}
            index={i}
            count={COLORS.length}
            color={color}
          />
        ))}
      </div>

      <motion.div className="relative -mt-4" style={{ opacity: taglineOpacity }}>
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: INTRO_MS / 1000, duration: 0.6, ease: "easeOut" }}
          className="text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground"
        >
          {TAGLINE}
        </motion.p>
      </motion.div>
    </div>
  );
}