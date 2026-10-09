
import { MarqueeWrapper, Product } from "./MarqueeWrapper";

async function fetchHeadlines(): Promise<Product[]> {
  try {
    const res = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/products",
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch product data: Status ${res.status}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data?.data || [];
  } 
  
  catch (error) {
    console.error("Failed to fetch marquee items:", error);
    return [];
  }
}

const Marquee = async () => {
  "use cache";

  const headlines = await fetchHeadlines();

  if (headlines.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#0f8a42]/10 py-2 border-b border-gray-200 overflow-hidden">
      <MarqueeWrapper items={headlines} />
    </div>
  );
};

export default Marquee;