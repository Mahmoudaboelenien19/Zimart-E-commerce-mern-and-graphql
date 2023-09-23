import React from "react";
import {
  Navigate,
  Outlet,
  // useLoaderData,
} from "react-router-dom";

type Props = { isAuth: boolean };
export const NotAuthedRoutes = ({ isAuth }: Props) => {
  return <>{isAuth ? <Navigate to="/" /> : <Outlet />}</>;
};
