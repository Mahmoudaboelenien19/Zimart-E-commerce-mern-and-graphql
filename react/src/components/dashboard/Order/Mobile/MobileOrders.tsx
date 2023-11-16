import MobileOrder from "./MobileOrder";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "@/custom/helpers/reduxTypes";
import { Fragment } from "react";
import { ORDER } from "@/types/order";

const MobileOrders = () => {
  const { order } = useAppSelector((st) => st.order);
  return (
    <div className="mobile-dashboard  col gap ">
      <Fragment>
        {order?.map((order: ORDER, i: number) => {
          return <MobileOrder {...order} key={i} />;
        })}
      </Fragment>
      <Outlet />
    </div>
  );
};

export default MobileOrders;
