"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";

/**
 * True drag-to-the-edge carousel: each juice is a full-width snap point, so
 * dragging/swiping carries the current juice all the way off screen while
 * the next one slides in from the other side — no fade, just a plain
 * native scroll-snap track.
 */
export function JuiceCarousel({ products }: { products: Product[] }) {
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
            className="flex w-full shrink-0 snap-center flex-col items-center px-4 sm:px-6"
          >
            <div className="relative h-56 w-full max-w-xs pb-3 sm:h-64">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="pointer-events-none select-none object-contain object-bottom"
                style={{ transform: `scale(${product.imageScale ?? 1})`, transformOrigin: "center bottom" }}
                draggable={false}
              />
            </div>
            <div className="mt-3 text-center">
              <h3 className="text-base font-semibold text-foreground">{product.name}</h3>
              <div className="mt-1 flex items-baseline justify-center gap-1">
                <span className="text-lg font-bold text-primary">{product.price}</span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
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
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-5 bg-primary" : "w-1.5 bg-border"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}