import { Fragment, memo } from "react";
import Footer from "../Footer/Footer";
import NewsLetter from "../NewsLetter/NewsLetter";
import Products from "../Product/Products/Products";
import StripeSuccess from "../payment/StripeSuccess";
import Banner from "./Banner";
import Transition from "../widgets/animation/transition/Transition";
import useTitle from "@/custom/useTitle";

export function Component() {
  useTitle("Zimart");
  return (
    <div>
      <Transition />
      <Home />
    </div>
  );
}

const Home = () => {
  return (
    <Fragment>
      <Banner />
      <Products />
      <StripeSuccess />
      <NewsLetter />
      <Footer />
    </Fragment>
  );
};

export default memo(Home);
