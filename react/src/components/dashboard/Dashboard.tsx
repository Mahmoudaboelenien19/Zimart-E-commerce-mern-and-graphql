import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { isAuthContext } from "../../context/isAuth";
import { useAppDispatch, useAppSelector } from "../../custom/reduxTypes";
import { OnDataOptions, useQuery, useSubscription } from "@apollo/client";
import { Order_Created_Subscription } from "../../graphql/mutations/order";
import { GET_ALL_ORDERS } from "../../graphql/queries";
import { addToOrderRedux } from "../../redux/OrderSlice";
import { GET_ALL_USERS } from "../../graphql/mutations/user";
import { addToUserRedux } from "../../redux/UserSlice";
import { OrderInterface } from "../../interfaces/order";
interface contextInterface {
  showAsideDash: boolean;
  setShowAsideDash: React.Dispatch<React.SetStateAction<boolean>>;
}

export const showAsideContext = createContext({} as contextInterface);

const Dashboard = () => {
  const { count } = useAppSelector((st) => st.notification);
  const { order } = useAppSelector((st) => st.order);
  const { user } = useAppSelector((st) => st.user);

  const { isAuth } = useContext(isAuthContext);
  useEffect(() => {
    document.title = `${count >= 1 ? `(${count}) ` : ""}Dashboard`;
  }, [count]);
  const [showAsideDash, setShowAsideDash] = useState(
    Boolean(JSON.parse(sessionStorage.getItem("show-aside") || "false"))
  );

  if (!isAuth) {
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

  return (
    <showAsideContext.Provider value={{ showAsideDash, setShowAsideDash }}>
      <div className="dashboard-par ">
        <Outlet />
      </div>
    </showAsideContext.Provider>
  );
};

export default Dashboard;
