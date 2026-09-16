"use client";

import { useState } from "react";
import { categories, categoryGroups, type CategoryGroup } from "@/data/products";
import { slugify } from "./slugify";

const GROUPS = Object.keys(categoryGroups) as CategoryGroup[];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  const scrollToGroup = (group: CategoryGroup) => {
    const firstCategory = categoryGroups[group].find((c) => categories.includes(c));
    if (!firstCategory) return;
    document.getElementById(slugify(firstCategory))?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background">
      <div className="relative flex h-14 items-center justify-between px-4 sm:px-6">
        <div className="flex items-baseline gap-2">
          <span aria-hidden className="text-primary">
            |
          </span>
          <span className="text-base font-bold uppercase tracking-[0.3em] text-foreground">
            Nahid
          </span>
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Snack</span>
        </div>

        <button
          type="button"
          aria-label="Ouvrir le menu des catégories"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-8 w-8 items-center justify-center text-foreground"
        >
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 1H20" stroke="currentColor" strokeWidth="1.5" />
            <path d="M0 7H20" stroke="currentColor" strokeWidth="1.5" />
            <path d="M0 13H20" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>

        {open && (
          <div className="absolute left-0 right-0 top-full border-t border-border bg-background px-4 py-4 sm:px-6">
            <ul className="grid grid-cols-3 gap-px bg-border">
              {GROUPS.map((group) => (
                <li key={group}>
                  <button
                    type="button"
                    onClick={() => scrollToGroup(group)}
                    className="flex w-full items-center justify-center bg-background py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {group}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}