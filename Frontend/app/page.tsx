
import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";
import { Inter } from "@next/font/google";
import React from "react";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
    </>
  );
}
