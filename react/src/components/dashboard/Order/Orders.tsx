import { useEffect, createContext, useState, Fragment } from "react";
import MobileOrders from "./Mobile/MobileOrders";
import OrderTable from "./Table/OrderTable";
import { Outlet } from "react-router-dom";
import Pages from "@/components/widgets/shared/Pages";
import useParams from "@/custom/helpers/useParams";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_ORDERS } from "@/graphql/queries";
import {
  addToOrderRedux,
  clearOrdersRedux,
  ordersSkeltonRedux,
} from "@/redux/orderSlice";
import { useAppDispatch } from "@/custom/helpers/reduxTypes";
import useOrdersSubscription from "@/custom/subscriptions/useOrdersSubscription";
import useTitle from "@/custom/helpers/useTitle";
import { ORDER } from "@/types/order";

interface contextInterface {
  dataShown: ORDER[];
}
type Data = {
  data: {
    orders: {
      orders: ORDER;
      totalOrders: number;
    };
  };
};
export const checkContext = createContext({} as contextInterface);

export function Component() {
  const { getParam } = useParams();

  const page = getParam("page") || 1;

  const dispatch = useAppDispatch();
  const [totalOrders, setTotalOrders] = useState(0);
  const [getOrders] = useLazyQuery(GET_ALL_ORDERS, {
    variables: {
      limit: 18,
      skip: Number(page) >= 2 ? 18 * (Number(page) - 1) : 0,
    },
    fetchPolicy: "cache-and-network",
  });

  useTitle("Dashboaed | Orders");
  useEffect(() => {
    dispatch(ordersSkeltonRedux());

    getOrders().then(({ data }: Data) => {
      setTotalOrders(data?.orders?.totalOrders);

      dispatch(clearOrdersRedux());
      dispatch(addToOrderRedux(data?.orders?.orders));
    });
  }, [page]);

  useOrdersSubscription();
  return (
    <Fragment>
      <OrderTable key={"table-order"} />
      <MobileOrders key={"mobile-order"} />
      <Pages
        key={"order-pages"}
        page={Number(page)}
        total={totalOrders}
        limit={18}
        to="orders"
      />

      <Outlet />
    </Fragment>
  );
}
