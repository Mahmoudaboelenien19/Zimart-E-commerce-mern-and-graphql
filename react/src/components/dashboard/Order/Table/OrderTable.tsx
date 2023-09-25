import React, { useContext } from "react";
import { checkContext } from "../Orders";
import Order from "./Order";
import { OrderInterface } from "@/interfaces/order";

const OrderTable = () => {
  const { dataShown } = useContext(checkContext);

  return (
    <table className="order box-shadow">
      <thead>
        <tr>
          <th className="first-table-head"> order id</th>
          <th> created At</th>
          <th>delivered At</th>
          <th> total </th>
          <th> order state </th>
        </tr>
      </thead>
      <tbody style={{ overflow: "hidden" }}>
        {dataShown.map((order: OrderInterface, i: number) => {
          return <Order key={i} {...order} />;
        })}
      </tbody>
    </table>
  );
};

export default OrderTable;
