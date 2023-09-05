import { Providers } from "./providers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import "../styles/src/input.css";
import "../styles/globals.css"; 

import "animate.css";
import WOW from "wowjs"; 
import React from "react";

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    
    new WOW.WOW(
        {
            boxClass:     'wow',      // default
            animateClass: 'animated', // default
            offset:       0,          // default
            mobile:       true,       // default
            live:         true        // default
          }
    ).init();
  }, []);

  return (
    <Providers>
      <Header />
      <Component {...pageProps} />
      <Footer />
      <ScrollToTop />
    </Providers>
  );
}

export default MyApp;
