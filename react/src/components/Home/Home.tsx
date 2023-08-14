import React, { useEffect } from "react";
import Banner from "./Banner";
import Products from "../Product/Products/Products";
import StripeSuccess from "../payment/StripeSuccess";
import Footer from "../Footer/Footer";
import NewsLetter from "../NewsLetter/NewsLetter";
import Animation from "../widgets/Animation";
const Home = () => {
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
};

export default Home;
