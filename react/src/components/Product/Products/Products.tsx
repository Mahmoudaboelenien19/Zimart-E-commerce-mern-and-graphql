import React, { useContext, useEffect } from "react";
import Aside from "./Aside/Aside";
import ProductList from "./AllProducts/ProductList";
import { AnimatePresence } from "framer-motion";
import Sort from "../viewOptions/Sort";

import MainProductAnimation from "./MainProductAnimation";
import useProductsSubscription from "@/custom/useProductsSubscription";
import { productListContext } from "@/context/FilterData";
import { useAppSelector } from "@/custom/reduxTypes";
import useHideScroll from "@/custom/useHideScroll";
import useParams from "@/custom/useParams";

const Products = () => {
  const { Allproducts } = useAppSelector((st) => st.Allproducts);

  const { showAsideFilter } = useParams();
  useProductsSubscription();
  const { setProducts } = useContext(productListContext);
  useEffect(() => {
    setProducts(Allproducts);
  }, []);

  useHideScroll(Boolean(showAsideFilter));
  return (
    <section id="products" className="products-par">
      <h1 className="sort-title header underline">Our Products</h1>
      <MainProductAnimation />
      <Sort />

      <div className="center row start between relative">
        <AnimatePresence mode="wait">
          {showAsideFilter && <Aside />}
        </AnimatePresence>

        <ProductList />
      </div>
    </section>
  );
};

export default Products;
