import { isAuthContext } from "@/context/isAuth";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const NotAuthedRoutes = () => {
  const { isAuth } = useContext(isAuthContext);

  return <>{isAuth ? <Navigate to="/" /> : <Outlet />}</>;
};
