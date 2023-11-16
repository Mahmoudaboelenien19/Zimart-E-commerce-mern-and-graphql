import { Sort_BY_Rate } from "@/graphql/mutations/product";
import { useMutation } from "@apollo/client";
import useParams from "../helpers/useParams";
import { useAppDispatch } from "../helpers/reduxTypes";
import {
  skeltonProductSlice,
  addToProductRedux,
  changeTotalProductsCount,
} from "@/redux/productSlice";
const useSortByRate = () => {
  const [sortProductsbyRate] = useMutation(Sort_BY_Rate);
  const dispatch = useAppDispatch();
  const { getParam } = useParams();
  const HandleSortProductsByRate = (sortType: number) => {
    const page = getParam("page") || 1;
    dispatch(skeltonProductSlice());

    sortProductsbyRate({
      variables: {
        input: {
          sortType,
          skip: Number(page) >= 2 ? 12 * (Number(page) - 1) : 0,
          limit: 12,
        },
      },
    }).then(({ data }) => {
      const res = data?.SortByRate;
      dispatch(addToProductRedux(res?.products));
      dispatch(changeTotalProductsCount(res?.totalProducts));
    });
  };

  return { HandleSortProductsByRate };
};

export default useSortByRate;
