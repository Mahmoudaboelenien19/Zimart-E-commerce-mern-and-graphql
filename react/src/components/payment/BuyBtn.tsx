import { useState } from "react";

import MainBtn from "../widgets/buttons/MainBtn";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { Navigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { get_Stripe_Secret } from "../../graphql/stripe.js";
import { toast } from "react-hot-toast";
import { AiFillWarning } from "react-icons/ai";

interface Props {
  products: {
    parentId: string;
    path: string;
    count: number;
    productId: string;
    _id: string;
    price: number;
    title: string;
  }[];
  disabled?: boolean;
}
const BuyBtn = ({ products, disabled = false }: Props) => {
  const [clientSecret, setClientSecret] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [fn] = useMutation(get_Stripe_Secret, {
    variables: {
      input: products,
    },
  });
  const getSecretKey = async () => {
    try {
      if (!disabled) {
        setIsClicked(true);
        const { data } = (await fn()) as unknown as {
          data: { getKey: { clientSecret: string } };
        };
        if (data?.getKey?.clientSecret) {
          setClientSecret(data?.getKey?.clientSecret);
          setIsClicked(false);
        }
      } else {
        toast("this product is out of stock", {
          icon: <AiFillWarning fontSize={18} color="var(--star)" />,
        });
        setIsClicked(false);
      }
    } catch (err: unknown) {
      if ((err as Error).message === "Not Authorised!") {
        toast.error("log in to buy this product");
        setIsClicked(false);
      }
    }
  };
  return (
    <>
      <MainBtn
        className="btn btn-buy center gap"
        onClick={getSecretKey}
        Icon={BiPurchaseTagAlt}
        btn="Buy Now"
        disabled={disabled || Boolean(clientSecret) || isClicked}
      />
      {clientSecret && (
        <Navigate to="/payment" state={{ products, clientSecret }} />
      )}
    </>
  );
};

export default BuyBtn;
