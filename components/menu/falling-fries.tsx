"use client";

import { useEffect, useState } from "react";

// ---- TWEAK THESE ----------------------------------------------------------
const FRY_SRC = "/images/french-fry.png";
const COUNT = 16; // how many fries are on screen at once
const MIN_SIZE = 50; // px, far fries
const MAX_SIZE = 100; // px, near fries
const MIN_SPEED_S = 8; // seconds to cross the screen, near fries (fast)
const MAX_SPEED_S = 16; // seconds to cross the screen, far fries (slow)
const MIN_OPACITY = 0.3;
const MAX_OPACITY = 0.6;
// ---------------------------------------------------------------------------

type Fry = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  r0: number;
  r1: number;
  opacity: number;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);

function makeFries(count: number): Fry[] {
  return Array.from({ length: count }, (_, i) => {
    // t = 0 is far (small, slow, faint), t = 1 is near (big, fast, brighter)
    const t = Math.random();
    const duration = MAX_SPEED_S - t * (MAX_SPEED_S - MIN_SPEED_S);
    const spin = (Math.random() < 0.5 ? -1 : 1) * rand(120, 360);
    const r0 = rand(-40, 40);
    return {
      id: i,
      // golden-ratio spacing keeps them evenly spread with no clumps
      left: ((i * 0.618034 + Math.random() * 0.05) % 1) * 100,
      size: MIN_SIZE + t * (MAX_SIZE - MIN_SIZE),
      duration,
      // negative delay = already mid-fall at first paint, so the screen is
      // never empty at the start
      delay: -(((i * 0.381966) % 1) * duration),
      drift: rand(-40, 40),
      r0,
      r1: r0 + spin,
      opacity: MIN_OPACITY + t * (MAX_OPACITY - MIN_OPACITY),
    };
  });
}

const CSS = `
@keyframes falling-fry {
  from { transform: translate3d(0, -100%, 0) rotate(var(--r0)); }
  to   { transform: translate3d(var(--drift), calc(100vh + 100%), 0) rotate(var(--r1)); }
}
.falling-fry {
  animation-name: falling-fry;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform;
}
@media (prefers-reduced-motion: reduce) {
  .falling-fry { display: none; }
}
`;

export function FallingFries() {
  const [fries, setFries] = useState<Fry[]>([]);

  // Random values are generated after mount, so the server and client HTML
  // always match (no hydration warning).
  useEffect(() => {
    setFries(makeFries(COUNT));
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <style>{CSS}</style>
      {fries.map((f) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={f.id}
          src={FRY_SRC}
          alt=""
          draggable={false}
          className="falling-fry absolute top-0 h-auto select-none"
          style={
            {
              left: `${f.left}%`,
              width: f.size,
              opacity: f.opacity,
              animationDuration: `${f.duration}s`,
              animationDelay: `${f.delay}s`,
              "--drift": `${f.drift}px`,
              "--r0": `${f.r0}deg`,
              "--r1": `${f.r1}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}