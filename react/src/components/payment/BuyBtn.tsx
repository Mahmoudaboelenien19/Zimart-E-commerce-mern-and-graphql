import React, { useState } from "react";

import MainBtn from "../widgets/buttons/MainBtn";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { Navigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { get_Stripe_Secret } from "../../graphql/stripe.js";

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
}
const BuyBtn = ({ products }: Props) => {
  const [clientSecret, setClientSecret] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [fn] = useMutation(get_Stripe_Secret, {
    variables: {
      input: products,
    },
  });
  const getSecretKey = async () => {
    setIsClicked(true);
    const { data } = (await fn()) as unknown as {
      data: { getKey: { clientSecret: string } };
    };
    if (data?.getKey?.clientSecret) {
      setClientSecret(data?.getKey?.clientSecret);
    }
  };
  return (
    <>
      <MainBtn
        cls="btn btn-buy center gap"
        fn={getSecretKey}
        Icon={BiPurchaseTagAlt}
        btn="Buy Now"
        isPending={Boolean(clientSecret) || isClicked}
      />
      {clientSecret && (
        <Navigate to="/payment" state={{ products, clientSecret }} />
      )}
    </>
  );
};

export default BuyBtn;
