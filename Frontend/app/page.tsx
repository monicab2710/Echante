
import ScrollUp from "@/components/Common/ScrollUp";
import { Quicksand } from "@next/font/google";

const quicksand = Quicksand({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Home  />
    </>
  );
}
