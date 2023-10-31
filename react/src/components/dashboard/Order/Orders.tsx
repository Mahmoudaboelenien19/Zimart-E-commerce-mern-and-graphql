import { useEffect, createContext, useState } from "react";
import DashMain from "../DashMain";
import MobileOrders from "./Mobile/MobileOrders";
import OrderTable from "./Table/OrderTable";
import { Outlet } from "react-router-dom";
import Pages from "@/components/Product/Products/Pages";
import { OrderInterface } from "@/interfaces/order.interface";
import useParams from "@/custom/useParams";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_ORDERS } from "@/graphql/queries";
import {
  addToOrderRedux,
  clearOrdersRedux,
  ordersSkeltonRedux,
} from "@/redux/orderSlice";
import { useAppDispatch } from "@/custom/reduxTypes";
import useOrdersSubscription from "@/custom/subscriptions/useOrdersSubscription";
import useTitle from "@/custom/useTitle";

interface contextInterface {
  dataShown: OrderInterface[];
}
type Data = {
  data: {
    orders: {
      orders: OrderInterface;
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
    <DashMain key={"order-dashmain"}>
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
    </DashMain>
  );
}
