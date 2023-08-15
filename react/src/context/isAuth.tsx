import React, { createContext, useState, useEffect } from "react";
import {
  cartInterface,
  compareInterface,
  favInterface,
} from "../interfaces/user";
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
import { backendRoute } from "../assets/routes";
import axios from "axios";
import { New_Notification_Subscription } from "../graphql/mutations/order";

interface userDataState {
  email: string;
  name: string;
  country: string;
  phone: string;
  fav?: favInterface[];
  cart?: cartInterface[];
  compare?: compareInterface[];
  //-imp to use braket notation wuth variables
  [key: string]: any;
}

interface authContextInterface extends userDataState {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
  profile: string;
  setProfile: React.Dispatch<React.SetStateAction<string>>;
}

export const isAuthContext = createContext({} as authContextInterface);

const IsAuthContextComponent = ({ children }: ChildrenInterFace) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState<string>("");

  const [profile, setProfile] = useState<string>("");
  const [userData, setUserData] = useState({
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
    const {
      data: { access_token, refresh_token, user_id },
    } = await axios.get(`${backendRoute}cookie`, {
      withCredentials: true,
    });
    if (access_token && refresh_token) {
      setIsAuth(true);
      setUserId(user_id);
      getData({
        variables: {
          id: user_id,
        },
      });
    } else {
      setIsAuth(false);
    }
  };
  useEffect(() => {
    isAuthFn();
  }, [isAuth]);

  const check =
    !cart.length && !notificatins.length && !compare.length && !fav.length;
  // this check variable because when i log in then log out then log in data added again
  useEffect(() => {
    if (data?.getUserData && check) {
      const notificationsArr = data?.getUserData?.notifications
        .slice(0)
        .reverse();
      setUserData(data?.getUserData);
      dispatch(addToFavRedux(data?.getUserData?.fav));
      dispatch(addToCartRedux(data?.getUserData?.cart));
      dispatch(addToCompareRedux(data?.getUserData?.compare));
      dispatch(addToNotificatinsRedux(notificationsArr));
      dispatch(changeNotificationCount(data?.getUserData?.notificationsCount));
      setProfile(data?.getUserData?.image);
    }
  }, [data?.getUserData?.name]);

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
        isAuth,
        email: userData.email,
        name: userData.name,
        country: userData.country,
        phone: userData.phone,
        image: userData.image,
        setIsAuth,
        userId,
        profile,
        setProfile,
      }}
    >
      {children}
    </isAuthContext.Provider>
  );
};

export default IsAuthContextComponent;
