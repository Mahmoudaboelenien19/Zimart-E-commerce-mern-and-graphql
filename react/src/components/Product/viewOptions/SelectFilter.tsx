import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { MdOutlineSort } from "react-icons/md";
import { BiDownArrow } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import FadeElement from "@/components/widgets/animation/FadeElement";
import { productListContext } from "@/context/FilterData";
import useClickOutside from "@/custom/useClickOutside";
import {
  FILTER_BY_PRICE,
  FILTER_BY_Rate,
  FILTER_BY_Date,
} from "@/graphql/mutations/product";
import useParams from "@/custom/useParams";
import useSortByPrice from "@/custom/useSortByPrice";
import SortOptions from "./selectFIlter/Options";

const SelectFilter = () => {
  const [isOptSelected, setIsOptSelected] = useState(false);

  const { sortByPrice } = useSortByPrice();

  const { setProducts, isPending, startTransition } =
    useContext(productListContext);
  const [selectValue, setSelectValue] = useState("relevance");
  const [isSelectFocus, setIsSelectFocus] = useState(false);
  const { deleteParam } = useParams();
  const deleteSearchAndFIlterParams = () => {
    deleteParam("search");
    deleteParam("page");
    deleteParam("isFilterApplied");
  };

  const [fnRate] = useMutation(FILTER_BY_Rate);
  const [fnDate] = useMutation(FILTER_BY_Date);
  useEffect(() => {
    switch (selectValue) {
      case "relevance":
        return;
      case "lowest price":
        return sortByPrice(1);

      case "highest price":
        return sortByPrice(-1);
    }
    // if (selectValue === "relevance") {
    //   startTransition(() => setProducts(Allproducts));

    // } else if (selectValue === "lowest rate") {
    //   fnRate({
    //     variables: {
    //       rate: 1,
    //     },
    //   }).then(({ data }) =>
    //     startTransition(() => setProducts(data.filterByRate))
    //   );
    // } else if (selectValue === "highest rate") {
    //   fnRate({
    //     variables: {
    //       rate: -1,
    //     },
    //   }).then(({ data }) =>
    //     startTransition(() => setProducts(data.filterByRate))
    //   );
    // } else if (selectValue === "newest") {
    //   fnDate({
    //     variables: {
    //       date: -1,
    //     },
    //   }).then(({ data }) =>
    //     startTransition(() => setProducts(data.filterByDate))
    //   );
    // } else if (selectValue === "oldest") {
    //   fnDate({
    //     variables: {
    //       date: 1,
    //     },
    //   }).then(({ data }) =>
    //     startTransition(() => setProducts(data.filterByDate))
    //   );
    // }
  }, [selectValue]);

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
          <SortOptions
            selectValue={selectValue}
            setIsSelectFocus={setIsSelectFocus}
            setSelectValue={setSelectValue}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectFilter;
