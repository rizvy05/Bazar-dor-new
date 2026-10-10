
import Image from "next/image";
import Link from "next/link";


export default async function Navbar() {
  "use cache";
  
  const dateStr = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="w-full bg-[#f8f9fa] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
       
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-[#0f8a42] p-2.5 rounded-2xl flex items-center justify-center shadow-sm">
              <Image
                className="w-10 h-10 object-contain"
                height={40}
                width={40}
                src="/logo-icon.png"
                alt="Bazar-dor"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-gray-700 leading-snug">
                বাজার দর
              </h1>
              <span className="text-xs text-gray-500 font-medium">{dateStr}</span>
            </div>
          </Link>
        </div>

     
        <div className="flex items-center gap-6">
          <Link
            href="/signin"
            className="text-gray-900 font-semibold text-sm hover:text-[#0f8a42] transition-colors"
          >
            সাইন ইন
          </Link>
          <Link
            href="/signup"
            className="bg-[#0f8a42] hover:bg-[#0c7236] text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-green-700/20 transition-all active:scale-95"
          >
            সাইন আপ
          </Link>
        </div>
      </div>

    </header>
  );
}