import React, { useContext, useEffect, useState } from "react";
import { MdOutlineSort } from "react-icons/md";
import { BiDownArrow } from "react-icons/bi";
import { AnimatePresence } from "framer-motion";
import FadeElement from "@/components/widgets/animation/FadeElement";
import { productListContext } from "@/context/ProductsContext";
import useClickOutside from "@/custom/useClickOutside";
import useParams from "@/custom/useParams";
import SortOptions from "./selectFIlter/Options";
import clsx from "clsx";
import { themeContext } from "@/context/ThemContext";
import useSortProducts from "@/custom/useSortProducts";
import useSortByRate from "@/custom/useSortByRate";

const SelectFilter = () => {
  const sortAr = [
    "relevance",
    "lowest price",
    "highest price",
    "newest",
    "oldest",
    "highest rate",
    "lowest rate",
  ];

  const { HandleSortProducts } = useSortProducts();
  const { HandleSortProductsByRate } = useSortByRate();
  const { setProducts } = useContext(productListContext);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const { getParam, deleteParam } = useParams();
  const sort = getParam("sort") || "";
  const page = getParam("page") || 1;

  useEffect(() => {
    if (sort) {
      setProducts(Array.from({ length: 12 }));
      switch (sort) {
        case "relevance":
          return deleteParam("sort");

        case "lowest price":
          return HandleSortProducts("price", 1);

        case "highest price":
          return HandleSortProducts("price", -1);

        case "newest":
          return HandleSortProducts("createdAt", -1);
        case "oldest":
          return HandleSortProducts("createdAt", 1);

        case "highest rate":
          return HandleSortProductsByRate(-1);
        case "lowest rate":
          return HandleSortProductsByRate(1);

        default:
          return deleteParam("");
      }
    }
  }, [sort, page]);

  const { theme } = useContext(themeContext);
  const ref = useClickOutside<HTMLDivElement>(() => {
    if (isSelectOpen) {
      setIsSelectOpen(false);
    }
  }, isSelectOpen);
  return (
    <div
      className={clsx("custom-select", theme)}
      onClick={() => setIsSelectOpen(!isSelectOpen)}
      ref={ref}
    >
      <BiDownArrow className=" select-icon arrow" />
      <span className="icon select-icon sort center ">
        <MdOutlineSort /> sort:
        <FadeElement key={sort} cls="value" transition={0.3}>
          {sortAr.includes(sort) ? sort : "relevance"}
        </FadeElement>
      </span>
      <AnimatePresence>
        {isSelectOpen && <SortOptions setIsSelectOpen={setIsSelectOpen} />}
      </AnimatePresence>
    </div>
  );
};

export default SelectFilter;
