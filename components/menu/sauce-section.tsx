"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// ---- EDIT THESE -----------------------------------------------------------
const SAUCE_IMAGE = "/images/chili-sauce.png";
const LABEL = "Fait maison";
const TITLE = "Notre sauce piquante";
const TEXT =
  "Préparée maison, pour tous ceux qui aiment quand ça pique.";
// ---------------------------------------------------------------------------

export function SauceSection() {
  return (
    <section className="border-t border-border px-4 py-14 text-center sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto flex max-w-sm flex-col items-center"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
          {LABEL}
        </span>

        <h2 className="mt-2 text-3xl font-extrabold uppercase tracking-tight text-foreground sm:text-4xl">
          {TITLE}
        </h2>

        {/* Bottle */}
        <div className="relative mt-6 flex h-[22rem] w-full items-center justify-center sm:h-[26rem]"> 
          <Image
            src={SAUCE_IMAGE}
            alt="Bouteille de sauce piquante maison Chef Nahid"
            fill
            sizes="(max-width: 640px) 90vw, 24rem"
            className="pointer-events-none select-none object-contain"
            draggable={false}
          />
        </div>

        <span aria-hidden className="mt-4 block h-px w-12 bg-primary" />

        <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
          {TEXT}
        </p>
      </motion.div>
    </section>
  );
}