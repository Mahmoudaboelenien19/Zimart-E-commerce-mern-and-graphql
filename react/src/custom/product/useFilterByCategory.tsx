import useParams from "../helpers/useParams";

const useFilterByCategory = () => {
  const { setParam, deleteParam } = useParams();
  const handleCategoryFiltering = (category: string, type = "category") => {
    deleteParam("page");
    deleteParam("search");
    deleteParam("rate");
    deleteParam("sort");
    deleteParam("price");
    setParam("catFilter", category);
    setParam("isFilterApplied", "true");
    if (type === "category") {
      deleteParam("featured products");
      setParam("category", category);
    } else {
      deleteParam("featured products");
      deleteParam("category");
      setParam("featured products", category);
    }
  };
  return { handleCategoryFiltering };
};

export default useFilterByCategory;
