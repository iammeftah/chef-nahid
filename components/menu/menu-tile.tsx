"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/products";

type RevealLevel = "caption" | "ingredients" | null;

export function MenuTile({
  product,
  index,
  large = false,
  revealLevel = null,
  onToggle,
}: {
  product: Product;
  index: number;
  large?: boolean;
  revealLevel?: RevealLevel;
  onToggle?: () => void;
}) {
  const [broken, setBroken] = useState(false);
  const hasIngredients = Boolean(product.ingredients && product.ingredients.length > 0);

  // Tiles with no ingredients have nothing to progressively reveal, so
  // their name/price bar is always on and they aren't interactive.
  const showCaption = !hasIngredients || revealLevel === "caption" || revealLevel === "ingredients";
  const showIngredientsPanel = hasIngredients && revealLevel === "ingredients";

  return (
    <motion.div
      data-tile-id={product.id}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, delay: Math.min(index, 6) * 0.04, ease: "easeOut" }}
      whileTap={{ scale: 0.97 }}
      onClick={() => hasIngredients && onToggle?.()}
      className={cn(
        "group relative overflow-hidden border border-border bg-background transition-colors duration-200 hover:border-primary",
        hasIngredients && "cursor-pointer",
        "aspect-square",
        large && "col-span-2 row-span-2"
      )}
    >
      {!broken && (
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          onError={() => setBroken(true)}
        />
      )}

      <span className="absolute left-2 top-2 bg-black/70 px-1.5 py-0.5 text-[10px] font-medium tracking-widest text-muted-foreground">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Name / price bar — hidden by default for tiles with ingredients,
          revealed on the first tap. Always on for tiles without ingredients. */}
      <AnimatePresence>
        {showCaption && (
          <motion.div
            initial={hasIngredients ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-x-0 bottom-0 bg-black/80 px-3 py-2.5"
          >
            {product.featured && (
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">
                Signature
              </span>
            )}

            <h3
              className={cn(
                "font-semibold leading-snug text-foreground",
                large ? "text-lg" : "text-sm"
              )}
            >
              {product.name}
            </h3>

            {hasIngredients && (
              <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-wide text-primary/90">
                Voir les ingrédients
              </span>
            )}

            <div className="mt-1.5 flex items-end justify-between gap-3">
              <span aria-hidden className="h-px flex-1 border-t border-dashed border-border" />
              <div className="shrink-0 text-right">
                <span className={cn("font-bold text-primary", large ? "text-xl" : "text-base")}>
                  {product.price}
                </span>
                <span className="ml-1 text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                  {product.currency}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full ingredient list, covering the whole tile so nothing gets
          clipped with "...". Shown on the second tap; a third tap, or a
          click anywhere else, collapses everything back to just the image. */}
      <AnimatePresence>
        {showIngredientsPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-black/90 p-4 text-center backdrop-blur-sm"
          >
            <h3 className={cn("font-semibold text-foreground", large ? "text-lg" : "text-sm")}>
              {product.name}
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {product.ingredients!.join(", ")}
            </p>
            <div className="mt-1">
              <span className={cn("font-bold text-primary", large ? "text-xl" : "text-base")}>
                {product.price}
              </span>
              <span className="ml-1 text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                {product.currency}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}