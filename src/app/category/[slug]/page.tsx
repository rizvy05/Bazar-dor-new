"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";

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
  change?: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

function toBengali(num: number | string): string {
  const bn = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/\d/g, (d) => bn[parseInt(d)]);
}

export default function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const [products, setProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("default");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/bazardor/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        const filtered = data.filter((p) => p.category === slug);
        setProducts(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, [slug]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "low-to-high") return a.today - b.today;
    if (sortOrder === "high-to-low") return b.today - a.today;
    return 0;
  });

  const headerName = products[0]?.categoryNameBn || slug;
  const headerIcon = products[0]?.categoryIcon || "🍚";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f7f5] flex items-center justify-center">
        <p className="text-gray-500 text-sm font-medium">লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7f5] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Banner */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl shrink-0">
            {headerIcon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {headerName}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {toBengali(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="bg-white rounded-2xl px-6 py-4 border border-gray-100 shadow-sm flex items-center justify-end gap-3 text-sm">
          <span className="text-gray-600 font-medium">সাজান</span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg px-3 py-1.5 outline-none focus:border-[#0f8a42] cursor-pointer"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">দাম: কম থেকে বেশি</option>
            <option value="high-to-low">দাম: বেশি থেকে কম</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sortedProducts.map((item) => {
            const isUp = item.change?.dir === "up";
            const isDown = item.change?.dir === "down";

            return (
              <Link
                key={item.id}
                href={`/product/${item.slug || item.id}`}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                    {item.image || "🍚"}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-800 group-hover:text-[#0f8a42] transition-colors">
                      {item.nameBn}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      প্রতি {item.unit === "kg" ? "কেজি" : item.unit}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <span className="text-[11px] text-gray-400 block mb-0.5">
                      আজকের দাম
                    </span>
                    <span className="text-xl font-extrabold text-gray-800">
                      {toBengali(item.today)}
                    </span>{" "}
                    <span className="text-xs font-semibold text-gray-700">
                      টাকা
                    </span>
                  </div>

                  <div
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${
                      isUp
                        ? "bg-red-50 text-red-600"
                        : isDown
                        ? "bg-green-50 text-green-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {isUp ? "▲" : isDown ? "▼" : "—"}
                    <span>{toBengali(item.change?.pct ?? 0)}%</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}

// "use client";

// import { use, useEffect, useState } from "react";

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

// function toBengali(num: number | string): string {
//   const bn = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
//   return num.toString().replace(/\d/g, (d) => bn[parseInt(d)]);
// }

// export default function CategoryDetailPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = use(params);

//   const [products, setProducts] = useState<Product[]>([]);
//   const [sortOrder, setSortOrder] = useState<string>("default");
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     fetch("https://api.abcz.workers.dev/api/bazardor/products")
//       .then((res) => res.json())
//       .then((data: Product[]) => {
//         const filtered = data.filter((p) => p.category === slug);
//         setProducts(filtered);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching products:", err);
//         setLoading(false);
//       });
//   }, [slug]);

//   const sortedProducts = [...products].sort((a, b) => {
//     if (sortOrder === "low-to-high") return a.today - b.today;
//     if (sortOrder === "high-to-low") return b.today - a.today;
//     return 0;
//   });

//   const headerName = products[0]?.categoryNameBn || slug;
//   const headerIcon = products[0]?.categoryIcon || "🍚";

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#f5f7f5] flex items-center justify-center">
//         <p className="text-gray-500 text-sm font-medium">লোড হচ্ছে...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f5f7f5] py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto space-y-6">
        
//         {/* Banner */}
//         <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
//           <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl shrink-0">
//             {headerIcon}
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">
//               {headerName}
//             </h1>
//             <p className="text-xs text-gray-500 mt-1">
//               {toBengali(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
//             </p>
//           </div>
//         </div>

//         {/* Sort Controls */}
//         <div className="bg-white rounded-2xl px-6 py-4 border border-gray-100 shadow-sm flex items-center justify-end gap-3 text-sm">
//           <span className="text-gray-600 font-medium">সাজান</span>
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}
//             className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg px-3 py-1.5 outline-none focus:border-[#0f8a42] cursor-pointer"
//           >
//             <option value="default">ডিফল্ট</option>
//             <option value="low-to-high">দাম: কম থেকে বেশি</option>
//             <option value="high-to-low">দাম: বেশি থেকে কম</option>
//           </select>
//         </div>

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {sortedProducts.map((item) => {
//             const isUp = item.change?.dir === "up";
//             const isDown = item.change?.dir === "down";

//             return (
//               <div
//                 key={item.id}
//                 className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between"
//               >
//                 <div className="flex items-start gap-3">
//                   <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl shrink-0">
//                     {item.image || "🍚"}
//                   </div>
//                   <div>
//                     <h3 className="text-base font-bold text-gray-800">
//                       {item.nameBn}
//                     </h3>
//                     <p className="text-xs text-gray-400 mt-0.5">
//                       প্রতি {item.unit === "kg" ? "কেজি" : item.unit}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-6 flex items-end justify-between">
//                   <div>
//                     <span className="text-[11px] text-gray-400 block mb-0.5">
//                       আজকের দাম
//                     </span>
//                     <span className="text-xl font-extrabold text-gray-800">
//                       {toBengali(item.today)}
//                     </span>{" "}
//                     <span className="text-xs font-semibold text-gray-700">
//                       টাকা
//                     </span>
//                   </div>

//                   <div
//                     className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${
//                       isUp
//                         ? "bg-red-50 text-red-600"
//                         : isDown
//                         ? "bg-green-50 text-green-600"
//                         : "bg-gray-100 text-gray-600"
//                     }`}
//                   >
//                     {isUp ? "▲" : isDown ? "▼" : "—"}
//                     <span>{toBengali(item.change?.pct ?? 0)}%</span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//       </div>
//     </div>
//   );
// }