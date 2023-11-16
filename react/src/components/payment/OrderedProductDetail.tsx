interface Props {
  detail: string;
  value: string | number;
}
const OrderedProductDetail = ({ detail, value }: Props) => {
  return (
    <div className="details center gap">
      <span className="detail">{detail}</span>
      <span className="value">
        {value}
        {detail === "price :" && "  $"}
      </span>
    </div>
  );
};

export default OrderedProductDetail;
