import React from "react";
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
        <div> userID : {userId} </div>
        <div>createdAt: {new Date(createdAt).toLocaleDateString()} </div>
      </div>
      <div className="center col " style={{ width: "fit-content" }}>
        <StyledPrice price={cost} />
      </div>
    </div>
  );
};

export default OrderRecap;
