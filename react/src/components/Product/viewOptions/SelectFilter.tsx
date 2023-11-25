import { useEffect, useRef } from "react";
import useParams from "@/custom/helpers/useParams";
import useSortProducts from "@/custom/product/useSortProducts";
import useSortByRate from "@/custom/product/useSortByRate";
import Select from "@/components/widgets/shared/select/Select";
import { useAppSelector } from "@/custom/helpers/reduxTypes";

const sortAr = [
  "relevance",
  "lowest price",
  "highest price",
  "newest",
  "oldest",
  "highest rate",
  "lowest rate",
];
const SelectFilter = () => {
  const { HandleSortProducts } = useSortProducts();
  const { HandleSortProductsByRate } = useSortByRate();
  const { deleteParam, setParam, getParam } = useParams();
  const sort = getParam("sort") || "";
  const page = getParam("page") || 1;
  const { Allproducts } = useAppSelector((st) => st.Allproducts);

  const initialRender = useRef(Boolean(Allproducts.length));
  const initialPage = useRef(page);
  const initialSort = useRef(sort);
  const refetch = useRef(false);

  useEffect(() => {
    if (page !== initialPage.current) {
      initialRender.current = false;
    }
    if (sort !== initialSort.current) {
      refetch.current = true;
    }
    if (sort && (!initialRender.current || refetch.current)) {
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

  const updateValue = (val: string) => {
    deleteParam("search");
    deleteParam("isFilterApplied");
    deleteParam("catFilter");
    deleteParam("page");
    setParam("sort", val);
  };
  return (
    <Select
      className="select-filter"
      ar={sortAr}
      noVal="relevance"
      val={sort}
      fn={updateValue}
    />
  );
};

export default SelectFilter;
