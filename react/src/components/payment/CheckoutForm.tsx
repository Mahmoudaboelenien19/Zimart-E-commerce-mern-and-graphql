import React, { PaymentElement } from "@stripe/react-stripe-js";
import { FormEvent, useContext, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";

import SmallLoader from "../widgets/loaders/SmallLoader";
import { Navigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { isAuthContext } from "@/context/isAuth";
import { create_Order } from "@/graphql/mutations/order";
import { ProductInterface } from "@/interfaces/product";

export default function CheckoutForm({
  products,
}: {
  products: ProductInterface[];
}) {
  const { email, userId } = useContext(isAuthContext);
  const [fn] = useMutation(create_Order, {
    variables: {
      input: { products, email, userId },
    },
  });
  const [isComplete, setIsComplete] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!elements || !stripe || !isComplete) {
      return;
    } else {
      const emptyFields = [];
      for (const input of document.querySelectorAll("input")) {
        if (input.value === "") {
          emptyFields.push(input.name);
        }
      }

      if (emptyFields.length > 0) {
        return;
      }
      setIsProcessing(true);
      const { data } = await fn();

      if (data?.createOrder?.status === 200) {
        setOrderId(data.createOrder.orderId);
      }
      await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin,
        },
        redirect: "if_required",
      });
      setIsProcessing(false);
    }
  };

  return (
    <form className=" center" id="payment-form" onSubmit={handleSubmit}>
      <h3
        className="header underline underline-sm header-sm"
        style={{ color: "white" }}
      >
        zimart payment
      </h3>

      <PaymentElement
        id="paymentElement"
        onChange={(e) => setIsComplete(e.complete)}
      />
      <button
        style={{ opacity: isProcessing ? 0.5 : 1 }}
        disabled={isProcessing || !stripe || !elements}
        className="btn main center gap"
      >
        {isProcessing && <SmallLoader />}Pay now
      </button>
      {orderId && <Navigate to="/?success=true" state={{ orderId }} />}
    </form>
  );
}
