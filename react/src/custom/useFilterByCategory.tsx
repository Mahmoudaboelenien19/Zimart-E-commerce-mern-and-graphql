import useParams from "./useParams";

const useFilterByCategory = () => {
  const { setParam, deleteParam } = useParams();
  const handleCategoryFiltering = (category: string, type = "category") => {
    deleteParam("page");
    deleteParam("search");
    deleteParam("rate");
    deleteParam("sort");
    deleteParam("price");
    deleteParam("featured products");
    if (type === "category") {
      setParam("category", category);
    } else {
      deleteParam("category");
      setParam("featured products", category);
    }
    setParam("catFilter", category);
  };
  return { handleCategoryFiltering };
};

export default useFilterByCategory;
