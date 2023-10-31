import { memo, useEffect } from "react";
import Footer from "../Footer/Footer";
import NewsLetter from "../NewsLetter/NewsLetter";
import Products from "../Product/Products/Products";
import StripeSuccess from "../payment/StripeSuccess";
import Banner from "./Banner";
import Transition from "../widgets/animation/transition/Transition";

export function Component() {
  useEffect(() => {
    document.title = "Zimart";
  }, []);

  return (
    <div>
      <Transition />
      <Home />
    </div>
  );
}

const Home = () => {
  return (
    <>
      <Banner />
      <Products />
      <StripeSuccess />
      <NewsLetter />
      <Footer />
    </>
  );
};

export default memo(Home);
