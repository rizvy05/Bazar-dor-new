
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import PriceDownSection from "@/components/PriceDownSection";
import PriceUpSection from "@/components/PriceUpSection";
import AllProductCard from "@/components/AllProductCard";
export default function Home() {
  return (
    <div>
      <Marquee />
      <Hero />
      <PriceUpSection />
      <PriceDownSection />
      <AllProductCard/>
    </div>
  );
}