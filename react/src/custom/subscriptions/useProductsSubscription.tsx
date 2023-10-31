import { useSubscription, OnDataOptions } from "@apollo/client";
import {
  Added_Product_Subscription,
  Updated_Product_Subscription,
} from "../../graphql/mutations/product";
import { ProductInterface } from "../../interfaces/product";
import {
  addToProductRedux,
  updateProductRedux,
} from "../../redux/productSlice";
import { useAppDispatch } from "../reduxTypes";
import useParams from "../useParams";

const useProductsSubscription = () => {
  const { getParam } = useParams();

  const dispatch = useAppDispatch();
  const search = getParam("search");
  const sort = getParam("sort");
  const page = getParam("page") || 1;
  const catFilter = getParam("catFilter");
  const isFilterApplied = getParam("isFilterApplied") || "";

  useSubscription(Updated_Product_Subscription, {
    onData: (data: OnDataOptions<{ productUpdated: ProductInterface }>) => {
      const ob = data?.data?.data?.productUpdated;
      dispatch(updateProductRedux({ _id: ob?._id, obj: ob }));
    },
  });
  useSubscription(Added_Product_Subscription, {
    onData: (data: OnDataOptions<{ productAdded: ProductInterface }>) => {
      /* 
    this check to add data only to redux if in first page and not search or filtering
    */
      if (
        !isFilterApplied &&
        !search &&
        !sort &&
        !catFilter &&
        Number(page) === 1
      ) {
        const ob = data?.data?.data?.productAdded;

        dispatch(addToProductRedux(ob));
      }
    },
  });

  return;
};
export default useProductsSubscription;
