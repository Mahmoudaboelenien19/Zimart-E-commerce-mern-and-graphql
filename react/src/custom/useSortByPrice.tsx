import { productListContext } from "@/context/FilterData";
import { FILTER_BY_PRICE } from "@/graphql/mutations/product";
import { useMutation } from "@apollo/client";
import { useContext } from "react";
import useParams from "./useParams";

const useSortByPrice = () => {
  const [fnPrice] = useMutation(FILTER_BY_PRICE);
  const { setProducts, startTransition } = useContext(productListContext);

  const sortByPrice = (type: number) => {
    const { getParam } = useParams();

    const page = getParam("page") || 1;
    startTransition(() => {
      fnPrice({
        variables: {
          price: type,
          skip: Number(page) >= 2 ? 12 * (Number(page) - 1) : 0,
          limit: 12,
        },
      }).then(({ data }) => setProducts(data.filterByPrice));
    });
  };

  return { sortByPrice };
};

export default useSortByPrice;
