import { useAppSelector } from "@/custom/reduxTypes";
import { OrderInterface } from "@/interfaces/order";
import React from "react";
import OrderRecap from "./OrderRecap";

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
