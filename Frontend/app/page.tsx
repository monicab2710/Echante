
import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero/HeroSectionOne";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
    </>
  );
}
