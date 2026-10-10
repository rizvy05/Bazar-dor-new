import Link from "next/link";

export interface Product {
id?: number | string;
slug?: string;
nameBn: string;
unit: string;
image?: string;
today: number;
change: {
dir: "up" | "down" | "same" | string;
pct: number;
};
}
function toBengaliNumeral(num: number): string {
const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
return num
.toString()
.replace(/\d/g, (digit) => bnDigits[parseInt(digit, 10)]);
}

export function ProductCard({ product }: { product: Product }) {
const isUp = product.change?.dir === "up";
// Fall back to slug if id is missing, or vice-versa
const productId = product.slug || product.id;

return (
<Link href={`/product/${productId}`} className="block group">
  <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl text-2xl group-hover:scale-105 transition-transform">
        {product.image || "📦"}
      </div>
      <div>
        <h3 className="font-bold text-gray-900 text-base group-hover:text-[#0f8a42] transition-colors">
          {product.nameBn}
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">
          প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
        </p>
        <div className="mt-2 text-xs text-gray-400">আজকের দাম</div>
        <div className="text-lg font-bold text-gray-900">
          {toBengaliNumeral(product.today)} টাকা
        </div>
      </div>
    </div>

    <div className="self-end mb-1">
      <span
        className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
          isUp ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
        }`}
      >
        {isUp
          ? `▲ ${toBengaliNumeral(product.change?.pct ?? 0)}%`
          : `▼ ${toBengaliNumeral(product.change?.pct ?? 0)}%`}
      </span>
    </div>
  </div>
</Link>
);
}