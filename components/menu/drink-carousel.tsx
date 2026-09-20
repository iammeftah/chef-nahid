"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";

/**
 * Drag-to-the-edge carousel for drinks (juices and sodas): each item is a
 * full-width snap point, so swiping carries the current drink all the way
 * off screen while the next slides in from the other side. A soft glow
 * backdrop + drop shadow behind the image make the bottle/glass pop more
 * than a plain flat tile.
 */
export function DrinkCarousel({ products }: { products: Product[] }) {
  const [index, setIndex] = useState(0);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const i = itemRefs.current.findIndex((el) => el === visible[0].target);
          if (i !== -1) setIndex(i);
        }
      },
      { threshold: 0.6 }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [products.length]);

  const goTo = (i: number) => {
    itemRefs.current[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  if (products.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center"
    >
      <div
        className="flex w-full snap-x snap-mandatory overflow-x-auto [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {products.map((product, i) => (
          <article
            key={product.id}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="flex w-full shrink-0 snap-center flex-col items-center px-4 sm:px-6 "
          >
            <div className="relative flex h-[26rem] w-full max-w-sm items-center justify-center sm:h-[30rem]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="pointer-events-none relative select-none object-contain"
                draggable={false}
              />
            </div>
            <div className="mt-2 text-center">
              <h3 className="font-display text-2xl text-foreground">{product.name}</h3>
              <div className="mt-1 flex items-baseline justify-center gap-1">
                <span className="text-2xl font-bold text-primary">{product.price}</span>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  {product.currency}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-3 flex gap-1.5">
        {products.map((p, i) => (
          <button
            key={p.id}
            type="button"
            aria-label={`Voir ${p.name}`}
            onClick={() => goTo(i)}
            className={`h-[3px] transition-all ${
              i === index ? "w-8 bg-primary" : "w-4 bg-border"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}