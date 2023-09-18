import React, { useEffect } from "react";
import Footer from "../Footer/Footer";
import NewsLetter from "../NewsLetter/NewsLetter";
import Products from "../Product/Products/Products";
import StripeSuccess from "../payment/StripeSuccess";
import Banner from "./Banner";
import Animation from "../widgets/animation/Animation";

const Home = () => {
  useEffect(() => {
    document.title = "Zimart";
    window.scrollTo(0, 0);
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
};

export default Home;
