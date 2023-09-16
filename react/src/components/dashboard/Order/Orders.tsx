import React, {
  useEffect,
  createContext,
  useState,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
import DashMain from "../DashMain";

import Pages from "../../Product/Products/Pages";
import usePagination from "../../../custom/useNumberOfPages";
import { useAppSelector } from "../../../custom/reduxTypes";
import MobileOrders from "./Mobile/MobileOrders";
import OrderTable from "./Table/OrderTable";
import { Outlet } from "react-router-dom";
import NoData from "../../widgets/NoData";
import useMessure from "react-use-measure";
import { showAsideContext } from "../Dashboard";
import { mergeRefs } from "react-merge-refs";
import { OrderInterface } from "../../../interfaces/order";

interface contextInterface {
  setarrOfOrders: React.Dispatch<React.SetStateAction<string[]>>;
  arrOfOrders: string[];

  setSlectALl: React.Dispatch<React.SetStateAction<string | number>>;
  selectALl: string | number;
  dataShown: OrderInterface[];
}
export const checkContext = createContext({} as contextInterface);
const Orders = () => {
  const { showAsideDash } = useContext(showAsideContext);
  const [selectALl, setSlectALl] = useState<string | number>("");
  const [arrOfOrders, setarrOfOrders] = useState<string[]>([]);
  const query = new URLSearchParams(location.search);
  const page = query.get("page") || "1";
  const { order } = useAppSelector((st) => st.order);
  const [dataShown, numberOfPages] = usePagination(
    18,
    Number(page),
    order || []
  );
  useEffect(() => {
    setTimeout(() => {
      document.title = "Dashboaed | Orders";
    }, 400);
  }, []);
  const [ref, { width }] = useMessure();

  const [wid, setWid] = useState(0);
  const reff = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    setWid(reff.current?.offsetWidth || 0);
  }, [showAsideDash, width]);
  return (
    <checkContext.Provider
      value={{ dataShown, setarrOfOrders, arrOfOrders, setSlectALl, selectALl }}
    >
      <DashMain key={"order-dashmain"}>
        <span ref={mergeRefs([reff, ref])}>
          {wid >= 700 ? (
            <NoData message="no orders" length={order.length >= 1} cls="h-50">
              <OrderTable key={"table-order"} />
            </NoData>
          ) : (
            <MobileOrders key={"mobile-order"} />
          )}
          <Pages
            pathname="/dashboard/orders"
            key={"order-pages"}
            page={Number(page)}
            numOfPages={numberOfPages}
          />

          <Outlet />
        </span>
      </DashMain>
    </checkContext.Provider>
  );
};

export default Orders;
