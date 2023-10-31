import Rating from "./filter/Rating";
import Price from "./filter/Price";
import { AnimatePresence, motion } from "framer-motion";
import { categoriesArr, FeaturedProductsArr } from "@/assets/arries/arries";
import MobileCloseDropDown from "@/components/widgets/dropdowns/MobileCloseDropDown";
import useIsMobile from "@/custom/useIsMobile";
import { asideVariant } from "@/lib/variants/globals";
import FilterSection from "./filter/FilterSection";
import useParams from "@/custom/useParams";
import ResetFiltersBtn from "./ResetFiltersBtn";
import AsideFilterHead from "./AsideFilterHead";
import "./filter-aside.scss";
const Aside = () => {
  const { priceFilter, rateFilter, categoryFilter, featuredProductsFilter } =
    useParams();
  const { isMobile } = useIsMobile();

  const startFiltering = Boolean(
    priceFilter != "0" || rateFilter || categoryFilter || featuredProductsFilter
  );

  return (
    // <AnimatePresence initial={false}>
    <motion.aside
      variants={asideVariant}
      initial="start"
      animate="end"
      exit="exit"
      custom={{ bool: isMobile, w: 280 }}
      className={"aside-products  main-txt"}
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
    // </AnimatePresence>
  );
};

export default Aside;
