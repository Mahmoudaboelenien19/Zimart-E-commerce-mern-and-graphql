import { isAuthContext } from "@/context/isAuth";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { isAuth } = useContext(isAuthContext);
  console.log({ isAuth });
  if (isAuth) {
    return (
      <>
        <Outlet />
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
