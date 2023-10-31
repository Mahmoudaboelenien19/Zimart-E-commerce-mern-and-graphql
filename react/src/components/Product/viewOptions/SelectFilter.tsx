import { useEffect } from "react";
import useParams from "@/custom/useParams";
import useSortProducts from "@/custom/useSortProducts";
import useSortByRate from "@/custom/useSortByRate";
import Select from "@/components/widgets/shared/select/Select";

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

  useEffect(() => {
    if (sort) {
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
