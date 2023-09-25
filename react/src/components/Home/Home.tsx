import React, { useEffect } from "react";
import Footer from "../Footer/Footer";
import NewsLetter from "../NewsLetter/NewsLetter";
import Products from "../Product/Products/Products";
import StripeSuccess from "../payment/StripeSuccess";
import Banner from "./Banner";

export function Component() {
  useEffect(() => {
    document.title = "Zimart";
  }, []);

  return (
    <div>
      <Banner />
      <Products />
      <StripeSuccess />

      <NewsLetter />
      <Footer />
    </div>
  );
}
