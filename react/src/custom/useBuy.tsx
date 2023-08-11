import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useContext, useState } from "react";
import { isAuthContext } from "../context/isAuth";
import { cartInterface } from "../interfaces/user";
import { toast } from "react-hot-toast";
import { getnewAccess } from "../main";
import { StripeRoute, getStripePublicKeyRoute } from "../assets/routes.js";
const useBuy = (arrProducts: cartInterface[]) => {
  const { email, userId } = useContext(isAuthContext);
  const [isPending, setIsPending] = useState(false);

  const handlePurchase = async () => {
    setIsPending(true);
    try {
      const newAccessToken = await getnewAccess();
      const { data: key } = await axios.get(getStripePublicKeyRoute(), {
        headers: {
          Authorization: `Bearer ${newAccessToken}`,
        },
      });
      setIsPending(false);

      if (key) {
        const stripePromise = await loadStripe(key);
        const res = await axios.post(
          StripeRoute(userId),
          {
            products: arrProducts,
            email,
          },
          {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          }
        );
        await stripePromise?.redirectToCheckout({
          sessionId: res.data.id,
        });
      }
    } catch (err: unknown) {
      setIsPending(false);

      console.log(err);
      if ((err as Error).message === "Request failed with status code 401") {
        toast.error("Unauthorized access. Please login");
      }
    }
  };
  return { handlePurchase, isPending };
};

export default useBuy;
