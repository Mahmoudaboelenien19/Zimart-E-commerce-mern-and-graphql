import { useAppDispatch } from "@/custom/helpers/reduxTypes";
import useParams from "@/custom/helpers/useParams";
import { Search_Mutaion } from "@/graphql/mutations/product";
import {
  skeltonProductSlice,
  addToProductRedux,
  changeTotalProductsCount,
} from "@/redux/productSlice";
import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const useSearch = (inpVal: string) => {
  const dispatch = useAppDispatch();
  const [value] = useDebounce(inpVal, 800);
  const [fnSearch, { loading }] = useMutation(Search_Mutaion);
  const [showRes, setShowRes] = useState(false);
  const { deleteParam, setParam, page } = useParams();
  const handleSearch = () => {
    if (value != "") {
      if (!showRes) {
        setShowRes(true);
      }
      if (page) {
        deleteParam("page");
      }
      setParam("search", value || "");
      dispatch(skeltonProductSlice());
      deleteParam("isFilterApplied");
      deleteParam("catFilter");
      deleteParam("sort");
      fnSearch({
        variables: {
          word: value,
          skip: Number(page) >= 2 ? 12 * (Number(page) - 1) : 0,
          limit: 12,
        },
      }).then(({ data }) => {
        const pro = data?.searchProducts;
        dispatch(addToProductRedux(pro?.products || []));
        dispatch(changeTotalProductsCount(pro?.totalProducts || 0));
      });
    }
  };

  useEffect(() => {
    handleSearch();
  }, [page, value]);

  return { loading, showRes, setShowRes };
};

export default useSearch;
