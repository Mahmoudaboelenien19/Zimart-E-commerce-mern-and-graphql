import { isAuthContext } from "@/context/isAuth";
import React, { useContext } from "react";
import { Navigate, Outlet, useLoaderData } from "react-router-dom";

const ProtectedRoutes = () => {
  //@ts-ignore
  // const { id } = useLoaderData();
  const { isAuth } = useContext(isAuthContext);

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
