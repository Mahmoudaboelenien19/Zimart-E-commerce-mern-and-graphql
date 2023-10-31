import { Order_Created_Subscription } from "@/graphql/mutations/order";
import { OrderInterface } from "@/interfaces/order.interface";
import { addToOrderRedux } from "@/redux/orderSlice";
import { useSubscription, OnDataOptions } from "@apollo/client";
import { useAppDispatch } from "../reduxTypes";
import useParams from "../useParams";

const useOrdersSubscription = () => {
  const dispatch = useAppDispatch();
  const { getParam } = useParams();
  const page = Number(getParam("page")) || 1;
  useSubscription(Order_Created_Subscription, {
    onData: (data: OnDataOptions<{ OrderCreated: OrderInterface }>) => {
      if (page === 1) {
        dispatch(addToOrderRedux(data?.data?.data?.OrderCreated));
      }
    },
  });
};

export default useOrdersSubscription;
