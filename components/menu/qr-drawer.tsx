"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const PANEL_WIDTH = 224; // px
const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

export function QrDrawer() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside press or Escape
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    // pointer-events-none so the empty area around the tab never blocks the page
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-1/2 z-40 -translate-y-1/2"
    >
      <motion.div
        initial={false}
        animate={{ x: open ? 0 : -PANEL_WIDTH }}
        transition={{ duration: 0.45, ease: EASE }}
        className="pointer-events-none flex items-stretch"
      >
        {/* Panel */}
        <div
          aria-hidden={!open}
          style={{ width: PANEL_WIDTH }}
          className="pointer-events-auto border border-l-0 border-border bg-background p-4 text-center"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
            Partagez le menu
          </span>
          {/* white card so the code stays scannable in dark mode */}
          <div className="mx-auto mt-3 w-fit bg-white p-3">
            <Image
              src="/adobe-express-qr-code.svg"
              alt="QR code du menu Chef Nahid"
              width={160}
              height={160}
              className="h-40 w-40"
            />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Faites scanner ce code à vos amis pour qu'ils découvrent le menu.
          </p>
        </div>

        {/* Tab on the edge */}
        <button
          type="button"
          aria-label={open ? "Masquer le QR code" : "Afficher le QR code du menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="pointer-events-auto flex h-12 w-9 shrink-0 items-center justify-center self-center border border-l-0 border-border bg-background text-primary transition-colors hover:text-foreground"
        >
          {open ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <path d="M14 14h3v3h-3zM20 14v3M14 20h3M20 20h1" />
            </svg>
          )}
        </button>
      </motion.div>
    </div>
  );
}