
import ScrollUp from "@/components/Common/ScrollUp";
import HeroProducts from "@/components/Hero/HeroSectionProducts";
import HeroCategories from "@/components/Hero/HeroSectionCategories"
import { Quicksand } from "@next/font/google";

const quicksand = Quicksand({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <ScrollUp />
      <HeroCategories />
      <HeroProducts />
    </>
  );
}
