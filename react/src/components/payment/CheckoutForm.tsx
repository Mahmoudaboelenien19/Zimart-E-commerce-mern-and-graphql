import { PaymentElement } from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Navigate, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { create_Order } from "@/graphql/mutations/order";
import FetchLoading from "../widgets/loaders/FetchLoading";
import { useAppSelector } from "@/custom/helpers/reduxTypes";
import Header from "../widgets/shared/Header";

export default function CheckoutForm() {
  const location = useLocation();

  const products = location.state?.products || [];
  const { name } = useAppSelector((st) => st.userData);
  const { userId } = useAppSelector((st) => st.isAuth);
  const [fn] = useMutation(create_Order, {
    variables: {
      input: { products, name, userId },
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
      <Header head={"zimart payment"} />
      <p>
        Securely submit your payment information for a seamless transaction
        experience. !
      </p>
      <PaymentElement
        id="paymentElement"
        onChange={(e) => setIsComplete(e.complete)}
      />
      <button
        style={{ opacity: isProcessing ? 0.5 : 1 }}
        disabled={isProcessing || !stripe || !elements}
        className="btn main center gap"
      >
        {isProcessing && <FetchLoading />}Pay now
      </button>
      {orderId && <Navigate to="/?success=true" state={{ orderId }} />}
    </form>
  );
}
