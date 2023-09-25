import React from "react";
import { Navigate, Outlet } from "react-router-dom";

type Props = { isAuth: boolean; isInitialRender: boolean };
export const NotAuthedRoutes = ({ isAuth, isInitialRender }: Props) => {
  return <>{isAuth ? <Navigate to="/" /> : <Outlet />}</>;
};
