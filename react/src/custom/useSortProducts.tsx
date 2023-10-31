import { useMutation } from "@apollo/client";
import useParams from "./useParams";
import { Sort_Products } from "@/graphql/mutations/product";
import { useAppDispatch } from "./reduxTypes";
import {
  addToProductRedux,
  changeTotalProductsCount,
  skeltonProductSlice,
} from "@/redux/productSlice";

const useSortProducts = () => {
  const [sortProducts] = useMutation(Sort_Products);
  const dispatch = useAppDispatch();
  const { getParam } = useParams();
  const HandleSortProducts = (sortTarget: string, sortType: number) => {
    const page = getParam("page") || 1;

    dispatch(skeltonProductSlice());

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
      dispatch(addToProductRedux(data.SortProducts.products));
      dispatch(changeTotalProductsCount(data?.SortProducts?.totalProducts));
    });
  };

  return { HandleSortProducts };
};

export default useSortProducts;
