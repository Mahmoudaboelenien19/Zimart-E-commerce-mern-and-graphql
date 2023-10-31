import { createContext } from "react";
import Aside from "./Aside/Aside";
import ProductList from "./AllProducts/ProductList";
import { AnimatePresence, motion } from "framer-motion";
import Sort from "../viewOptions/Sort";
import MainProductAnimation from "./MainProductAnimation";
import useHideScroll from "@/custom/useHideScroll";
import useParams from "@/custom/useParams";
import useApplyFilters from "@/custom/useApplyFilters";
import useIsMobile from "@/custom/useIsMobile";
type AsideContext = {
  loading: boolean;
  handleClickFIlter: () => void;
};
export const asideContext = createContext({} as AsideContext);

const Products = () => {
  const { showAsideFilter } = useParams();
  const { isMobile } = useIsMobile();
  useHideScroll(Boolean(showAsideFilter), isMobile);
  const { loading, handleClickFIlter } = useApplyFilters();
  return (
    <asideContext.Provider value={{ loading, handleClickFIlter }}>
      <div id="products" className="products-par">
        <motion.h1 className="sort-title header underline">
          Top Products
        </motion.h1>
        <MainProductAnimation />
        <Sort />

        <div className="products  ">
          <AnimatePresence mode="wait">
            {showAsideFilter && <Aside key="main-aside" />}
          </AnimatePresence>
          <AnimatePresence initial={false}>
            <ProductList />
          </AnimatePresence>
        </div>
      </div>
    </asideContext.Provider>
  );
};

export default Products;
