import { categoriesArr, FeaturedProductsArr } from "@/assets/arries/arries";
import MainBtn from "@/components/widgets/buttons/MainBtn";
import { productListContext } from "@/context/FilterData";
import useParams from "@/custom/useParams";
import { FILTER_All } from "@/graphql/mutations/product";
import { useMutation } from "@apollo/client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MdFilterListAlt } from "react-icons/md";

const ApplyFilterButton = () => {
  const { setProducts, startTransition, setTotalProductsNum } =
    useContext(productListContext);
  const [isPending, setIsPending] = useState(false);
  const {
    priceFilter,
    rateFilter,
    categoryFilter,
    featuredProductsFilter,
    setParam,
    deleteParam,
    getParam,
  } = useParams();

  const isFilterApplied = getParam("isFilterApplied");
  const [filterAllFn] = useMutation(FILTER_All);
  const handleFiltering = async () => {
    startTransition(() => {
      setIsPending(true);
      deleteParam("search");
      setParam("isFilterApplied", "true");
      deleteParam("page");
      filterAllFn({
        variables: {
          input: {
            price: Number(priceFilter) === 0 ? 10000 : Number(priceFilter),
            category: categoryFilter === "" ? categoriesArr : [categoryFilter],
            state:
              featuredProductsFilter === ""
                ? FeaturedProductsArr
                : [featuredProductsFilter],
            rate: rateFilter === "" ? 5 : Number(rateFilter),
          },
        },
      }).then((res) => {
        setIsPending(false);
        setProducts(res?.data.filterAllTypes);
        setTotalProductsNum(0);
      });
    });
  };
  //this ref to fetch data once
  const initialRender = useRef(true);
  useEffect(() => {
    initialRender.current = false;
    if (isFilterApplied && initialRender.current) {
      handleFiltering();
    }
  }, []);

  return (
    <MainBtn
      key={"apply-btn"}
      cls={"btn shadow main center  gap"}
      btn={"apply"}
      fn={handleFiltering}
      Icon={MdFilterListAlt}
      isPending={isPending}
    />
  );
};

export default ApplyFilterButton;
