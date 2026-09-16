"use client";

import { motion } from "framer-motion";

export function FooterSection() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="border-t border-border px-4 py-10 text-center sm:px-6"
    >
      <p className="text-base font-bold uppercase tracking-[0.2em] text-foreground">Nahid Snack</p>
      <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">
        Ouvert tous les jours, 10h – 23h
      </p>
      <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">Marrakech, Maroc</p>
      <p className="mt-4 text-[10px] text-muted-foreground">
        © {new Date().getFullYear()} Nahid Snack
      </p>
    </motion.footer>
  );
}