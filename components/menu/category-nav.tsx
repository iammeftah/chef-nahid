"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { ProductCategory } from "@/data/products";
import { categoryGroups, type CategoryGroup } from "@/data/products";
import { slugify } from "./slugify";

const GROUPS = Object.keys(categoryGroups) as CategoryGroup[];

/**
 * Grid nav of the three high-level groups (Salé / Sucré / Boissons).
 * Clicking a group scrolls to the first of its categories that actually
 * has products on the page. A scroll-spy keeps the active group in sync
 * with whichever category section is currently in view.
 */
export function CategoryNav({ categories }: { categories: ProductCategory[] }) {
  const [activeGroup, setActiveGroup] = useState<CategoryGroup>(GROUPS[0]);

  useEffect(() => {
    const sections = categories
      .map((category) => document.getElementById(slugify(category)))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          const matchCategory = categories.find((c) => slugify(c) === visible[0].target.id);
          if (matchCategory) {
            const group = GROUPS.find((g) => categoryGroups[g].includes(matchCategory));
            if (group) setActiveGroup(group);
          }
        }
      },
      { rootMargin: "-140px 0px -65% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categories]);

  const scrollToGroup = (group: CategoryGroup) => {
    const firstCategory = categoryGroups[group].find((c) => categories.includes(c));
    if (!firstCategory) return;
    document.getElementById(slugify(firstCategory))?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="sticky top-14 z-10 border-b border-border bg-background">
      <div className="grid grid-cols-3 gap-px bg-border">
        {GROUPS.map((group) => {
          const isActive = group === activeGroup;
          return (
            <button
              key={group}
              type="button"
              aria-current={isActive}
              onClick={() => scrollToGroup(group)}
              className={cn(
                "flex items-center justify-center bg-background py-3 text-xs font-semibold uppercase tracking-widest outline-none transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {group}
            </button>
          );
        })}
      </div>
    </div>
  );
}