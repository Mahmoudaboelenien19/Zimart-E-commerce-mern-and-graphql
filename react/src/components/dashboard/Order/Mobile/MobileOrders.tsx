import MobileOrder from "./MobileOrder";
import { Outlet } from "react-router-dom";
import { OrderInterface } from "@/interfaces/order.interface";
import { useAppSelector } from "@/custom/reduxTypes";
import { Fragment } from "react";

const MobileOrders = () => {
  const { order } = useAppSelector((st) => st.order);
  return (
    <div className="mobile-dashboard  col gap">
      <Fragment>
        {order?.map((order: OrderInterface, i: number) => {
          return <MobileOrder {...order} key={i} />;
        })}
      </Fragment>
      <Outlet />
    </div>
  );
};

export default MobileOrders;
