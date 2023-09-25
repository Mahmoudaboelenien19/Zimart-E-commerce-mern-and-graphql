import { categoriesArr, FeaturedProductsArr } from "@/assets/arries/arries";
import MainBtn from "@/components/widgets/buttons/MainBtn";
import { productListContext } from "@/context/ProductsContext";
import useParams from "@/custom/useParams";
import { FILTER_All } from "@/graphql/mutations/product";
import { useMutation } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { MdFilterListAlt } from "react-icons/md";

const ApplyFilterButton = () => {
  const { setProducts, setTotalProductsNum } = useContext(productListContext);
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
  const catFilter = getParam("catFilter");
  const page = getParam("page");
  const [filterAllFn] = useMutation(FILTER_All);

  const handleFiltering = async () => {
    setProducts(Array.from({ length: 12 }));
    deleteParam("search");
    deleteParam("sort");
    setParam("isFilterApplied", "true");
    if (!isFilterApplied) {
      deleteParam("page");
    }
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
          skip: Number(page) >= 2 ? 12 * (Number(page) - 1) : 0,
        },
      },
    }).then((res) => {
      setIsPending(false);
      const data = res?.data.filterAllTypes;
      setProducts(data?.products || []);
      setTotalProductsNum(data?.totalProducts);
    });
  };

  const handleClickFIlter = () => {
    setIsPending(true);
    deleteParam("catFilter");
    handleFiltering();
  };

  useEffect(() => {
    if (isFilterApplied || catFilter) {
      handleFiltering();
    }
  }, [page, isFilterApplied, catFilter]);

  return (
    <MainBtn
      key={"apply-btn"}
      cls={"btn shadow main center  gap"}
      btn={"apply"}
      fn={handleClickFIlter}
      Icon={MdFilterListAlt}
      isPending={isPending}
    />
  );
};

export default ApplyFilterButton;
