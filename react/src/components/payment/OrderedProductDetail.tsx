import React from "react";
import StyledPrice from "../widgets/StyledPrice";

interface Props {
  detail: string;
  value: string | number;
}
const OrderedProductDetail = ({ detail, value }: Props) => {
  return (
    <div style={{ fontSize: "1.2rem" }}>
      <div className="center gap">
        <span className="detail">{detail}</span>
        <span className="value">
          {detail === "price :" || detail === "Total :" ? (
            <StyledPrice price={Number(value)} />
          ) : (
            value
          )}
        </span>
      </div>
    </div>
  );
};

export default OrderedProductDetail;
