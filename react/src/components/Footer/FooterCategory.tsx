import React, { useContext } from "react";

import { Link } from "react-scroll";

import { motion } from "framer-motion";
import FadeWithY from "../widgets/animation/FadeWithY";
import useParams from "@/custom/useParams";
import { categoriesArr } from "@/assets/arries/arries";
import { productListContext } from "@/context/FilterData";
import useFilterCategory from "@/custom/useFilterCategory";
const FooterCategory = () => {
  const { setProducts } = useContext(productListContext);
  const { setParam, deleteParam } = useParams();
  const categoryfn = useFilterCategory();

  const handleCategory = (category: string) => {
    categoryfn({ variables: { category } }).then(({ data }) => {
      setProducts(data.filterBycatageory);
      setParam("category", category);
      deleteParam("page");
      deleteParam("search");
      deleteParam("rate");
      deleteParam("featured products");
      deleteParam("price");
    });
  };

  return (
    <FadeWithY once cls=" footer-links">
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
                  handleCategory(link);
                }}
              >
                {" "}
                {link}
              </Link>
            </motion.span>
          );
        })}
      </div>
    </FadeWithY>
  );
};

export default FooterCategory;
