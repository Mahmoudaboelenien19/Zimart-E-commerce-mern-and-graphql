import StyledPrice from "../../widgets/StyledPrice";

interface Props {
  userId: string;
  createdAt: string;
  cost: number;
}
const OrderRecap = ({ userId, createdAt, cost }: Props) => {
  return (
    <div className={"center     between order-recap"}>
      <div className="col  order-recap-data ">
        <div className="center">
          {" "}
          <div className="details"> userID :</div>
          <p>{userId} </p>
        </div>
        <div className="center">
          <div className="details">createdAt:</div>
          <p>{new Date(createdAt).toLocaleDateString()}</p>{" "}
        </div>
      </div>
      <div className="center col " style={{ width: "fit-content" }}>
        <StyledPrice price={cost} />
      </div>
    </div>
  );
};

export default OrderRecap;
