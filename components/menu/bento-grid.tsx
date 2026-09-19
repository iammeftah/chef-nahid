"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/data/products";
import { MenuTile } from "./menu-tile";

type Stage = { id: string; level: "caption" | "ingredients" } | null;

export function BentoGrid({ products }: { products: Product[] }) {
  const [stage, setStage] = useState<Stage>(null);

  // Any press that isn't on the currently-active tile collapses it back to
  // fully hidden.
  useEffect(() => {
    if (!stage) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const tileEl = target?.closest<HTMLElement>("[data-tile-id]");
      if (tileEl?.dataset.tileId !== stage.id) setStage(null);
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
          // tap: show name + price, tap again: hide everything
          onTap={() =>
            setStage((current) =>
              current?.id === product.id ? null : { id: product.id, level: "caption" }
            )
          }
          // long press: show the ingredients
          onLongPress={() => setStage({ id: product.id, level: "ingredients" })}
        />
      ))}
    </div>
  );
}