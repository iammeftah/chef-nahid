"use client";

import { motion } from "framer-motion";
import type { Product, ProductCategory } from "@/data/products";
import { BentoGrid } from "./bento-grid";
import { PizzaCarousel } from "./pizza-carousel";
import { DrinkCarousel } from "./drink-carousel";
import { slugify } from "./slugify";

export function CategorySection({
  category,
  products,
}: {
  category: ProductCategory;
  products: Product[];
}) {
  if (products.length === 0) return null;

  return (
    <section id={slugify(category)} className="scroll-mt-32 px-4 py-10 sm:px-6">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-4 text-3xl font-extrabold uppercase tracking-tight text-foreground sm:text-4xl"
      >
        {category}
      </motion.h2>

      {category === "Pizza" ? (
        <PizzaCarousel products={products} />
      ) : category === "Jus" || category === "Boissons" ? (
        <DrinkCarousel products={products} />
      ) : (
        <BentoGrid products={products} />
      )}
    </section>
  );
}