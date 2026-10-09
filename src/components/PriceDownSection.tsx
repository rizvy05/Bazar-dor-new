
import { ProductCard, Product } from "./ProductCard";

async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return [];

  const data = await res.json().catch(() => null);
  return Array.isArray(data) ? data : data?.data || [];
}

export default async function PriceDownSection() {
  const products = await getProducts();
  const priceDecreased = products
    .filter((p) => p.change?.dir === "down")
    .slice(0, 6); // Limits the array to the first 6 items

  if (priceDecreased.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-emerald-600 text-xs">▼</span>
        <h2 className="text-xl font-bold text-gray-900">আজ দাম কমেছে</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {priceDecreased.map((product, idx) => (
          <ProductCard key={product.id ?? idx} product={product} />
        ))}
      </div>
    </section>
  );
}