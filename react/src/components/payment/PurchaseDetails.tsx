import { Details } from "@/types/general";
import { ORDER } from "@/types/order";
import { useLocation } from "react-router-dom";
import StyledPrice from "../widgets/StyledPrice";
import FadeElement from "../widgets/animation/FadeElement";
import OrderedProduct from "./OrderedProducts";

const PurchaseDetails = () => {
  const location = useLocation();

  const products = location.state?.products || [];
  const totalOrderCost = products.reduce(
    (acc: number, cur: ORDER) => cur.price * cur.count + acc,
    0
  );
  return (
    <FadeElement className="ordered-products w-100 col" delay={0.4}>
      {products?.map((ar: Details) => {
        if (ar) {
          return <OrderedProduct key={ar.title} {...ar} />;
        }
      })}

      <div className="details total-price-ordered">
        <div className="detail">Total :</div>{" "}
        <StyledPrice price={totalOrderCost} />
      </div>
    </FadeElement>
  );
};

export default PurchaseDetails;
