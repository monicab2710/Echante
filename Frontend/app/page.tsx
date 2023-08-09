
import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero/HeroSectionOne";
import { Quicksand } from "@next/font/google";

const quicksand = Quicksand({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
    </>
  );
}
