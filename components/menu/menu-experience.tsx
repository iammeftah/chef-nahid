import { products, categories } from "@/data/products";
import { HeroSection } from "./hero-section";
import { CategorySection } from "./category-section";
import { FooterSection } from "./footer-section";

export function MenuExperience() {
  const featured = products.filter((product) => product.featured);

  return (
    <div className="mx-auto flex max-w-2xl flex-col">
      <HeroSection featured={featured} />
      {categories.map((category) => (
        <CategorySection
          key={category}
          category={category}
          products={products.filter((product) => product.category === category)}
        />
      ))}
      <FooterSection />
    </div>
  );
}