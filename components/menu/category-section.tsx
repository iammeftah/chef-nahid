"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Product, ProductCategory } from "@/data/products";
import { BentoGrid } from "./bento-grid";
import { PizzaCarousel } from "./pizza-carousel";
import { DrinkCarousel } from "./drink-carousel";
import { slugify } from "./slugify";

// These categories are made to order and only available through Glovo —
// shown as a small badge next to the category title instead of being
// baked into every individual product.
const GLOVO_ONLY_CATEGORIES: ProductCategory[] = ["Pancake", "Gaufre", "Crêpe"];

export function CategorySection({
  category,
  products,
}: {
  category: ProductCategory;
  products: Product[];
}) {
  if (products.length === 0) return null;

  const glovoOnly = GLOVO_ONLY_CATEGORIES.includes(category);

  return (
    <section id={slugify(category)} className="scroll-mt-32 px-4 py-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-4 flex flex-wrap items-center gap-3"
      >
        <h2 className="text-3xl font-extrabold uppercase tracking-tight text-foreground sm:text-4xl">
          {category}
        </h2>

        {glovoOnly && (
          <span className="inline-flex items-center gap-1.5 border border-border px-2.5 py-1.5 text-[10px] font-semibold tracking-wider text-muted-foreground">
            Sur commande
            <Image
              src="/images/glovo-seeklogo.svg"
              alt="Glovo"
              width={64}
              height={24}
              className="h-5 w-auto object-contain mb-1"
            />
          </span>
        )}
      </motion.div>

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