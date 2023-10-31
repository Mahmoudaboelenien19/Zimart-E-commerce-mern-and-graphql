import { Link } from "react-scroll";

import { motion } from "framer-motion";
import InViewAnimation from "../widgets/animation/InViewAnimation";
import { categoriesArr } from "@/assets/arries/arries";
import useFilterByCategory from "@/custom/useFilterByCategory";
const FooterCategory = () => {
  const { handleCategoryFiltering } = useFilterByCategory();

  return (
    <InViewAnimation once className="">
      <div className="footer-links-par center col start">
        <h3 className="  footer-head">category</h3>
        {categoriesArr.map((link, i) => {
          return (
            <motion.span key={i} whileHover={{ x: 10 }}>
              <Link
                to="products"
                style={{ cursor: "pointer" }}
                smooth
                onClick={() => {
                  handleCategoryFiltering(link);
                }}
              >
                {link}
              </Link>
            </motion.span>
          );
        })}
      </div>
    </InViewAnimation>
  );
};

export default FooterCategory;
