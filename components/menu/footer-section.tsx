"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// ---- LOCATION -------------------------------------------------------------
const LAT = 31.673725782227308;
const LNG = -8.014955557818556;
const MAP_ZOOM = 16;
const MAP_IMG = `/sketchmap.png`;
const DIRECTIONS_URL = `https://www.google.com/maps?q=${LAT},${LNG}`;
// ---------------------------------------------------------------------------



export function FooterSection() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="border-t border-border px-4 pb-8 pt-14 text-center sm:px-6"
    >

      {/* Brand — same treatment as the hero */}
      <h2 className="font-display text-6xl leading-tight text-foreground sm:text-5xl">
        Chef Nahid
      </h2>
      <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">
        Sandwichs, pizzas, jus &amp; douceurs faits maison.
      </p>

      <span className="mx-auto mt-6 block h-px w-12 bg-primary" aria-hidden />

      {/* Hours */}
      <div className=" mx-auto mt-6 max-w-sm border border-border px-3 py-5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
          Horaires
        </span>
        <p className="mt-2 text-sm font-semibold text-foreground">16h – 4h</p>
        <p className="mt-0.5 text-[11px] uppercase tracking-wide text-muted-foreground">
          Tous les jours
        </p>

        <span aria-hidden className="mx-auto mt-4 block h-px w-8 bg-border" />

        <p className="mx-auto mt-4 max-w-[16rem] text-xs leading-relaxed text-muted-foreground">
          Un petit creux tard le soir ? On est encore là jusqu'à{" "}
          <span className="font-semibold text-foreground">4h du matin</span>.
        </p>
      </div>

      {/* Delivery partner */}
      <div className="mx-auto mt-4 max-w-sm border border-border px-3 py-5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
          Livraison
        </span>
        <div className="mt-3 flex items-center justify-center">
          <Image
            src="/images/glovo-seeklogo.svg"
            alt="Glovo"
            width={96}
            height={32}
            className="h-8 w-auto"
          />
        </div>
        <p className="mt-2 text-[11px] uppercase tracking-wide text-muted-foreground">
          Nous livrons avec Glovo
        </p>
      </div>

      {/* Location — custom-styled map, not a plain Google Maps embed */}
      <div className="mx-auto mt-4 max-w-sm border border-border px-3 py-5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
          Localisation
        </span>
        <p className="mt-2 text-sm font-semibold text-foreground">Marrakech, Maroc</p>
        <p className="mt-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
          {LAT.toFixed(6)}, {LNG.toFixed(6)}
        </p>

        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mx-auto mt-4 block h-40 w-full overflow-hidden rounded-lg border border-border"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={MAP_IMG}
            alt="Localisation Chef Nahid sur la carte"
            draggable={false}
            className="h-full w-full select-none object-cover transition-transform duration-300 group-hover:scale-105"
            style={{
              filter:
                "grayscale(1) invert(92%) contrast(0.92) brightness(0.92) hue-rotate(180deg) saturate(1.4)",
            }}
          />

          {/* brand-color tint over the desaturated tiles */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(230,57,70,0.16), transparent 55%), linear-gradient(160deg, rgba(42,157,143,0.20), rgba(18,16,20,0.35))",
              mixBlendMode: "multiply",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(244,239,233,0.25)]"
          />

          {/* pulsing pin, centered on the map's exact coordinates */}
          <div aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
            <svg
              width="22"
              height="30"
              viewBox="0 0 22 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]"
            >
              <path
                d="M11 0C4.9 0 0 4.9 0 11c0 8.25 11 19 11 19s11-10.75 11-19C22 4.9 17.1 0 11 0z"
                fill="var(--primary, #e63946)"
              />
              <circle cx="11" cy="11" r="4.2" fill="#fff2ee" />
            </svg>
          </div>

          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1 text-left text-[9px] font-bold uppercase tracking-wider text-white">
            Voir l&apos;itinéraire
          </span>
        </a>
      </div>

      {/* Back to top */}
      <button
        type="button"
        aria-label="Retour en haut"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="mx-auto mt-8 flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 11L8 5L14 11" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span className="text-[9px] font-semibold uppercase tracking-[0.2em]">Retour en haut</span>
      </button>

      {/* Bottom bar + signature */}
      <div className="mt-10 border-t border-border pt-6">
        <p className="text-[10px] text-muted-foreground">
          © {new Date().getFullYear()} Chef Nahid · Tous droits réservés
        </p>
        <a
          href="https://meftah.me"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-3 inline-flex items-baseline gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="font-display text-xl text-foreground transition-colors group-hover:text-primary">
            Hmed
          </span>
        </a>
      </div>
    </motion.footer>
  );
}