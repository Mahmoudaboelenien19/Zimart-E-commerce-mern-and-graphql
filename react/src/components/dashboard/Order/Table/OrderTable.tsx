import Order from "./Order";
import { OrderInterface } from "@/interfaces/order.interface";
import { useAppSelector } from "@/custom/reduxTypes";

const OrderTable = () => {
  const { order } = useAppSelector((st) => st.order);
  return (
    <table className="dash-table">
      <thead>
        <tr>
          <th className="first-table-head"> Id</th>
          <th> Created at</th>
          <th>Delivered at</th>
          <th> Total </th>
          <th> State </th>
        </tr>
      </thead>
      <tbody>
        {order.map((order: OrderInterface, i: number) => {
          return <Order key={i} {...order} />;
        })}
      </tbody>
    </table>
  );
};

export default OrderTable;
