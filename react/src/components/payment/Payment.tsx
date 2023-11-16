import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { get_Stripe_PublicKey } from "@/graphql/stripe";
import useTitle from "@/custom/helpers/useTitle";
import Transition from "../widgets/animation/transition/Transition";
import Container from "../widgets/shared/Container";
import PurchaseDetails from "./PurchaseDetails";
import { useAppSelector } from "@/custom/helpers/reduxTypes";

export const Payment = () => {
  const location = useLocation();
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const clientSecret = location.state?.clientSecret || null;
  const { data } = useQuery(get_Stripe_PublicKey);
  useTitle("Payment");

  useEffect(() => {
    if (data) {
      setStripePromise(
        loadStripe(data?.getPublickKey.key) as unknown as Stripe
      );
    }
  }, [data]);

  const { theme } = useAppSelector((st) => st.theme);
  if (!stripePromise && !clientSecret) return <Navigate to={"/"} />;
  return (
    <Container className=" payment  ">
      <Transition />
      {stripePromise && clientSecret ? (
        <>
          <PurchaseDetails />

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
            <CheckoutForm />
          </Elements>
        </>
      ) : (
        <> </>
      )}
    </Container>
  );
};
