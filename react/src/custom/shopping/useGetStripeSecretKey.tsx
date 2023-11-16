import { get_Stripe_Secret } from "@/graphql/stripe";
import { OrderDetails } from "@/types/general";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiFillWarning } from "react-icons/ai";

const useGetStripeSecretKey = (disabled: boolean, products: OrderDetails[]) => {
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
  return { isClicked, clientSecret, getSecretKey };
};

export default useGetStripeSecretKey;
