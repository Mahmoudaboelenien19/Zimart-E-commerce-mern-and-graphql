import Aside from "./Aside/Aside";
import { AnimatePresence } from "framer-motion";
import Sort from "../viewOptions/Sort";
import useParams from "@/custom/helpers/useParams";
import useApplyFilters from "@/custom/product/useApplyFilters";
import ProductList from "./ProductList/ProductList";
import HorizentalProducts from "./HorizentalProducts";
const Products = () => {
  const { showAsideFilter } = useParams();

  useApplyFilters();
  return (
    <div id="products" className="products-par ">
      <HorizentalProducts />
      <Sort />
      <div className="products  ">
        <AnimatePresence mode="wait" initial={false}>
          {showAsideFilter && <Aside key="main-aside" />}
        </AnimatePresence>

        <ProductList />
      </div>
    </div>
  );
};

export default Products;
