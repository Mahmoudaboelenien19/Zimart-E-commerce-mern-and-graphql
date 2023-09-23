import React, { createContext, useState, useEffect } from "react";
import { authContextInterface, userDataState } from "../interfaces/user";
import { OnDataOptions, useMutation, useSubscription } from "@apollo/client";
import { GET_USER_DATA } from "../graphql/mutations/user";
import { useAppDispatch, useAppSelector } from "../custom/reduxTypes";
import { addToFavRedux } from "../redux/favSlice";
import { addToCartRedux } from "../redux/cartSlice";
import { ChildrenInterFace } from "../interfaces/general.js";
import { addToCompareRedux } from "../redux/compareSlice";
import {
  addToNotificatinsRedux,
  changeNotificationCount,
  notificationInterface,
} from "../redux/notificationsSlice";
import { New_Notification_Subscription } from "../graphql/mutations/order";
import { getnewAccess } from "../lib/getNewAccess";

export const isAuthContext = createContext({} as authContextInterface);
const IsAuthContextComponent = ({ children }: ChildrenInterFace) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [profile, setProfile] = useState<string>("");
  const [userData, setUserData] = useState({
    _id: "",
    email: "",
    name: "",
    fav: [],
    cart: [],
    compare: [],
    country: "",
    phone: "",
    role: "",
  } as userDataState);
  const [getData, { data }] = useMutation(GET_USER_DATA);
  const dispatch = useAppDispatch();
  const { fav } = useAppSelector((st) => st.fav);
  const { notificatins, count } = useAppSelector((st) => st.notification);
  const { cart } = useAppSelector((st) => st.cart);
  const { compare } = useAppSelector((st) => st.compare);

  const isAuthFn = async () => {
    const { id } = await getnewAccess();
    if (id) {
      setIsAuth(true);
      getData({
        variables: {
          id,
        },
      });
    } else {
      setIsAuth(false);
    }
  };

  useEffect(() => {
    if (userData?.email === "" || (userData?.email === "" && isAuth)) {
      /* 
      //userData?.email === "" && isAuth this condition as i set
      isAuth true when login */
      isAuthFn();
    }
  }, [isAuth]);
  console.log({ isAuth });
  const check =
    !cart.length && !notificatins.length && !compare.length && !fav.length;
  // this check variable because when i log in then log out then log in data added again
  useEffect(() => {
    if (data?.getUserData) {
      setUserData(data?.getUserData);
    }
  }, [data?.getUserData?.name]);

  useEffect(() => {
    if (userData?.email && check && isAuth) {
      setUserId(userData._id);
      dispatch(addToFavRedux(userData?.fav));
      dispatch(addToCartRedux(userData.cart));
      dispatch(addToCompareRedux(userData.compare));
      dispatch(
        addToNotificatinsRedux(userData.notifications.slice(0).reverse())
      );
      dispatch(changeNotificationCount(userData.notificationsCount));
    }
    setProfile(userData.image);

    if (
      userData?.role === "admin" ||
      userData?.role === "owner" ||
      userData?.role === "moderator"
    ) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [userData?.email, isAuth]);

  useSubscription(New_Notification_Subscription, {
    onData: (
      data: OnDataOptions<{ NotificationAdded: notificationInterface }>
    ) => {
      dispatch(addToNotificatinsRedux(data?.data?.data?.NotificationAdded));
      dispatch(changeNotificationCount(count + 1));
    },
  });

  return (
    <isAuthContext.Provider
      value={{
        setUserData,
        isAuth,
        email: userData.email,
        name: userData.name,
        country: userData.country,
        phone: userData.phone,
        setIsAuth,
        userId,
        profile,
        setProfile,
        isAdmin,
      }}
    >
      {children}
    </isAuthContext.Provider>
  );
};

export default IsAuthContextComponent;
