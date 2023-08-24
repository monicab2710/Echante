'use client'
import React, { FC } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import "../styles/src/input.css";
import { Providers } from "./providers";

const Layout: FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <html suppressHydrationWarning lang="en">
      <head />

      <body className="dark:bg-black">
        <Providers>
          <Header />
          
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
};

export default Layout;
