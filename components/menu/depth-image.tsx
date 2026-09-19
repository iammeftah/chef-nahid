"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

/**
 * Wraps a product image and relights it as the pointer moves across it: a
 * soft directional sheen sweeps with the pointer, the image tilts subtly
 * toward the light (giving a sense of surface/depth), and the contact
 * shadow shifts opposite the light — like the product is sitting under a
 * bulb that's being dragged around above it.
 *
 * Inert (flat, resting state, no tilt) on touch/coarse pointers — there's
 * no hover there, and we don't want to fight page scroll on mobile.
 */
export function DepthImage({
  children,
  className,
  shadowClassName,
}: {
  children: React.ReactNode;
  className?: string;
  shadowClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFinePointer(mq.matches);
    const listener = (e: MediaQueryListEvent) => setFinePointer(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!finePointer) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - rect.left) / rect.width - 0.5;
      const dy = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--dx", dx.toFixed(3));
      el.style.setProperty("--dy", dy.toFixed(3));
      el.style.setProperty("--sheen", "0.5");
    },
    [finePointer]
  );

  const handlePointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--dx", "0");
    el.style.setProperty("--dy", "-0.15");
    el.style.setProperty("--sheen", "0");
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn("relative [perspective:800px]", className)}
      style={{ "--dx": 0, "--dy": -0.15, "--sheen": 0 } as React.CSSProperties}
    >
      {/* contact shadow — shifts opposite the light so it reads as cast, not stuck */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute rounded-[100%] transition-[transform] duration-200 ease-out",
          shadowClassName
        )}
        style={{
          backgroundColor: "var(--shadow-color)",
          transform: "translate(calc(var(--dx) * -24px), calc(var(--dy) * -10px))",
        }}
      />

      {/* the image itself — tilts subtly toward the light */}
      <div
        className="relative h-full w-full transition-transform duration-200 ease-out [transform-style:preserve-3d]"
        style={{
          transform: "rotateX(calc(var(--dy) * -10deg)) rotateY(calc(var(--dx) * 10deg))",
        }}
      >
        {children}

        {/* raking-light sheen, follows the pointer */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-200 ease-out"
          style={{
            opacity: "var(--sheen)",
            background:
              "radial-gradient(circle at calc(50% + var(--dx) * 100%) calc(50% + var(--dy) * 100%), oklch(1 0 0 / 0.55), transparent 55%)",
          }}
        />
      </div>
    </div>
  );
}
