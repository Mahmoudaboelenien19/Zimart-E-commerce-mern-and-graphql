import React from "react";
import Rating from "./filter/Rating";
import Price from "./filter/Price";
import { AnimatePresence, motion } from "framer-motion";
import { categoriesArr, FeaturedProductsArr } from "@/assets/arries/arries";
import MobileCloseDropDown from "@/components/widgets/dropdowns/MobileCloseDropDown";
import useIsMobile from "@/custom/useIsMobile";
import { asideVariant } from "@/variants/globals";
import FilterSection from "./filter/FilterSection";
import useParams from "@/custom/useParams";
import ResetFiltersBtn from "./ResetFiltersBtn";
import AsideFilterHead from "./AsideFilterHead";

const Aside = () => {
  const {
    priceFilter,
    rateFilter,
    categoryFilter,
    featuredProductsFilter,

    deleteParam,
  } = useParams();
  const { isMobile } = useIsMobile();

  // const initialRender = useRef(true);
  // useEffect(() => {
  //   if (initialRender.current && isMobile) {
  //     initialRender.current = false;
  //     deleteParam("showAsideFilter");
  //   } else {
  //     initialRender.current = true;
  //   }
  // }, [isMobile]);

  const startFiltering = Boolean(
    priceFilter != "0" || rateFilter || categoryFilter || featuredProductsFilter
  );
  return (
    <motion.aside
      variants={asideVariant}
      initial="start"
      exit="exit"
      animate="end"
      key={"aside"}
      custom={{ bool: isMobile, w: 280 }}
      className="aside-products"
    >
      <AsideFilterHead startFiltering={startFiltering} />

      <FilterSection
        head="featured products"
        ar={FeaturedProductsArr}
        filter="featured products"
      />
      <FilterSection head="category" ar={categoriesArr} filter="category" />

      <Rating />
      <Price />
      <AnimatePresence>{startFiltering && <ResetFiltersBtn />}</AnimatePresence>
      <MobileCloseDropDown target={"showAsideFilter"} title="close" />
    </motion.aside>
  );
};

export default Aside;
