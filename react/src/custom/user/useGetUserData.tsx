import { GET_USER_DATA } from "@/graphql/mutations/user";
import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../helpers/reduxTypes";
import { updateUserData } from "@/redux/userDataSlice";
import { addToCartRedux } from "@/redux/cartSlice";
import { addToCompareRedux } from "@/redux/compareSlice";
import { addToFavRedux } from "@/redux/favSlice";

const useGetUserData = () => {
  const { isAuth, userId } = useAppSelector((st) => st.isAuth);

  const [getData] = useLazyQuery(GET_USER_DATA);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) {
      console.log("useGetUserData effect rerendered");
      getData({
        variables: {
          id: userId,
        },
      }).then(({ data }) => {
        const { fav, cart, compare, notifications, ...userData } =
          data.getUserData;
        dispatch(addToFavRedux(fav));
        dispatch(addToCartRedux(cart));
        dispatch(addToCompareRedux(compare));
        dispatch(updateUserData(userData));
      });
    }
  }, [isAuth]);

  return;
};

export default useGetUserData;
