import React from "react";
import Aside from "./Aside/Aside";
import ProductList from "./AllProducts/ProductList";
import { AnimatePresence, motion } from "framer-motion";
import Sort from "../viewOptions/Sort";
import MainProductAnimation from "./MainProductAnimation";
import useProductsSubscription from "@/custom/useProductsSubscription";
import useHideScroll from "@/custom/useHideScroll";
import useParams from "@/custom/useParams";
import { LazyLoadComponent } from "react-lazy-load-image-component";

const Products = () => {
  const { showAsideFilter } = useParams();
  useProductsSubscription();

  useHideScroll(Boolean(showAsideFilter));
  return (
    <section id="products" className="products-par">
      <motion.h1
        className="sort-title header underline"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 0.2, 0.4, 0.6, 1] }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        Top Products
      </motion.h1>

      <MainProductAnimation />
      <Sort />

      <div className="center row start between relative">
        <AnimatePresence mode="wait">
          {showAsideFilter && <Aside />}
        </AnimatePresence>
        <AnimatePresence initial={false}>
          <LazyLoadComponent>
            <ProductList />
          </LazyLoadComponent>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Products;
