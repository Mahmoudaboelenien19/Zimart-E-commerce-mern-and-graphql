import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { OnDataOptions, useSubscription } from "@apollo/client";
import { useAppSelector } from "@/custom/reduxTypes";
import useProductsSubscription from "@/custom/useProductsSubscription";
import useUserSubscription from "@/custom/useUserSubscription";
import { Order_Created_Subscription } from "@/graphql/mutations/order";

export const Component = () => {
  const { count } = useAppSelector((st) => st.notification);

  useEffect(() => {
    document.title = `${count >= 1 ? `(${count}) ` : ""}Dashboard`;
  }, [count]);

  // useSubscription(Order_Created_Subscription, {
  //   onData: (data: OnDataOptions<{ OrderCreated: OrderInterface }>) => {
  //     dispatch(addToOrderRedux(data?.data?.data?.OrderCreated));
  //   },
  // });

  useProductsSubscription();
  useUserSubscription();

  return (
    <div className="dashboard-par ">
      <Outlet />
    </div>
  );
};
