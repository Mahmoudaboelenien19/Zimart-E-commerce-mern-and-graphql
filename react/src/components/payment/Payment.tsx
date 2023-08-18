import React, { useContext, useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { Navigate, useLocation } from "react-router-dom";
import OrderedProduct from "./OrderedProducts";
import GridLoader from "../widgets/GridLoader";
import { themeContext } from "../../context/ThemContext";
import FadeElement from "../widgets/FadeElement";
import OrderedProductDetail from "./OrderedProductDetail";
import { useQuery } from "@apollo/client";
import { get_Stripe_PublicKey } from "../../graphql/stripe";
import { OrderInterface } from "../../interfaces/order";
const Payment = () => {
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
  if (!stripePromise && !clientSecret) return <Navigate to={"/"} />;
  const { theme } = useContext(themeContext);
  return (
    <div className=" payment between ">
      {stripePromise ? (
        <>
          <FadeElement cls="ordered-products col" delay={0.4}>
            {products?.map(
              (
                ar: { title: string; price: number; count: number },
                i: number
              ) => {
                return <OrderedProduct key={ar.title} {...ar} i={i + 1} />;
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
export default Payment;
