import React, { Fragment } from "react";

import OrderDetail from "../Table/OrderDetail";
import { motion } from "framer-motion";
import { reverseVariant } from "../../../../variants/globals";
interface Props {
  userId: string;
  state: string;
  email: string;
  name: string;
  cost: number;
}
const Customer = ({ state, cost, email, name }: Props) => {
  const dataArr = [
    { span: "customer name", value: name },
    { span: "customer email", value: email },
    { span: "order state", value: state },
    { span: "total", value: `$ ${cost}` },
    { span: "note", value: "N/A" },
  ];
  return (
    <motion.div
      variants={reverseVariant}
      custom={"first"}
      className="box-shadow customer"
    >
      <h2>customer and order details</h2>
      <div className="hr"></div>

      {dataArr.map((obj, i) => {
        return (
          <Fragment key={i}>
            <OrderDetail {...obj} />
            <div className="hr"></div>
          </Fragment>
        );
      })}
    </motion.div>
  );
};

export default Customer;
