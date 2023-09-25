import { productListContext } from "@/context/ProductsContext";
import { useMutation } from "@apollo/client";
import { useContext } from "react";
import useParams from "./useParams";
import { Sort_Products } from "@/graphql/mutations/product";

const useSortProducts = () => {
  const [sortProducts] = useMutation(Sort_Products);
  const { setProducts, setTotalProductsNum } = useContext(productListContext);

  const { getParam } = useParams();
  const HandleSortProducts = (sortTarget: string, sortType: number) => {
    const page = getParam("page") || 1;
    sortProducts({
      variables: {
        input: {
          sortType,
          sortTarget,
          skip: Number(page) >= 2 ? 12 * (Number(page) - 1) : 0,
          limit: 12,
        },
      },
    }).then(({ data }) => {
      console.log(data);
      setProducts(data.SortProducts.products);
      setTotalProductsNum(data.SortProducts.totalProducts);
    });
  };

  return { HandleSortProducts };
};

export default useSortProducts;
