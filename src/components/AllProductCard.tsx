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

export default async function AllProductCard() {
  const products = await getProducts();

  return (
  
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      {/* <div className="flex items-center gap-2 mb-4">
      
          <h2 className="text-3xl font-bold text-gray-900">সব পণ্য</h2>
          <br/>
        <p className="text-xl font-bold text-gray-900">মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
      </div> */}

     
      
          <h2 className="text-3xl font-bold text-gray-900">সব পণ্য</h2>
         <br/>
        <p className="text-xl font-bold text-gray-800">মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
   











      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, idx) => (
          <ProductCard key={product.id ?? idx} product={product} />
        ))}
      </div>
    </section>
  );
}