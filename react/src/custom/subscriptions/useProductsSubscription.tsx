import { useSubscription, OnDataOptions } from "@apollo/client";
import {
  addToProductRedux,
  updateProductRedux,
} from "../../redux/productSlice";
import { useAppDispatch } from "../helpers/reduxTypes";
import {
  Updated_Product_Subscription,
  Added_Product_Subscription,
} from "@/graphql/mutations/product";
import { Product } from "@/types/product";
import { useSearchParams } from "react-router-dom";
import useParams from "../helpers/useParams";

type URL = URLSearchParams & { size: number };
const useProductsSubscription = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { showAsideFilter } = useParams();

  useSubscription(Updated_Product_Subscription, {
    onData: (data: OnDataOptions<{ productUpdated: Product }>) => {
      const ob = data?.data?.data?.productUpdated;
      dispatch(updateProductRedux({ _id: ob?._id, obj: ob }));
    },
  });

  useSubscription(Added_Product_Subscription, {
    onData: (data: OnDataOptions<{ productAdded: Product }>) => {
      /* 
    this check to add data only to redux if in first page and not search or filtering
    */

      if (
        //this check to add new product only if i show first page
        (searchParams as URL)?.size === 0 ||
        (showAsideFilter && (searchParams as URL)?.size === 1)
      ) {
        const ob = data?.data?.data?.productAdded;

        dispatch(addToProductRedux(ob));
      }
    },
  });

  return;
};
export default useProductsSubscription;
