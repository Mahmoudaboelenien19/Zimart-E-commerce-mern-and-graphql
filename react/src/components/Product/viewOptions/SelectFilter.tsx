import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";

import { MdOutlineSort } from "react-icons/md";
import { BiDownArrow } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import FadeElement from "@/components/widgets/animation/FadeElement";
import { productListContext } from "@/context/FilterData";
import { useAppSelector } from "@/custom/reduxTypes";
import useClickOutside from "@/custom/useClickOutside";
import {
  FILTER_BY_PRICE,
  FILTER_BY_Rate,
  FILTER_BY_Date,
} from "@/graphql/mutations/product";
import { selectDropDownVariants, opacityVariant } from "@/variants/globals";
import { optionsArr } from "@/assets/arries/arries";
import useParams from "@/custom/useParams";

const SelectFilter = () => {
  const { deleteParam } = useParams();
  const { Allproducts } = useAppSelector((st) => st.Allproducts);
  const [isOptSelected, setIsOptSelected] = useState(false);
  const { setProducts, isPending, startTransition } =
    useContext(productListContext);
  const [selectValue, setSelectValue] = useState("relevance");
  const [fnPrice] = useMutation(FILTER_BY_PRICE);
  const [fnRate] = useMutation(FILTER_BY_Rate);
  const [fnDate] = useMutation(FILTER_BY_Date);
  useEffect(() => {
    if (!isPending && isOptSelected) {
      setIsOptSelected(false);

      if (selectValue === "relevance") {
        startTransition(() => setProducts(Allproducts));
      } else if (selectValue === "lowest price") {
        fnPrice({
          variables: {
            price: 1,
          },
        }).then(({ data }) =>
          startTransition(() => setProducts(data.filterByPrice))
        );
      } else if (selectValue === "highest price") {
        fnPrice({
          variables: {
            price: -1,
          },
        }).then(({ data }) =>
          startTransition(() => setProducts(data.filterByPrice))
        );
      } else if (selectValue === "lowest rate") {
        fnRate({
          variables: {
            rate: 1,
          },
        }).then(({ data }) =>
          startTransition(() => setProducts(data.filterByRate))
        );
      } else if (selectValue === "highest rate") {
        fnRate({
          variables: {
            rate: -1,
          },
        }).then(({ data }) =>
          startTransition(() => setProducts(data.filterByRate))
        );
      } else if (selectValue === "newest") {
        fnDate({
          variables: {
            date: -1,
          },
        }).then(({ data }) =>
          startTransition(() => setProducts(data.filterByDate))
        );
      } else if (selectValue === "oldest") {
        fnDate({
          variables: {
            date: 1,
          },
        }).then(({ data }) =>
          startTransition(() => setProducts(data.filterByDate))
        );
      }
    }
  }, [selectValue, isPending]);

  const [isSelectFocus, setIsSelectFocus] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => {
    if (isSelectFocus) {
      setIsSelectFocus(false);
    }
  }, isSelectFocus);
  return (
    <div
      className="custom-select"
      onClick={() => setIsSelectFocus(!isSelectFocus)}
      ref={ref}
    >
      <BiDownArrow
        className="  box-shadow: 0.25px 0.25px 2px black;
 select-icon arrow"
      />
      <span className="icon select-icon sort center">
        <MdOutlineSort /> sort:
        <FadeElement key={selectValue} cls="value" transition={0.3}>
          {selectValue}
        </FadeElement>
      </span>
      <AnimatePresence>
        {isSelectFocus && (
          <motion.ul
            className="select-dropdown center col"
            variants={selectDropDownVariants}
            initial="start"
            animate="end"
            exit="exit"
          >
            {optionsArr.map((opt, i) => {
              return (
                <motion.li
                  className="select-opt"
                  style={{
                    color:
                      opt === selectValue ? "var(--wheat)" : "var(--third)",
                  }}
                  variants={opacityVariant}
                  onClick={() => {
                    setIsSelectFocus(false);
                    deleteParam("search");
                    deleteParam("page");
                    setSelectValue(opt);
                  }}
                  key={i}
                  onTapStart={() => setIsOptSelected(true)}
                >
                  {opt}
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectFilter;
