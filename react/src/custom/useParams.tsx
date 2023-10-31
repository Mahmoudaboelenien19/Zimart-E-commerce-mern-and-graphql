import { useSearchParams } from "react-router-dom";

const useParams = () => {
  interface Params {
    search: string;
    priceFilter: string;
    rateFilter: string;
    categoryFilter: string;
    featuredProductsFilter: string;
    showAsideFilter: string;
    showDashBoaedAside: string;
    page: string;
    resetSearchParams: () => void;
    deleteParam: (param: string) => void;
    getParam: (target: string) => string | undefined;
    setParam: (param: string, value: string) => void;
    [key: string]: string | any;
  }

  const [searchParams, setSearchParams] = useSearchParams();

  //i don't get all params just most used params  but to get the param i use getParam Fn
  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";
  const priceFilter = searchParams.get("price") || "0";
  const rateFilter = searchParams.get("rate") || "";
  const categoryFilter = searchParams.get("category") || "";
  const featuredProductsFilter = searchParams.get("featured products") || "";
  const showAsideFilter = searchParams.get("showAsideFilter") || "";
  const showDashBoaedAside = searchParams.get("showDashBoaedAside") || null;

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
  const getParam = (target: string) => searchParams.get(target);

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
    showDashBoaedAside,
    setParam,
    getParam,
  } as Params;
};

export default useParams;
