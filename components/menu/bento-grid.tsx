"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import { MenuTile } from "./menu-tile";

export function BentoGrid({ products }: { products: Product[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {products.map((product, index) => (
        <MenuTile
          key={product.id}
          product={product}
          index={index}
          large={Boolean(product.featured)}
          isOpen={openId === product.id}
          onToggle={() =>
            setOpenId((current) => (current === product.id ? null : product.id))
          }
        />
      ))}
    </div>
  );
}