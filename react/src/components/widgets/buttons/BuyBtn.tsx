import MainBtn from "./MainBtn";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { Navigate } from "react-router-dom";
import { type OrderDetails } from "@/types/general";
import useGetStripeSecretKey from "@/custom/shopping/useGetStripeSecretKey";
import { Fragment } from "react";

interface Props {
  products: OrderDetails[];
  disabled?: boolean;
}
const BuyBtn = ({ products, disabled = false }: Props) => {
  const { clientSecret, getSecretKey, isClicked } = useGetStripeSecretKey(
    disabled,
    products
  );
  return (
    <Fragment>
      <MainBtn
        className="btn btn-buy  center gap"
        onClick={getSecretKey}
        Icon={BiPurchaseTagAlt}
        btn="Buy Now"
        disabled={disabled || Boolean(clientSecret)}
        loading={isClicked}
      />
      {clientSecret && (
        <Navigate to="/payment" state={{ products, clientSecret }} />
      )}
    </Fragment>
  );
};

export default BuyBtn;
