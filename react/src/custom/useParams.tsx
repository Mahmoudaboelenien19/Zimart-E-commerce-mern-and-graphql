import { SetURLSearchParams, useSearchParams } from "react-router-dom";

const useParams = () => {
  interface Params {
    search: string;
    priceFilter: string;
    rateFilter: string;
    categoryFilter: string;
    featuredProductsFilter: string;
    showAsideFilter: string;
    page: string;
    resetSearchParams: () => void;
    deleteParam: (param: string) => void;
    setParam: (param: string, value: string) => void;
    setSearchParams: SetURLSearchParams;
  }

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";
  const priceFilter = searchParams.get("price") || "0";
  const rateFilter = searchParams.get("rate") || "";
  const categoryFilter = searchParams.get("category") || "";
  const featuredProductsFilter = searchParams.get("featured products") || "";
  const showAsideFilter = searchParams.get("showAsideFilter") || "";
  const deleteParam = (param: string) => {
    setSearchParams((params) => {
      params.delete(param);
      return params;
    });
  };

  const setParam = (param: string, value: "") => {
    setSearchParams((params) => {
      params.set(param, value);
      return params;
    });
  };

  const resetSearchParams = () => setSearchParams({});
  return {
    search,
    page,
    priceFilter,
    rateFilter,
    categoryFilter,
    featuredProductsFilter,
    resetSearchParams,
    showAsideFilter,
    deleteParam,
    setParam,
    setSearchParams,
  } as Params;
};

export default useParams;
