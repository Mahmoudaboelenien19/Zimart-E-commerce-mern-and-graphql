import { useSubscription, OnDataOptions } from "@apollo/client";
import {
  Added_Product_Subscription,
  Updated_Product_Subscription,
} from "../graphql/mutations/product";
import { ProductInterface } from "../interfaces/product";
import { addToProductRedux, updateProductRedux } from "../redux/productSlice";
import { useAppDispatch } from "./reduxTypes";

const useProductsSubscription = () => {
  const dispatch = useAppDispatch();

  useSubscription(Updated_Product_Subscription, {
    onData: (data: OnDataOptions<{ productUpdated: ProductInterface }>) => {

      const ob = data?.data?.data?.productUpdated;
      dispatch(updateProductRedux({ _id: ob?._id, obj: ob }));
    },
  });
  useSubscription(Added_Product_Subscription, {
    onData: (data: OnDataOptions<{ productAdded: ProductInterface }>) => {
      const ob = data?.data?.data?.productAdded;
      dispatch(addToProductRedux(ob));
    },
  });

  return;
};
export default useProductsSubscription;
