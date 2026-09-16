import { products } from "@/data/products";
import { BentoGrid } from "./bento-grid";

export function SpecialSection() {
  const featured = products.filter((product) => product.featured);
  if (featured.length === 0) return null;

  return (
    <section className="px-4 py-10 sm:px-6">
      <h2 className="mb-4 text-3xl font-extrabold uppercase tracking-tight text-foreground sm:text-4xl">
        Coups de Cœur
      </h2>
      <BentoGrid products={featured} />
    </section>
  );
}