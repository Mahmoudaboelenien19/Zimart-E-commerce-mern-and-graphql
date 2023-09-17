import React from "react";
import OrderDetail from "../Table/OrderDetail";

import { motion } from "framer-motion";
import { reverseVariant } from "@/variants/globals";
interface Props {
  delivered: string;
  created: string;
  total: number;
}
const OrderSummery = ({ total, created, delivered }: Props) => {
  const orderArr = [
    {
      span: "createdTime",
      value: new Date(created).toLocaleTimeString(),
    },
    {
      span: "createdDate",
      value: new Date(created).toLocaleDateString(),
    },
    {
      span: "deliveredTime",
      value: delivered ? new Date(delivered).toLocaleTimeString() : "_",
    },
    {
      span: "deliveredDate",
      value: delivered ? new Date(delivered).toLocaleDateString() : "_",
    },
    {
      span: "subTotal",
      value: "$ " + String(total.toFixed(2)),
    },
    {
      span: "delivery fees",
      value: "$ 0.00",
    },
  ];
  return (
    <motion.div variants={reverseVariant} className="box-shadow order-summery">
      <h3 className="underline header">order summery</h3>
      {orderArr.map((obj, i) => {
        return <OrderDetail key={i} {...obj} />;
      })}
    </motion.div>
  );
};

export default OrderSummery;
