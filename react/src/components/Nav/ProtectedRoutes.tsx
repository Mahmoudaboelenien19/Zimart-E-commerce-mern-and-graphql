import { useAppSelector } from "@/custom/helpers/reduxTypes";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = () => {
  const { isAuth } = useAppSelector((st) => st.isAuth);

  return <>{isAuth ? <Outlet /> : <Navigate replace to={"/login"} />}</>;
};

export default ProtectedRoutes;
