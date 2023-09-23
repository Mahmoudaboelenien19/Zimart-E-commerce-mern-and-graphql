import React, { useEffect } from "react";
import Footer from "../Footer/Footer";
import NewsLetter from "../NewsLetter/NewsLetter";
import Products from "../Product/Products/Products";
import StripeSuccess from "../payment/StripeSuccess";
import Banner from "./Banner";
import Animation from "../widgets/animation/Animation";

export function Component() {
  useEffect(() => {
    document.title = "Zimart";
  }, []);

  return (
    <Animation>
      <Banner />
      <Products />
      <StripeSuccess />

      <NewsLetter />
      <Footer />
    </Animation>
  );
}
