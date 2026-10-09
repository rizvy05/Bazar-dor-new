"use client";

import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

export interface PriceChange {
  dir?: "up" | "down" | "same" | string;
  pct?: number;
}

export interface Product {
  id?: number | string;
  _id?: string;
  nameBn?: string;
  today?: number;
  unit?: string;
  image?: string;
  change?: PriceChange;
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
        const dir = item?.change?.dir;
        const pct = item?.change?.pct;

        return (
          <span
            key={key}
            className="inline-flex items-center text-sm font-medium text-gray-800"
          >
            {item?.image && <span className="mr-1.5">{item.image}</span>}
            <span>{item?.nameBn}</span>

            {item?.today !== undefined && (
              <span className="ml-1.5 font-bold text-[#0f8a42]">
                ৳{item.today} টাকা/{item.unit || "কেজি"}
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
                {dir === "up" && `▲ +${pct}%`}
                {dir === "down" && `▼ -${pct}%`}
                {dir === "same" && `● 0%`}
              </span>
            )}

            <span className="mx-4 text-xs text-gray-400">●</span>
          </span>
        );
      })}
    </MarqueeText>
  );
}