import { type ORDER } from "@/types/order";
import OrderDetailTr from "./OrderDetialTr";

type Props = {
  products: ORDER[];
};
const OrderDetailsTable = ({ products }: Props) => {
  return (
    <table className="table-order-detail box-shadow">
      <thead>
        <tr>
          <th>items summary</th>
          <th>QTY</th>
          <th>Price</th>
          <th>total price</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((ob: ORDER) => {
          return <OrderDetailTr key={ob.image} {...ob} />;
        })}
      </tbody>
    </table>
  );
};

export default OrderDetailsTable;
