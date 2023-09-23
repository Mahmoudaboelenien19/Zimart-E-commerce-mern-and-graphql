import React, { Fragment, useContext, useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { Navigate, useLocation } from "react-router-dom";
import OrderedProduct from "./OrderedProducts";
import GridLoader from "../widgets/loaders/GridLoader";

import FadeElement from "../widgets/animation/FadeElement";
import OrderedProductDetail from "./OrderedProductDetail";
import { useQuery } from "@apollo/client";
import { themeContext } from "@/context/ThemContext";
import { get_Stripe_PublicKey } from "@/graphql/stripe";
import { OrderInterface } from "@/interfaces/order";

export const Component = () => {
  const location = useLocation();

  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const clientSecret = location.state?.clientSecret || null;
  const products = location.state?.products || [];
  const { data } = useQuery(get_Stripe_PublicKey);
  useEffect(() => {
    document.title = "Payment";
  }, []);
  useEffect(() => {
    if (data?.getPublickKey) {
      setStripePromise(
        loadStripe(data?.getPublickKey.key) as unknown as Stripe
      );
    }
  }, [data?.getPublickKey]);
  const totalOrderCost = products.reduce(
    (acc: number, cur: OrderInterface) => cur.price * cur.count + acc,
    0
  );
  const { theme } = useContext(themeContext);
  if (!stripePromise && !clientSecret) return <Navigate to={"/"} />;
  return (
    <div className=" payment between ">
      {stripePromise && clientSecret ? (
        <>
          <FadeElement cls="ordered-products col" delay={0.4}>
            {products?.map(
              (
                ar: { title: string; price: number; count: number },
                i: number
              ) => {
                return (
                  <Fragment key={ar.title}>
                    <OrderedProduct {...ar} i={i + 1} />
                    <div className="pay-or"></div>
                  </Fragment>
                );
              }
            )}
            <OrderedProductDetail detail="Total :" value={totalOrderCost} />
          </FadeElement>
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                variables: {
                  colorText: "grey",
                  colorBackground: theme === "light" ? "white" : "black",
                },
              },
            }}
          >
            <CheckoutForm products={products} />
          </Elements>
        </>
      ) : (
        <>
          <GridLoader cls="loading center" />
        </>
      )}
    </div>
  );
};
