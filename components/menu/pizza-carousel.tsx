"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import type { Product } from "@/data/products";
import { DepthImage } from "./depth-image";

const SWIPE_THRESHOLD = 50;

/**
 * The pizza itself never translates — it stays perfectly centered and spins
 * flat, in the plane of the screen (like a record on a turntable), to
 * introduce the next one, instead of flipping edge-on like a coin. The drag
 * gesture is captured but visually pinned (dragElastic 0, constraints 0/0)
 * so the image doesn't shift a single pixel while swiping.
 */
export function PizzaCarousel({ products }: { products: Product[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (products.length === 0) return null;

  const goTo = (newIndex: number, dir: number) => {
    setDirection(dir);
    setIndex((newIndex + products.length) % products.length);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) goTo(index + 1, 1);
    else if (info.offset.x > SWIPE_THRESHOLD) goTo(index - 1, -1);
  };

  const product = products[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative flex flex-col items-center px-4 py-6 sm:px-6"
    >
      <motion.div
        className="relative aspect-square w-full max-w-md cursor-grab active:cursor-grabbing sm:max-w-lg"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={product.id}
            custom={direction}
            initial={{ opacity: 0, rotate: direction >= 0 ? 30 : -30 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{
              opacity: 0,
              rotate: direction >= 0 ? -30 : 30,
              // starts fading a bit later, so the pizza underneath never dips
              // while the new one is still fading in on top
              transition: { duration: 0.45, ease: "easeInOut", opacity: { duration: 0.35, delay: 0.1 } },
            }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 90vw, 32rem"
              className="pointer-events-none select-none object-contain"
              style={{ transform: `scale(${product.imageScale ?? 1})` }}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="relative mt-4 grid w-full max-w-sm overflow-hidden text-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={product.id}
            custom={direction}
            initial={{ opacity: 0, x: direction >= 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -40 : 40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="col-start-1 row-start-1 flex flex-col items-center"
          >
            <h3 className="font-display text-xl text-foreground">{product.name}</h3>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-xl font-bold text-primary">{product.price}</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {product.currency}
              </span>
            </div>
            {product.ingredients && product.ingredients.length > 0 && (
              <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground">
                {product.ingredients.join(" · ")}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-3 flex gap-1.5">
        {products.map((p, i) => (
          <button
            key={p.id}
            type="button"
            aria-label={`Voir ${p.name}`}
            onClick={() => goTo(i, i > index ? 1 : -1)}
            className={`h-[3px] transition-all ${
              i === index ? "w-8 bg-primary" : "w-4 bg-border"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}