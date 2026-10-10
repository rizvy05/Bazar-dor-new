
import Link from "next/link";
interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
  avg?: number;
}

interface Product {
  id: number | string;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  unit: string;
  image?: string;
  today: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  change?: {
    dir: "up" | "down" | "flat";
    pct: number;
    amount?: number;
  };
  markets?: Market[];
}

function toBengali(num: number | string): string {
  const bn = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/\d/g, (d) => bn[parseInt(d)]);
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ productsId: string }>;
}) {
  const { productsId } = await params;

  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
  const json = await res.json();
  const allProducts: Product[] = Array.isArray(json) ? json : json?.data || [];

  const product = allProducts.find(
    (p) => String(p.slug) === String(productsId) || String(p.id) === String(productsId)
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f5f7f5] flex items-center justify-center">
        <p className="text-gray-500 font-medium">কোনো পণ্য পাওয়া যায়নি।</p>
      </div>
    );
  }

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  // Calculate min, max, and avg from markets if available
  const markets = product.markets || [];
  const minPrice = markets.length > 0 ? Math.min(...markets.map((m) => m.min)) : product.today;
  const maxPrice = markets.length > 0 ? Math.max(...markets.map((m) => m.max)) : product.today;
  const avgPrice = markets.length > 0 
    ? Math.round(markets.reduce((acc, m) => acc + (m.avg || (m.min + m.max) / 2), 0) / markets.length) 
    : product.today;

  const changeAmount = product.change?.amount || 2;
  const changeText = isUp 
    ? `গতকালের তুলনায় আজ দাম বেড়েছে ${toBengali(changeAmount)} টাকা`
    : isDown 
    ? `গতকালের তুলনায় আজ দাম কমেছে ${toBengali(changeAmount)} টাকা`
    : `গতকালের তুলনায় আজ দাম অপরিবর্তিত আছে`;

  return (
    <div className="min-h-screen bg-[#f5f7f5] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="text-xs text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#0f8a42]">হোম</Link>
          <span>/</span>
          <Link href={`/category/${product.category}`} className="hover:text-[#0f8a42]">
            {product.categoryNameBn || product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{product.nameBn}</span>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl shrink-0">
              {product.image || product.categoryIcon || "🍚"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{product.nameBn}</h1>
              <p className="text-xs text-gray-400 mt-1">
                প্রতি {product.unit === "kg" ? "কেজি" : product.unit} · {product.categoryNameBn || product.category}
              </p>
              <p className="text-xs text-gray-500 mt-1 font-medium">
                {changeText}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 text-right min-w-40">
            <span className="text-[11px] text-gray-400 block mb-1">আজকের দাম</span>
            <span className="text-2xl font-extrabold text-gray-800">
              {toBengali(product.today)}
            </span>
            <span className="text-xs font-semibold text-gray-600 ml-1">টাকা / {product.unit}</span>
            <div className={`mt-1 text-xs font-semibold flex items-center justify-end gap-1 ${isUp ? "text-red-600" : isDown ? "text-green-600" : "text-gray-600"}`}>
              <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
              <span>{toBengali(product.change?.pct ?? 0)}%</span>
            </div>
          </div>
        </div>

   
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-800">দামের সারসংক্ষেপ</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  
            <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
              <span className="text-xs text-gray-400 block">সর্বনিম্ন দাম</span>
              <span className="text-xl font-extrabold text-[#0f8a42] mt-1 block">
                {toBengali(minPrice)} টাকা
              </span>
              <span className="text-[11px] text-gray-400 mt-1 block">সবচেয়ে কম দামের বাজার</span>
            </div>

            {/* Max Price Card */}
            <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
              <span className="text-xs text-gray-400 block">সর্বাধিক দাম</span>
              <span className="text-xl font-extrabold text-red-600 mt-1 block">
                {toBengali(maxPrice)} টাকা
              </span>
              <span className="text-[11px] text-gray-400 mt-1 block">সবচেয়ে বেশি দামের বাজার</span>
            </div>

            <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
              <span className="text-xs text-gray-400 block">গড় দাম</span>
              <span className="text-xl font-extrabold text-gray-800 mt-1 block">
                {toBengali(avgPrice)} টাকা
              </span>
              <span className="text-[11px] text-gray-400 mt-1 block">প্রতি {product.unit} এর হিসাবে</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-800">বাজারভিত্তিক আজকের দাম</h2>

          {product.markets && product.markets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-xs text-gray-400">
                    <th className="py-3 font-medium">বাজার</th>
                    <th className="py-3 font-medium">বিভাগ</th>
                    <th className="py-3 font-medium">সর্বনিম্ন</th>
                    <th className="py-3 font-medium">সর্বাধিক</th>
                    <th className="py-3 font-medium">গড়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {product.markets.map((m, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 font-semibold text-gray-800">{m.market}</td>
                      <td className="py-3 text-gray-600">{m.division}</td>
                      <td className="py-3 text-gray-700">{toBengali(m.min)} টাকা</td>
                      <td className="py-3 text-gray-700">{toBengali(m.max)} টাকা</td>
                      <td className="py-3 font-bold text-gray-800">{toBengali(m.avg || Math.round((m.min + m.max) / 2))} টাকা</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-xs text-gray-400 py-4">এই পণ্যের বাজারভিত্তিক ডাটা উপলব্ধ নেই।</p>
          )}
        </div>

      </div>
    </div>
  );
}
