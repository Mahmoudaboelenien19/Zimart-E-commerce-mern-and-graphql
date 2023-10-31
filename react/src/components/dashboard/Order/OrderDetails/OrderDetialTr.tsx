import { useEffect } from "react";
interface Props {
  image: string;
  title: string;
  price: number;
  count: number;
}
const OrderDetailTr = ({ image, title, price, count }: Props) => {
  useEffect(() => {
    if (title) {
      document.title = `Orders | ${title || ""}`;
    }
  }, [title]);
  return (
    <tr>
      <td>
        <img width={30} src={image} alt="" />

        <span className="table-order       ">{title}</span>
      </td>
      <td>
        <span style={{ color: "var(--wheat-lighter)" }} className="shadow">
          x
        </span>
        {count}
      </td>
      <td>
        {" "}
        <span style={{ color: "var(--wheat-lighter)" }} className="shadow">
          {" "}
          $
        </span>{" "}
        {price.toFixed(2)}{" "}
      </td>
      <td>
        {" "}
        <span style={{ color: "var(--wheat-lighter)" }} className="shadow">
          {" "}
          $
        </span>{" "}
        {(price * count).toFixed(2)}{" "}
      </td>
    </tr>
  );
};

export default OrderDetailTr;
