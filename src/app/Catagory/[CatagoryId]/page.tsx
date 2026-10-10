import React from 'react';

const CatagoryDetails = () => {
  return (
    <div>
      
    </div>
  );
};

export default CatagoryDetails;












// import Link from "next/link";

// interface Product {
//   id: number | string;
//   slug: string;
//   nameBn: string;
//   category: string;
//   categoryNameBn?: string;
//   categoryIcon?: string;
//   unit: string;
//   image?: string;
//   today: number;
//   change?: {
//     dir: "up" | "down" | "flat";
//     pct: number;
//   };
// }

// function toBengaliNumerals(num: number | string): string {
//   const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
//   return num.toString().replace(/\d/g, (digit) => bnDigits[parseInt(digit)]);
// }

// interface PageProps {
//   params: Promise<{
//     slug: string;
//   }>;
// }

// export default async function CategoryDetail({ params }: PageProps) {
//   const resolvedParams = await params;
//   const slug = resolvedParams.slug;

//   console.log("👉 Current Route Slug:", slug);

//   let rawProducts: Product[] = [];

//   try {
//     const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products", {
//       cache: "no-store",
//     });
    
//     const json = await res.json();

//     // Safely extract products array no matter how the API structures it
//     if (Array.isArray(json)) {
//       rawProducts = json;
//     } else if (Array.isArray(json?.data)) {
//       rawProducts = json.data;
//     } else if (Array.isArray(json?.products)) {
//       rawProducts = json.products;
//     }

//     console.log("👉 Total Products Fetched:", rawProducts.length);
//   } catch (error) {
//     console.error("❌ Error fetching products:", error);
//   }

//   // Case-insensitive filtering
//   const products = rawProducts.filter(
//     (p) => String(p.category).toLowerCase().trim() === String(slug).toLowerCase().trim()
//   );

//   console.log(`👉 Products matching "${slug}":`, products.length);

//   const headerName = products[0]?.categoryNameBn || slug;
//   const headerIcon = products[0]?.categoryIcon || "🍚";

//   return (
//     <div className="min-h-screen bg-[#f5f7f5] py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto space-y-6">
        
//         {/* Banner */}
//         <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
//           <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl shrink-0">
//             {headerIcon}
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800 capitalize">
//               {headerName}
//             </h1>
//             <p className="text-xs text-gray-500 mt-1">
//               {toBengaliNumerals(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
//             </p>
//           </div>
//         </div>

//         {/* Product Cards Grid */}
//         {products.length === 0 ? (
//           <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
//             <p className="text-gray-500 text-base font-medium">
//               কোনো পণ্য পাওয়া যায়নি।
//             </p>
//             <p className="text-xs text-gray-400 mt-1">
//               (Check server terminal console for debug logs)
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {products.map((item) => {
//               const isUp = item.change?.dir === "up";
//               const isDown = item.change?.dir === "down";
//               const pct = item.change?.pct ?? 0;

//               return (
//                 <div
//                   key={item.id}
//                   className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between"
//                 >
//                   <div className="flex items-start gap-3">
//                     <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl shrink-0">
//                       {item.image || item.categoryIcon || "🍚"}
//                     </div>
//                     <div>
//                       <h3 className="text-base font-bold text-gray-800">
//                         {item.nameBn}
//                       </h3>
//                       <p className="text-xs text-gray-400 mt-0.5">
//                         প্রতি {item.unit === "kg" ? "কেজি" : item.unit}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="mt-6 flex items-end justify-between">
//                     <div>
//                       <span className="text-[11px] text-gray-400 block mb-0.5">
//                         আজকের দাম
//                       </span>
//                       <span className="text-xl font-extrabold text-gray-800">
//                         {toBengaliNumerals(item.today)}
//                       </span>{" "}
//                       <span className="text-xs font-semibold text-gray-700">
//                         টাকা
//                       </span>
//                     </div>

//                     <div
//                       className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${
//                         isUp
//                           ? "bg-red-50 text-red-600"
//                           : isDown
//                           ? "bg-green-50 text-green-600"
//                           : "bg-gray-100 text-gray-600"
//                       }`}
//                     >
//                       {isUp && "▲"}
//                       {isDown && "▼"}
//                       {!isUp && !isDown && "—"}
//                       <span>{toBengaliNumerals(pct.toFixed(1))}%</span>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }