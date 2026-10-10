import Link from "next/link";

interface Category {
id: string;
slug: string;
nameBn: string;
icon: string;
}

const ProductLink = async () => {
"use cache";

const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories");
const data = await res.json();

const nav: Category[] = Array.isArray(data) ? data : data?.data || [];

return (
<nav className="bg-gray-200 border-t border-gray-100 py-3">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-6 overflow-x-auto scrollbar-none">
    {nav.map((item, index) => (
      <Link
        key={item.id || index}
        href={`/category/${item.slug}`} 
        className="flex items-center gap-2 text-gray-700 font-medium text-sm hover:text-[#0f8a42] transition-colors whitespace-nowrap"
      >
        {item.icon && <span className="text-base">{item.icon}</span>}
        <span>{item.nameBn}</span>
      </Link>
    ))}
  </div>
</nav>
);
};

export default ProductLink;