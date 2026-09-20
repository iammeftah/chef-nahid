import { products, categories } from "@/data/products";
import { HeroSection } from "./hero-section";
import { CategorySection } from "./category-section";
import { FooterSection } from "./footer-section";
import { PageLoader } from "./page-loader";
import { SauceSection } from "./sauce-section";
import { QrDrawer } from "./qr-drawer";
import { FallingFries } from "./falling-fries";

export function MenuExperience() {
  const featured = products.filter((product) => product.featured);

  return (
    <div className="mx-auto flex flex-col">
      <PageLoader />
      <QrDrawer />
      <FallingFries />
      <HeroSection featured={featured} />
      <SauceSection />
      {categories.map((category) => (
        <CategorySection
          key={category}
          category={category}
          products={products.filter((product) => product.featured === undefined ? product.category === category : product.category === category)}
        />
      ))}
      <FooterSection />
    </div>
  );
}