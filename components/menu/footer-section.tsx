"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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