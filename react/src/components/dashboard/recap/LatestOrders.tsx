import React from "react";
import { useAppSelector } from "../../../custom/reduxTypes";
import OrderRecap from "./OrderRecap";
import { OrderInterface } from "../../../interfaces/order";

const LatestOrders = () => {
  const { order } = useAppSelector((st) => st.order);
  return (
    <div className="col center order-recap-par">
      {order.slice(0, 4).map((order: OrderInterface) => {
        return <OrderRecap key={order._id} {...order} />;
      })}
    </div>
  );
};

export default LatestOrders;
