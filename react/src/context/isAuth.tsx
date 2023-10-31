import { createContext, useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_DATA } from "../graphql/mutations/user";
import { useAppDispatch } from "../custom/reduxTypes";
import { addToFavRedux } from "../redux/favSlice";
import { addToCartRedux } from "../redux/cartSlice";
import { ChildrenInterFace } from "../interfaces/general.js";
import { addToCompareRedux } from "../redux/compareSlice";
import { getnewAccess } from "../lib/functions/getNewAccess";
import { authContextInterface } from "@/interfaces/user.interface";

export const isAuthContext = createContext({} as authContextInterface);
const IsAuthContextComponent = ({ children }: ChildrenInterFace) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [profile, setProfile] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [getData, { data, loading }] = useLazyQuery(GET_USER_DATA);
  const dispatch = useAppDispatch();
  const isAuthFn = async () => {
    const { id } = await getnewAccess();
    return id;
  };

  console.log(userId);
  useEffect(() => {
    isAuthFn().then((id) => {
      if (id) {
        setIsAuth(true);
        setUserId(id);
        getData({
          variables: {
            id,
          },
        });
      } else {
        setIsAuth(false);
      }
    });
  }, [isAuth]);
  const res = data?.getUserData;
  useEffect(() => {
    if (res?._id && !loading) {
      setProfile(res?.image);
      setName(res?.name);
      dispatch(addToFavRedux(res?.fav));
      dispatch(addToCartRedux(res?.cart));
      dispatch(addToCompareRedux(res?.compare));

      if (res?.role !== "user") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  }, [res?._id, isAuth]);

  return (
    <isAuthContext.Provider
      value={{
        isAuth,
        setUserId,

        setIsAuth,
        name,
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
