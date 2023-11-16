import Aside from "./Aside/Aside";
import { AnimatePresence } from "framer-motion";
import Sort from "../viewOptions/Sort";
import useHideScroll from "@/custom/helpers/useHideScroll";
import useParams from "@/custom/helpers/useParams";
import useApplyFilters from "@/custom/product/useApplyFilters";
import useIsMobile from "@/custom/helpers/useIsMobile";
import ProductList from "./ProductList/ProductList";
import HorizentalProducts from "./HorizentalProducts";
const Products = () => {
  console.log("products re-rendered");
  const { showAsideFilter } = useParams();
  const { isMobile } = useIsMobile();
  useHideScroll(Boolean(showAsideFilter), isMobile);
  useApplyFilters();
  return (
    <div id="products" className="products-par ">
      <HorizentalProducts />
      <Sort />
      <div className="products  ">
        <AnimatePresence mode="wait">
          {showAsideFilter && <Aside key="main-aside" />}
        </AnimatePresence>

        <ProductList />
      </div>
    </div>
  );
};

export default Products;
