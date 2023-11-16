import Footer from "../Footer/Footer";

import NewsLetter from "../NewsLetter/NewsLetter";
import Products from "../Product/Products/Products";
import StripeSuccess from "../payment/StripeSuccess";
import Banner from "./Banner";
import useTitle from "@/custom/helpers/useTitle";
import useParams from "@/custom/helpers/useParams";
import useHideScroll from "@/custom/helpers/useHideScroll";

export function Home() {
  const { getParam } = useParams();
  const isSuccess = getParam("success") || "";
  useTitle("Zimart");
  useHideScroll(Boolean(isSuccess));

  return (
    <>
      <Banner />

      <Products />

      {isSuccess && <StripeSuccess />}
      <NewsLetter />
      <Footer />
    </>
  );
}
