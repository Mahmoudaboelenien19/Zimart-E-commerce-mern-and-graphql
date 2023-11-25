import React, { Fragment, useEffect, useRef } from "react";
import { Children } from "./types/general";
import { getnewAccess } from "./lib/functions/getNewAccess";
import { useAppDispatch } from "./custom/helpers/reduxTypes";
import { setIsAuth, updateUserId } from "./redux/Auth";

const AppWrapper = ({ children }: Children) => {
  const isAuthFn = async () => {
    const { id } = await getnewAccess();
    return id;
  };

  const dispatch = useAppDispatch();
  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      isAuthFn().then((id) => {
        if (id) {
          dispatch(setIsAuth(true));
          dispatch(updateUserId(id));
        } else {
          dispatch(setIsAuth(false));
        }
      });
    }
  }, []);
  return <Fragment>{children}</Fragment>;
};

export default AppWrapper;
