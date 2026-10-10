"use client";
import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
export interface PriceChange {
dir?: "up" | "down" | "same" | string;
pct?: number;
}
export interface Product {
id?: number | string;
_id?: string;
slug?: string;
nameBn?: string;
today?: number;
unit?: string;
image?: string;
change?: PriceChange;
}

function toBengali(num: number | string): string {
const bn = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
return num.toString().replace(/\d/g, (d) => bn[parseInt(d)]);
}

export function MarqueeWrapper({ items = [] }: { items?: Product[] }) {
const safeItems = Array.isArray(items) ? items : [];

if (safeItems.length === 0) {
return null;
}

return (
<MarqueeText direction="right" duration={10}>
  {safeItems.map((item, index) => {
    const key = item?.id ?? item?._id ?? index;
    const productId = item?.slug || item?.id || item?._id;
    const dir = item?.change?.dir;
    const pct = item?.change?.pct;

    return (
      <span
        key={key}
        className="inline-flex items-center text-sm font-medium text-gray-800"
      >
        {/* Clickable Link wrapping the product info */}
        <Link
          href={`/product/${productId}`}
          className="inline-flex items-center hover:opacity-80 hover:underline transition-all cursor-pointer"
        >
          {item?.image && <span className="mr-1.5">{item.image}</span>}
          <span className="font-semibold">{item?.nameBn}</span>

          {item?.today !== undefined && (
            <span className="ml-1.5 font-bold text-[#0f8a42]">
              {toBengali(item.today)} টাকা/{item.unit === "kg" ? "কেজি" : item.unit || "কেজি"}
            </span>
          )}

          {dir && (
            <span
              className={`ml-2 inline-flex items-center text-xs font-semibold ${
                dir === "up"
                  ? "text-red-600"
                  : dir === "down"
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {dir === "up" && `▲ +${toBengali(pct ?? 0)}%`}
              {dir === "down" && `▼ -${toBengali(pct ?? 0)}%`}
              {dir === "same" && `● ০%`}
            </span>
          )}
        </Link>

        {/* Separator dot outside the link */}
        <span className="mx-4 text-xs text-gray-400">●</span>
      </span>
    );
  })}
</MarqueeText>
);
}