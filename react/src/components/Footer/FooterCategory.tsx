import { Link } from "react-scroll";
import InViewAnimation from "../widgets/animation/InViewAnimation";
import { categoriesArr } from "@/assets/arries/arries";
import useFilterByCategory from "@/custom/product/useFilterByCategory";
import Header from "../widgets/shared/Header";
const FooterCategory = () => {
  const { handleCategoryFiltering } = useFilterByCategory();

  return (
    <InViewAnimation once className="footer-links center col start">
      <Header head="category" />
      {categoriesArr.map((link, i) => {
        return (
          <Link
            key={i}
            to="products"
            style={{ cursor: "pointer" }}
            smooth
            onClick={() => {
              handleCategoryFiltering(link);
            }}
          >
            {link}
          </Link>
        );
      })}
    </InViewAnimation>
  );
};

export default FooterCategory;
