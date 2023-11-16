import { useAppSelector } from "@/custom/helpers/reduxTypes";
import { Navigate, Outlet } from "react-router-dom";

export const NotAuthedRoutes = () => {
  const { isAuth } = useAppSelector((st) => st.isAuth);

  return <>{isAuth ? <Navigate to="/" replace /> : <Outlet />}</>;
};
