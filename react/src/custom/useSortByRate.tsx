import { productListContext } from "@/context/ProductsContext";
import { Sort_BY_Rate } from "@/graphql/mutations/product";
import { useMutation } from "@apollo/client";
import { useContext } from "react";
import useParams from "./useParams";

const useSortByRate = () => {
  const [sortProductsbyRate] = useMutation(Sort_BY_Rate);
  const { setProducts, setTotalProductsNum } = useContext(productListContext);

  const { getParam } = useParams();
  const HandleSortProductsByRate = (sortType: number) => {
    const page = getParam("page") || 1;
    sortProductsbyRate({
      variables: {
        input: {
          sortType,
          skip: Number(page) >= 2 ? 12 * (Number(page) - 1) : 0,
          limit: 12,
        },
      },
    }).then(({ data }) => {
      console.log(data);
      setProducts(data.SortByRate.products);
      setTotalProductsNum(data.SortByRate.totalProducts);
    });
  };

  return { HandleSortProductsByRate };
};

export default useSortByRate;
