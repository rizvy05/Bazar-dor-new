import Image from "next/image";
import Link from "next/link";
import CurrentDate from "./CurrentDate";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <div className="bg-[#f4f7f4] border border-gray-100 rounded-3xl p-6 md:p-10 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
     
        <div className="flex-1 space-y-4">
       
          <div className="inline-block bg-[#e2eee4] text-[#0f8a42] text-xs font-semibold px-3 py-1.5 rounded-full">
            <CurrentDate />
          </div>

        
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>

         
          <div className="pt-2">
            <Link
              href="/products"
              className="inline-block bg-[#0f8a42] hover:bg-[#0c7236] text-white font-medium px-6 py-3 rounded-xl shadow-sm transition-colors active:scale-95 text-sm md:text-base"
            >
              সব পণ্য দেখুন
            </Link>
          </div>
        </div>

      
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <Image
              src="/bazar-hero.png" 
              alt="Bazar-logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;