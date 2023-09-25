import React from "react";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  isAuth: boolean;
};
const ProtectedRoutes = ({ isAuth }: Props) => {
  return <>{isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default ProtectedRoutes;
