"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import "../styles/src/input.css";
import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero/Layout";





  

 

    

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className="dark:bg-black">
      
          <ScrollUp />
          <Header />
          {children}
          <Hero />
          <Footer />
          <ScrollToTop />
       
      </body>
    </html>
  );
}

