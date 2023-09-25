import React, {
  useEffect,
  createContext,
  useState,
  useLayoutEffect,
  useRef,
} from "react";
import DashMain from "../DashMain";
import MobileOrders from "./Mobile/MobileOrders";
import OrderTable from "./Table/OrderTable";
import { Outlet } from "react-router-dom";
import useMessure from "react-use-measure";
import { mergeRefs } from "react-merge-refs";
import Pages from "@/components/Product/Products/Pages";
import { OrderInterface } from "@/interfaces/order";
import useParams from "@/custom/useParams";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_ORDERS } from "@/graphql/queries";

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
  const [totalOrders, setTotalOrders] = useState(0);
  const { page, showAsideFilter } = useParams();

  const [getOrders, { data }] = useLazyQuery(GET_ALL_ORDERS, {
    variables: {
      limit: 18,
      skip: Number(page) >= 2 ? 18 * (Number(page) - 1) : 0,
    },
  });

  useEffect(() => {
    document.title = "Dashboaed | Orders";
    getOrders().then(({ data }: Data) => {
      setTotalOrders(data?.orders?.totalOrders);
    });
  }, [page]);

  const [ref, { width }] = useMessure();
  const [wid, setWid] = useState(0);
  const reff = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setWid(reff.current?.offsetWidth || 0);
  }, [showAsideFilter, width]);

  return (
    <checkContext.Provider
      value={{
        dataShown: data?.orders?.orders || Array.from({ length: 18 }),
      }}
    >
      <DashMain key={"order-dashmain"}>
        <span ref={mergeRefs([reff, ref])} id={"orders"}>
          {wid >= 700 ? (
            <OrderTable key={"table-order"} />
          ) : (
            <MobileOrders key={"mobile-order"} />
          )}
          <Pages
            key={"order-pages"}
            page={Number(page)}
            total={totalOrders}
            limit={18}
            to="orders"
          />

          <Outlet />
        </span>
      </DashMain>
    </checkContext.Provider>
  );
}
