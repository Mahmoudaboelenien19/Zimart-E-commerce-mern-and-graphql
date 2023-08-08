import React, { useContext, useEffect, useState } from "react";
import Aside from "./Aside/Aside";
import ProductList from "./AllProducts/ProductList";
import { AnimatePresence } from "framer-motion";
import Sort from "../viewOptions/Sort";
import { productListContext } from "../../../context/FilterData";
import MainProductAnimation from "./MainProductAnimation";
import { useAppSelector } from "../../../custom/reduxTypes";
import useIsMobile from "../../../custom/useIsMobile";

const Products = () => {
  const { Allproducts } = useAppSelector((st) => st.Allproducts);
  const { isMobile } = useIsMobile();
  const {
    RateChecked,
    priceFilter,
    categoryFilter,
    productFeatured,
    showFilter,
    setProducts,
  } = useContext(productListContext);
  const [startFiltering, setStartFiltering] = useState(false);
  useEffect(() => {
    setProducts(Allproducts);
  }, []);
  useEffect(() => {
    if (isMobile && showFilter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [showFilter, isMobile]);
  useEffect(() => {
    if (
      RateChecked === "" &&
      priceFilter === 0 &&
      categoryFilter === "" &&
      productFeatured === ""
    ) {
      setStartFiltering(false);
    } else {
      setStartFiltering(true);
    }
  }, [RateChecked, priceFilter, categoryFilter, productFeatured]);

  return (
    <section id="products" className="products-par">
      <h1 className="sort-title header underline">Our Products</h1>
      <MainProductAnimation />
      <Sort />

      <div className="center row start between relative">
        <AnimatePresence mode="wait">
          {showFilter && <Aside startFiltering={startFiltering} />}
        </AnimatePresence>
        <ProductList />
      </div>
    </section>
  );
};

export default Products;
