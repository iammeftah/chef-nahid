"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/data/products";
import { MenuTile } from "./menu-tile";

type Stage = { id: string; level: "caption" | "ingredients" } | null;

export function BentoGrid({ products }: { products: Product[] }) {
  const [stage, setStage] = useState<Stage>(null);

  // Any click that isn't on the currently-active tile collapses it back to
  // fully hidden — clicking a different tile, blank grid space, or anywhere
  // else on the page all count as "elsewhere".
  useEffect(() => {
    if (!stage) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const tileEl = target?.closest<HTMLElement>("[data-tile-id]");
      const clickedId = tileEl?.dataset.tileId;
      if (clickedId !== stage.id) {
        setStage(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [stage]);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {products.map((product, index) => (
        <MenuTile
          key={product.id}
          product={product}
          index={index}
          large={Boolean(product.featured)}
          revealLevel={stage?.id === product.id ? stage.level : null}
          onToggle={() =>
            setStage((current) => {
              if (!current || current.id !== product.id) {
                // first tap on this tile — just reveal the name/price bar
                return { id: product.id, level: "caption" };
              }
              if (current.level === "caption") {
                // second tap on the same tile — show full ingredients
                return { id: product.id, level: "ingredients" };
              }
              // third tap on the same tile — collapse it back
              return null;
            })
          }
        />
      ))}
    </div>
  );
}