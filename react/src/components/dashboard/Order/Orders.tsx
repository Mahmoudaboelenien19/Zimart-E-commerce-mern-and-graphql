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
import NoData from "@/components/widgets/NoData";
import { useAppSelector } from "@/custom/reduxTypes";
import usePagination from "@/custom/useNumberOfPages";
import { OrderInterface } from "@/interfaces/order";
import useParams from "@/custom/useParams";

interface contextInterface {
  setarrOfOrders: React.Dispatch<React.SetStateAction<string[]>>;
  arrOfOrders: string[];
  setSlectALl: React.Dispatch<React.SetStateAction<string | number>>;
  selectALl: string | number;
  dataShown: OrderInterface[];
}
export const checkContext = createContext({} as contextInterface);
const Orders = () => {
  const [selectALl, setSlectALl] = useState<string | number>("");
  const [arrOfOrders, setarrOfOrders] = useState<string[]>([]);
  const { page, showAsideFilter } = useParams();
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
  }, [showAsideFilter, width]);

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
