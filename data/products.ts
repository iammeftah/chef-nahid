// data/products.ts
//
// Auto-generated from the "Chef Nahid" PDF menu (burger / pasticcio / sandwich /
// pizza / panini / tacos / salade / frites / jus / crêpe / gaufre / pancake),
// plus a hand-added Boissons split and an Extra (add-ons) category.
//
// `image` points to a transparent-background PNG cutout, under
// /public/images/<category>/<slug>.png. Placeholders are used where no
// dedicated photo has been extracted yet — swap those in later.
//
// `ingredients` is a short list shown to customers so they know what's in
// each item. Branded canned drinks (Boissons) skip it since there's nothing
// to disclose beyond the brand itself.

export type ProductCategory =
  | "Burger"
  | "Pasticcio"
  | "Sandwich"
  | "Plat"
  | "Pizza"
  | "Panini"
  | "Tacos"
  | "Salade"
  | "Frites"
  | "Jus"
  | "Boissons"
  | "Crêpe"
  | "Gaufre"
  | "Pancake"
  | "Extra";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number; // in DH (Moroccan Dirham)
  currency: "DH";
  image: string;
  /** Shown in the "Nos coups de cœur" bento section / hero carousel. */
  featured?: boolean;
  /** Short ingredient list, shown to customers on the product card/carousel. */
  ingredients?: string[];
  /**
   * Manual zoom multiplier for the drink carousel (default 1). Source
   * photos aren't all cropped the same way — some cups fill their canvas,
   * others have more empty margin around them — so this lets you nudge an
   * individual image up or down until it visually matches its neighbors.
   * e.g. 0.9 to shrink a drink that looks too big, 1.1 to grow one that
   * looks too small.
   */
  imageScale?: number;
}

export const products: Product[] = [
  // 🍔 Burger
  { id: "cheese-burger", name: "Cheese Burger", category: "Burger", price: 35, currency: "DH", image: "/images/burger/cheese-burger.png", ingredients: ["Pain burger", "Steak haché", "Cheddar", "Salade", "Tomate", "Oignon", "Sauce burger"] },
  { id: "crispy-burger", name: "Crispy Burger", category: "Burger", price: 35, currency: "DH", image: "/images/burger/crispy-burger.png", ingredients: ["Pain burger", "Poulet crispy", "Salade", "Tomate", "Sauce fromagère"] },
  { id: "double-cheese-burger", name: "Double Cheese Burger", category: "Burger", price: 55, currency: "DH", image: "/images/burger/double-cheese-burger.png", featured: true, ingredients: ["Pain burger", "Double steak haché", "Double cheddar", "Salade", "Tomate", "Oignon", "Sauce burger"] },
  { id: "fish-burger", name: "Fish Burger", category: "Burger", price: 45, currency: "DH", image: "/images/burger/fish-burger.png", ingredients: ["Pain burger", "Filet de poisson pané", "Salade", "Sauce tartare", "Citron"] },

  // 🍲 Pasticcio
  { id: "pasticcio-poulet", name: "Pasticcio Poulet", category: "Pasticcio", price: 30, currency: "DH", image: "/images/pasticcio/pasticcio-poulet.png", ingredients: ["Pâte feuilletée", "Poulet effiloché", "Béchamel", "Fromage", "Épices"] },
  { id: "pasticcio-charcutrie", name: "Pasticcio Charcutrie", category: "Pasticcio", price: 30, currency: "DH", image: "/images/pasticcio/pasticcio-charcutrie.png", ingredients: ["Pâte feuilletée", "Charcuterie", "Béchamel", "Fromage"] },
  { id: "pasticcio-viande-hachee", name: "Pasticcio Viande Hachée", category: "Pasticcio", price: 35, currency: "DH", image: "/images/pasticcio/pasticcio-viande-hachee.png", ingredients: ["Pâte feuilletée", "Viande hachée", "Béchamel", "Fromage", "Oignon"] },
  { id: "pasticcio-mixte", name: "Pasticcio Mixte", category: "Pasticcio", price: 40, currency: "DH", image: "/images/pasticcio/pasticcio-mixte.png", ingredients: ["Pâte feuilletée", "Poulet", "Viande hachée", "Béchamel", "Fromage"] },

  // 🥖 Sandwich
  { id: "sandwich-sepia", name: "Sandwich Sepia", category: "Sandwich", price: 20, currency: "DH", image: "/images/sandwich/sandwich-sepia.png", ingredients: ["Pain", "Sépia panée", "Salade", "Tomate", "Sauce"] },
  { id: "sandwich-poulet-crispy", name: "Sandwich Poulet ou Crispy", category: "Sandwich", price: 20, currency: "DH", image: "/images/sandwich/sandwich-poulet-crispy.png", ingredients: ["Pain", "Poulet grillé ou crispy", "Salade", "Tomate", "Sauce"] },
  { id: "sandwich-viande-hachee", name: "Sandwich Viande Hachée", category: "Sandwich", price: 20, currency: "DH", image: "/images/sandwich/sandwich-viande-hachee.png", ingredients: ["Pain", "Viande hachée", "Salade", "Tomate", "Sauce"] },
  { id: "sandwich-mixte", name: "Sandwich Mixte", category: "Sandwich", price: 25, currency: "DH", image: "/images/sandwich/sandwich-mixte.png", ingredients: ["Pain", "Poulet", "Viande hachée", "Salade", "Tomate", "Sauce"] },
  { id: "bocadillos", name: "Bocadillos", category: "Sandwich", price: 15, currency: "DH", image: "/images/sandwich/bocadillos.png", ingredients: ["Pain bocadillo", "Charcuterie", "Fromage", "Salade"] },
  { id: "tortia", name: "Tortia", category: "Sandwich", price: 15, currency: "DH", image: "/images/sandwich/tortia.png", ingredients: ["Tortilla", "Poulet ou viande", "Salade", "Fromage", "Sauce"] },
  { id: "sandwich-thon", name: "Sandwich Thon", category: "Sandwich", price: 15, currency: "DH", image: "/images/sandwich/sandwich-thon.png", ingredients: ["Pain", "Thon", "Olives", "Tomate", "Oignon", "Mayonnaise"] },

  // 🍽️ Plat (Version Plat)
  { id: "plat-sepia", name: "Plat Sepia", category: "Plat", price: 30, currency: "DH", image: "/images/plat/plat-sepia.png", ingredients: ["Sépia panée", "Frites", "Salade", "Sauce"] },
  { id: "plat-poulet", name: "Plat Poulet", category: "Plat", price: 30, currency: "DH", image: "/images/plat/plat-poulet.png", ingredients: ["Poulet grillé", "Frites", "Salade", "Sauce"] },
  { id: "plat-viande-hachee", name: "Plat Viande Hachée", category: "Plat", price: 30, currency: "DH", image: "/images/plat/plat-viande-hachee.png", ingredients: ["Viande hachée", "Frites", "Salade", "Sauce"] },
  { id: "plat-mixte", name: "Plat Mixte", category: "Plat", price: 35, currency: "DH", image: "/images/plat/plat-mixte.png", ingredients: ["Poulet", "Viande hachée", "Frites", "Salade", "Sauce"] },

  // 🍕 Pizza
  { id: "pizza-poulet", name: "Poulet", category: "Pizza", price: 30, currency: "DH", image: "/images/pizza/pizza-poulet.png", ingredients: ["Pâte", "Sauce tomate", "Poulet", "Mozzarella", "Poivrons", "Olives"] },
  { id: "pizza-4-fromages", name: "4 Fromages", category: "Pizza", price: 35, currency: "DH", image: "/images/pizza/pizza-4-fromages.png", ingredients: ["Pâte", "Sauce tomate", "Mozzarella", "Gouda", "Emmental", "Chèvre"] },
  { id: "pizza-thon", name: "Pizza Thon", category: "Pizza", price: 30, currency: "DH", image: "/images/pizza/pizza-thon.png", ingredients: ["Pâte", "Sauce tomate", "Thon", "Mozzarella", "Thym", "Huile d'olive"] },
  { id: "pizza-fruit-de-mer", name: "Fruit de Mer", category: "Pizza", price: 35, currency: "DH", image: "/images/pizza/pizza-fruit-de-mer.png", featured: true, ingredients: ["Pâte", "Sauce tomate", "Crevettes", "Calamar", "Moules", "Mozzarella"] },
  { id: "pizza-margarita", name: "Margarita", category: "Pizza", price: 20, currency: "DH", image: "/images/pizza/pizza-margarita.png", ingredients: ["Pâte", "Sauce tomate", "Mozzarella", "Basilic", "Huile d'olive"] },
  { id: "pizza-4-saisons", name: "4 Saisons", category: "Pizza", price: 35, currency: "DH", image: "/images/pizza/pizza-4-saisons.png", ingredients: ["Pâte", "Sauce tomate", "Jambon", "Champignons", "Olives", "Poivrons", "Mozzarella"] },
  { id: "pizza-vegetarienne", name: "Végétarienne", category: "Pizza", price: 30, currency: "DH", image: "/images/pizza/pizza-vegetarienne.png", ingredients: ["Pâte", "Sauce tomate", "Poivrons", "Champignons", "Olives", "Oignons", "Mozzarella"] },
  { id: "pizza-le-chef", name: "Le Chef", category: "Pizza", price: 45, currency: "DH", image: "/images/pizza/pizza-le-chef.png", ingredients: ["Pâte", "Sauce tomate", "Poulet", "Viande hachée", "Merguez", "Poivrons", "Mozzarella"] },

  // 🥪 Panini
  { id: "panini-viande-hachee", name: "Viande Hachée", category: "Panini", price: 20, currency: "DH", image: "/images/panini/panini-viande-hachee.png", ingredients: ["Pain panini", "Viande hachée", "Fromage", "Sauce"] },
  { id: "panini-poulet", name: "Poulet", category: "Panini", price: 20, currency: "DH", image: "/images/panini/panini-poulet.png", ingredients: ["Pain panini", "Poulet", "Fromage", "Sauce"] },
  { id: "panini-charcuterie", name: "Charcuterie", category: "Panini", price: 20, currency: "DH", image: "/images/panini/panini-charcuterie.png", ingredients: ["Pain panini", "Charcuterie", "Fromage", "Sauce"] },
  { id: "panini-thon", name: "Thon", category: "Panini", price: 15, currency: "DH", image: "/images/panini/panini-thon.png", ingredients: ["Pain panini", "Thon", "Fromage", "Sauce"] },
  { id: "panini-mixte", name: "Mixte", category: "Panini", price: 25, currency: "DH", image: "/images/panini/panini-mixte.png", ingredients: ["Pain panini", "Poulet", "Viande hachée", "Fromage", "Sauce"] },
  { id: "panini-nuggetes", name: "Nuggetes", category: "Panini", price: 20, currency: "DH", image: "/images/panini/panini-nuggetes.png", ingredients: ["Pain panini", "Nuggets de poulet", "Fromage", "Sauce"] },

  // 🌯 Tacos
  { id: "tacos-sepia", name: "Sepia", category: "Tacos", price: 30, currency: "DH", image: "/images/tacos/tacos-sepia.png", ingredients: ["Galette", "Sépia panée", "Frites", "Fromage fondu", "Sauce"] },
  { id: "tacos-poulet", name: "Poulet", category: "Tacos", price: 30, currency: "DH", image: "/images/tacos/tacos-poulet.png", ingredients: ["Galette", "Poulet", "Frites", "Fromage fondu", "Sauce"] },
  { id: "tacos-crispy", name: "Crispy", category: "Tacos", price: 30, currency: "DH", image: "/images/tacos/tacos-crispy.png", ingredients: ["Galette", "Poulet crispy", "Frites", "Fromage fondu", "Sauce"] },
  { id: "tacos-viande-hachee", name: "Viande Hachée", category: "Tacos", price: 30, currency: "DH", image: "/images/tacos/tacos-viande-hachee.png", ingredients: ["Galette", "Viande hachée", "Frites", "Fromage fondu", "Sauce"] },
  { id: "tacos-mixte", name: "Mixte", category: "Tacos", price: 35, currency: "DH", image: "/images/tacos/tacos-mixte.png", ingredients: ["Galette", "Poulet", "Viande hachée", "Frites", "Fromage fondu", "Sauce"] },
  { id: "tacos-le-chef", name: "Le Chef", category: "Tacos", price: 45, currency: "DH", image: "/images/tacos/tacos-le-chef.png", featured: true, ingredients: ["Galette", "Poulet", "Viande hachée", "Merguez", "Frites", "Fromage fondu", "Sauce"] },

  // 🥗 Salade
  { id: "salade-marocaine", name: "Marocaine", category: "Salade", price: 17, currency: "DH", image: "/images/salade/salade-marocaine.png", ingredients: ["Tomate", "Concombre", "Oignon", "Poivron", "Persil", "Huile d'olive"] },
  { id: "salade-nicoise", name: "Niçoise", category: "Salade", price: 17, currency: "DH", image: "/images/salade/salade-nicoise.png", ingredients: ["Thon", "Œuf", "Olives", "Tomate", "Haricots verts", "Laitue"] },
  { id: "salade-cesar", name: "César", category: "Salade", price: 25, currency: "DH", image: "/images/salade/salade-cesar.png", ingredients: ["Poulet grillé", "Laitue", "Parmesan", "Croûtons", "Sauce César"] },
  { id: "salade-le-chef", name: "Le Chef", category: "Salade", price: 30, currency: "DH", image: "/images/salade/salade-le-chef.png", ingredients: ["Poulet", "Thon", "Œuf", "Tomate", "Olives", "Laitue"] },

  // 🍟 Frites
  { id: "frites-fromage", name: "Frites Fromage", category: "Frites", price: 12, currency: "DH", image: "/images/frites/frites-fromage.png", ingredients: ["Frites", "Fromage fondu"] },
  { id: "frites-crispy", name: "Frites Crispy", category: "Frites", price: 25, currency: "DH", image: "/images/frites/frites-crispy.png", ingredients: ["Frites", "Poulet crispy", "Fromage fondu"] },
  { id: "frites-dinde-fumees", name: "Frites Dinde Fumées", category: "Frites", price: 25, currency: "DH", image: "/images/frites/frites-dinde-fumees.png", ingredients: ["Frites", "Dinde fumée", "Fromage fondu"] },
  { id: "frites-mixte", name: "Frites Mixte", category: "Frites", price: 30, currency: "DH", image: "/images/frites/frites-mixte.png", ingredients: ["Frites", "Poulet", "Viande hachée", "Fromage fondu"] },
  { id: "frites-poulet", name: "Frites Poulet", category: "Frites", price: 25, currency: "DH", image: "/images/frites/frites-poulet.png", ingredients: ["Frites", "Poulet", "Fromage fondu"] },
  { id: "frites-viande-hachee", name: "Frites Viande Hachée", category: "Frites", price: 25, currency: "DH", image: "/images/frites/frites-viande-hachee.png", ingredients: ["Frites", "Viande hachée", "Fromage fondu"] },
  { id: "cornet-de-frites", name: "Cornet de Frites", category: "Frites", price: 7, currency: "DH", image: "/images/frites/cornet-de-frites.png", ingredients: ["Frites", "Sel"] },

  // 🥤 Jus
  { id: "jus-de-banane", name: "Jus de Banane", category: "Jus", price: 15, currency: "DH", image: "/images/jus/jus-de-banane.png", ingredients: ["Banane", "Lait", "Sucre"] },
  { id: "jus-de-pomme", name: "Jus de Pomme", category: "Jus", price: 15, currency: "DH", image: "/images/jus/jus-de-pomme.png", ingredients: ["Pomme fraîche"] },
  { id: "jus-d-orange", name: "Jus d'Orange", category: "Jus", price: 15, currency: "DH", image: "/images/jus/jus-d-orange.png", ingredients: ["Orange pressée"] },
  { id: "panachee-au-orange", name: "Panachée au Orange", category: "Jus", price: 15, currency: "DH", image: "/images/jus/panachee-au-orange.png", ingredients: ["Fruits mélangés", "Orange"] },
  { id: "panachee-au-lait", name: "Panachée au Lait", category: "Jus", price: 15, currency: "DH", image: "/images/jus/panachee-au-lait.png", ingredients: ["Fruits mélangés", "Lait"] },
  { id: "jus-de-papaye", name: "Jus de Papaye", category: "Jus", price: 15, currency: "DH", image: "/images/jus/jus-de-papaye.png", ingredients: ["Papaye", "Lait"] },
  { id: "mangue-orange", name: "Mangue Orange", category: "Jus", price: 15, currency: "DH", image: "/images/jus/mangue-orange.png", ingredients: ["Mangue", "Orange"] },
  { id: "jus-d-ananas", name: "Jus d'Ananas", category: "Jus", price: 17, currency: "DH", image: "/images/jus/jus-d-ananas.png", ingredients: ["Ananas frais"] },
  { id: "jus-de-fraise", name: "Jus de Fraise", category: "Jus", price: 15, currency: "DH", image: "/images/jus/jus-de-fraise.png", ingredients: ["Fraise", "Lait ou eau"] },
  { id: "jus-fruit-du-dragon", name: "Jus Fruit du Dragon", category: "Jus", price: 22, currency: "DH", image: "/images/jus/jus-fruit-du-dragon.png", imageScale: 0.88, ingredients: ["Fruit du dragon", "Eau"] },
  { id: "jus-de-kiwi", name: "Jus de Kiwi", category: "Jus", price: 15, currency: "DH", image: "/images/jus/jus-de-kiwi.png", ingredients: ["Kiwi frais"] },
  { id: "jus-mojito", name: "Jus Mojito", category: "Jus", price: 15, currency: "DH", image: "/images/jus/jus-mojito.png", ingredients: ["Citron vert", "Menthe", "Sucre", "Eau gazeuse"] },
  { id: "jus-d-avocat", name: "Jus d'Avocat", category: "Jus", price: 17, currency: "DH", image: "/images/jus/jus-d-avocat.png", ingredients: ["Avocat", "Lait", "Sucre"] },
  { id: "jus-d-avocat-fruits-secs", name: "Jus d'Avocat aux Fruits Secs", category: "Jus", price: 20, currency: "DH", image: "/images/jus/jus-d-avocat-fruits-secs.png", ingredients: ["Avocat", "Lait", "Fruits secs"] },
  { id: "jus-d-avocat-amandes", name: "Jus d'Avocat aux Amandes", category: "Jus", price: 20, currency: "DH", image: "/images/jus/jus-d-avocat-amandes.png", ingredients: ["Avocat", "Lait", "Amandes"] },
  { id: "jus-za3za3", name: "Jus Za3za3", category: "Jus", price: 35, currency: "DH", image: "/images/jus/jus-za3za3.png", featured: true, ingredients: ["Mélange de fruits secs", "Jus de fruits", "Spécialité maison"] },
  { id: "salade-de-fruits", name: "Salade de Fruits", category: "Jus", price: 17, currency: "DH", image: "/images/jus/salade-de-fruits.png", ingredients: ["Fruits frais de saison"] },

  // 🥤 Boissons
  { id: "coca-cola", name: "Coca Cola", category: "Boissons", price: 7, currency: "DH", image: "/images/boissons/boisson-coca-cola.png" },
  { id: "fanta", name: "Fanta", category: "Boissons", price: 7, currency: "DH", image: "/images/boissons/boisson-fanta.png" },
  { id: "hawai", name: "Hawai", category: "Boissons", price: 8, currency: "DH", image: "/images/boissons/boisson-hawai.png" },
  { id: "sprite", name: "Sprite", category: "Boissons", price: 7, currency: "DH", image: "/images/boissons/boisson-sprite.png" },

  // 🥞 Crêpe
  { id: "crepe-chocolat", name: "Crêpe Chocolat", category: "Crêpe", price: 26, currency: "DH", image: "/images/crepe/crepe-chocolat.png", ingredients: ["Pâte à crêpe", "Chocolat fondu"] },
  { id: "crepe-banane", name: "Crêpe Banane", category: "Crêpe", price: 30, currency: "DH", image: "/images/crepe/crepe-banane.png", ingredients: ["Pâte à crêpe", "Banane", "Chocolat ou miel"] },
  { id: "crepe-snickers", name: "Crêpe Snickers", category: "Crêpe", price: 35, currency: "DH", image: "/images/crepe/crepe-snickers.png", ingredients: ["Pâte à crêpe", "Snickers", "Chocolat fondu"] },
  { id: "crepe-kunafa", name: "Crêpe Kunafa", category: "Crêpe", price: 62, currency: "DH", image: "/images/crepe/crepe-kunafa.png", featured: true, ingredients: ["Pâte à crêpe", "Kunafa", "Fromage", "Sirop", "Pistache"] },
  { id: "crepe-fruits-secs", name: "Crêpe Fruits Secs", category: "Crêpe", price: 35, currency: "DH", image: "/images/crepe/crepe-fruits-secs.png", ingredients: ["Pâte à crêpe", "Miel", "Amandes", "Noisettes"] },
  { id: "crepe-mixte", name: "Crêpe Mixte", category: "Crêpe", price: 45, currency: "DH", image: "/images/crepe/crepe-mixte.png", ingredients: ["Pâte à crêpe", "Chocolat", "Fruits", "Fruits secs"] },
  { id: "crepe-milka", name: "Crêpe Milka", category: "Crêpe", price: 33, currency: "DH", image: "/images/crepe/crepe-milka.png", ingredients: ["Pâte à crêpe", "Chocolat Milka"] },
  { id: "crepe-kitkat", name: "Crêpe KitKat", category: "Crêpe", price: 35, currency: "DH", image: "/images/crepe/crepe-kitkat.png", ingredients: ["Pâte à crêpe", "KitKat", "Chocolat fondu"] },
  { id: "crepe-mars", name: "Crêpe Mars", category: "Crêpe", price: 35, currency: "DH", image: "/images/crepe/crepe-mars.png", ingredients: ["Pâte à crêpe", "Mars", "Chocolat fondu"] },
  { id: "crepe-oreo", name: "Crêpe Oreo", category: "Crêpe", price: 33, currency: "DH", image: "/images/crepe/crepe-oreo.png", ingredients: ["Pâte à crêpe", "Oreo", "Chocolat fondu"] },
  { id: "crepe-fruits", name: "Crêpe Fruits", category: "Crêpe", price: 35, currency: "DH", image: "/images/crepe/crepe-fruits.png", ingredients: ["Pâte à crêpe", "Fruits frais"] },
  { id: "crepe-amande", name: "Crêpe Amande", category: "Crêpe", price: 35, currency: "DH", image: "/images/crepe/crepe-amande.png", ingredients: ["Pâte à crêpe", "Pâte d'amande", "Miel"] },

  // 🧇 Gaufre
  { id: "gaufre-chocolat", name: "Gaufre Chocolat", category: "Gaufre", price: 26, currency: "DH", image: "/images/gaufre/gaufre-chocolat.png", ingredients: ["Pâte à gaufre", "Chocolat fondu"] },
  { id: "gaufre-banane", name: "Gaufre Banane", category: "Gaufre", price: 30, currency: "DH", image: "/images/gaufre/gaufre-banane.png", ingredients: ["Pâte à gaufre", "Banane", "Chocolat ou miel"] },
  { id: "gaufre-snickers", name: "Gaufre Snickers", category: "Gaufre", price: 35, currency: "DH", image: "/images/gaufre/gaufre-snickers.png", ingredients: ["Pâte à gaufre", "Snickers", "Chocolat fondu"] },
  { id: "gaufre-fruits-secs", name: "Gaufre Fruits Secs", category: "Gaufre", price: 35, currency: "DH", image: "/images/gaufre/gaufre-fruits-secs.png", ingredients: ["Pâte à gaufre", "Miel", "Amandes", "Noisettes"] },
  { id: "gaufre-mixte", name: "Gaufre Mixte", category: "Gaufre", price: 45, currency: "DH", image: "/images/gaufre/gaufre-mixte.png", featured: true, ingredients: ["Pâte à gaufre", "Chocolat", "Fruits", "Fruits secs"] },
  { id: "gaufre-milka", name: "Gaufre Milka", category: "Gaufre", price: 33, currency: "DH", image: "/images/gaufre/gaufre-milka.png", ingredients: ["Pâte à gaufre", "Chocolat Milka"] },
  { id: "gaufre-kitkat", name: "Gaufre KitKat", category: "Gaufre", price: 35, currency: "DH", image: "/images/gaufre/gaufre-kitkat.png", ingredients: ["Pâte à gaufre", "KitKat", "Chocolat fondu"] },
  { id: "gaufre-mars", name: "Gaufre Mars", category: "Gaufre", price: 35, currency: "DH", image: "/images/gaufre/gaufre-mars.png", ingredients: ["Pâte à gaufre", "Mars", "Chocolat fondu"] },
  { id: "gaufre-oreo", name: "Gaufre Oreo", category: "Gaufre", price: 33, currency: "DH", image: "/images/gaufre/gaufre-oreo.png", ingredients: ["Pâte à gaufre", "Oreo", "Chocolat fondu"] },
  { id: "gaufre-fruits", name: "Gaufre Fruits", category: "Gaufre", price: 35, currency: "DH", image: "/images/gaufre/gaufre-fruits.png", ingredients: ["Pâte à gaufre", "Fruits frais"] },
  { id: "gaufre-amande", name: "Gaufre Amande", category: "Gaufre", price: 35, currency: "DH", image: "/images/gaufre/gaufre-amande.png", ingredients: ["Pâte à gaufre", "Pâte d'amande", "Miel"] },
  { id: "gaufre-caramel", name: "Gaufre Caramel", category: "Gaufre", price: 30, currency: "DH", image: "/images/gaufre/gaufre-caramel.png", ingredients: ["Pâte à gaufre", "Caramel"] },

  // 🥞 Pancake
  { id: "pancake-chocolat", name: "Pancake Chocolat", category: "Pancake", price: 26, currency: "DH", image: "/images/pancake/pancake-chocolat.png", ingredients: ["Pâte à pancake", "Chocolat fondu"] },
  { id: "pancake-banane", name: "Pancake Banane", category: "Pancake", price: 30, currency: "DH", image: "/images/pancake/pancake-banane.png", ingredients: ["Pâte à pancake", "Banane", "Chocolat ou miel"] },
  { id: "pancake-snickers", name: "Pancake Snickers", category: "Pancake", price: 35, currency: "DH", image: "/images/pancake/pancake-snickers.png", ingredients: ["Pâte à pancake", "Snickers", "Chocolat fondu"] },
  { id: "pancake-fruits-secs", name: "Pancake Fruits Secs", category: "Pancake", price: 35, currency: "DH", image: "/images/pancake/pancake-fruits-secs.png", ingredients: ["Pâte à pancake", "Miel", "Amandes", "Noisettes"] },
  { id: "pancake-mixte", name: "Pancake Mixte", category: "Pancake", price: 45, currency: "DH", image: "/images/pancake/pancake-mixte.png", ingredients: ["Pâte à pancake", "Chocolat", "Fruits", "Fruits secs"] },
  { id: "pancake-amande", name: "Pancake Amande", category: "Pancake", price: 30, currency: "DH", image: "/images/pancake/pancake-amande.png", ingredients: ["Pâte à pancake", "Pâte d'amande", "Miel"] },
  { id: "pancake-milka", name: "Pancake Milka", category: "Pancake", price: 33, currency: "DH", image: "/images/pancake/pancake-milka.png", ingredients: ["Pâte à pancake", "Chocolat Milka"] },
  { id: "pancake-kitkat", name: "Pancake KitKat", category: "Pancake", price: 35, currency: "DH", image: "/images/pancake/pancake-kitkat.png", ingredients: ["Pâte à pancake", "KitKat", "Chocolat fondu"] },
  { id: "pancake-mars", name: "Pancake Mars", category: "Pancake", price: 35, currency: "DH", image: "/images/pancake/pancake-mars.png", ingredients: ["Pâte à pancake", "Mars", "Chocolat fondu"] },
  { id: "pancake-oreo", name: "Pancake Oreo", category: "Pancake", price: 33, currency: "DH", image: "/images/pancake/pancake-oreo.png", ingredients: ["Pâte à pancake", "Oreo", "Chocolat fondu"] },
  { id: "pancake-fruits", name: "Pancake Fruits", category: "Pancake", price: 35, currency: "DH", image: "/images/pancake/pancake-fruits.png", ingredients: ["Pâte à pancake", "Fruits frais"] },
  { id: "pancake-caramel", name: "Pancake Caramel", category: "Pancake", price: 35, currency: "DH", image: "/images/pancake/pancake-caramel.png", ingredients: ["Pâte à pancake", "Caramel"] },

  // ➕ Extra (add-ons)
  { id: "extra-viande-hachee", name: "Viande Hachée", category: "Extra", price: 10, currency: "DH", image: "/images/extra/extra-viande-hachee.png", ingredients: ["Viande hachée"] },
  { id: "extra-chicken", name: "Chicken", category: "Extra", price: 10, currency: "DH", image: "/images/extra/extra-chicken.png", ingredients: ["Poulet"] },
  { id: "extra-sepia", name: "Sepia", category: "Extra", price: 10, currency: "DH", image: "/images/extra/extra-sepia.png", ingredients: ["Sépia"] },
  { id: "extra-crevette", name: "Crevette", category: "Extra", price: 10, currency: "DH", image: "/images/extra/extra-crevette.png", ingredients: ["Crevette"] },
  { id: "extra-fromage", name: "Fromage", category: "Extra", price: 5, currency: "DH", image: "/images/extra/extra-fromage.png", ingredients: ["Fromage"] },
  { id: "extra-thon", name: "Thon", category: "Extra", price: 7, currency: "DH", image: "/images/extra/extra-thon.png", ingredients: ["Thon"] },
  { id: "extra-egg", name: "Egg", category: "Extra", price: 3, currency: "DH", image: "/images/extra/extra-egg.png", ingredients: ["Œuf"] },
  { id: "extra-lanchun", name: "Lanchun", category: "Extra", price: 5, currency: "DH", image: "/images/extra/extra-lanchun.png", ingredients: ["Lanchun"] },
];

export const categories: ProductCategory[] = [
  "Burger",
  "Pasticcio",
  "Sandwich",
  "Plat",
  "Pizza",
  "Panini",
  "Tacos",
  "Salade",
  "Frites",
  "Jus",
  "Boissons",
  "Crêpe",
  "Gaufre",
  "Pancake",
  "Extra",
];

// High-level nav groups used by the header's dropdown menu.
export type CategoryGroup = "Salé" | "Sucré" | "Boissons";

export const categoryGroups: Record<CategoryGroup, ProductCategory[]> = {
  "Salé": ["Burger", "Pasticcio", "Sandwich", "Plat", "Pizza", "Panini", "Tacos", "Salade", "Frites", "Extra"],
  "Sucré": ["Crêpe", "Gaufre", "Pancake"],
  "Boissons": ["Jus", "Boissons"],
};