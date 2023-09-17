import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { OnDataOptions, useQuery, useSubscription } from "@apollo/client";
import { isAuthContext } from "@/context/isAuth";
import { useAppSelector, useAppDispatch } from "@/custom/reduxTypes";
import useProductsSubscription from "@/custom/useProductsSubscription";
import useUserSubscription from "@/custom/useUserSubscription";
import { Order_Created_Subscription } from "@/graphql/mutations/order";
import { GET_ALL_USERS } from "@/graphql/mutations/user";
import { GET_ALL_ORDERS } from "@/graphql/queries";
import { OrderInterface } from "@/interfaces/order";
import { addToOrderRedux } from "@/redux/OrderSlice";
import { addToUserRedux } from "@/redux/UserSlice";

const Dashboard = () => {
  const { count } = useAppSelector((st) => st.notification);
  const { order } = useAppSelector((st) => st.order);
  const { user } = useAppSelector((st) => st.user);

  const { isAuth } = useContext(isAuthContext);
  /* Note
   *this state tomake check only at first render
   * as if user use dashboard logout  the app thrown
   * as it redirect to login page twice
   */
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    document.title = `${count >= 1 ? `(${count}) ` : ""}Dashboard`;
  }, [count]);

  useEffect(() => {
    setTimeout(() => {
      setIsInitial(false);
    }, 200);
  }, []);

  if (!isAuth && isInitial) {
    return <Navigate to={"/login"} />;
  }
  const { data: orderData } = useQuery(GET_ALL_ORDERS);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (orderData?.orders && order.length === 0) {
      const ar = orderData?.orders.slice(0).reverse();
      dispatch(addToOrderRedux(ar));
    }
  }, [orderData?.orders]);
  useSubscription(Order_Created_Subscription, {
    onData: (data: OnDataOptions<{ OrderCreated: OrderInterface }>) => {
      dispatch(addToOrderRedux(data?.data?.data?.OrderCreated));
    },
  });

  const { data: userData, loading: usersLoading } = useQuery(GET_ALL_USERS);
  useEffect(() => {
    if (userData?.users && !usersLoading && user.length === 0) {
      const ar = userData?.users.slice(0).reverse();
      dispatch(addToUserRedux(ar));
    }
  }, [usersLoading]);

  useProductsSubscription();
  useUserSubscription();
  return (
    <div className="dashboard-par ">
      <Outlet />
    </div>
  );
};

export default Dashboard;
