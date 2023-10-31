interface Props {
  span: string;
  value: string;
}
const OrderDetail = ({ span, value }: Props) => {
  return (
    <div className="order-detail center between ">
      <span>{span}</span>
      <span>{value}</span>
    </div>
  );
};

export default OrderDetail;
