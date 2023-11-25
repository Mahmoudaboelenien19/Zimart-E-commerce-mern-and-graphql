import { categoriesArr, FeaturedProductsArr } from "@/assets/arries/arries";
import { FILTER_All } from "@/graphql/mutations/product";
import { useMutation } from "@apollo/client";
import { useEffect, useRef } from "react";
import useParams from "../helpers/useParams";
import { useAppDispatch, useAppSelector } from "../helpers/reduxTypes";
import {
  addToProductRedux,
  changeTotalProductsCount,
  skeltonProductSlice,
} from "@/redux/productSlice";

const useApplyFilters = () => {
  const dispatch = useAppDispatch();
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
  const [filterAllFn, { loading }] = useMutation(FILTER_All);

  const handleFiltering = async () => {
    deleteParam("search");
    deleteParam("sort");
    if (!isFilterApplied) {
      deleteParam("page");
    }
    dispatch(skeltonProductSlice());
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
      const data = res?.data.filterAllTypes;
      dispatch(addToProductRedux(data?.products || []));
      dispatch(changeTotalProductsCount(data?.totalProducts || 0));
    });
  };

  const handleClickFIlter = () => {
    deleteParam("catFilter");
    setParam("isFilterApplied", "true");
    handleFiltering();
  };

  const { Allproducts } = useAppSelector((st) => st.Allproducts);

  const initialRender = useRef(Boolean(Allproducts.length));
  const initialPage = useRef(page);
  const initialCatFilter = useRef(catFilter);
  const refetch = useRef(false);
  useEffect(() => {
    if (page !== initialPage.current) {
      initialRender.current = false;
    }
    if (catFilter !== initialCatFilter.current) {
      refetch.current = true;
    }
    if (isFilterApplied && (!initialRender.current || refetch.current)) {
      console.log(" use effect apply filter");

      handleFiltering();
    }
  }, [page, isFilterApplied, catFilter]);
  return { loading, handleClickFIlter };
};

export default useApplyFilters;
