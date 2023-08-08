import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import ThemeToggle from "../widgets/ThemeToggle";
import NotificationDropDown from "./Notification/NotificationDropDown";
import MenuTogglar from "../widgets/MenuTogglar";
import { isAuthContext } from "../../context/isAuth";
import { useAppSelector } from "../../custom/reduxTypes";
interface contextInterface {
  showAsideDash: boolean;
  setShowAsideDash: React.Dispatch<React.SetStateAction<boolean>>;
}

export const showAsideContext = createContext({} as contextInterface);

const Dashboard = () => {
  const { count } = useAppSelector((st) => st.notification);

  const { isAuth } = useContext(isAuthContext);
  useEffect(() => {
    document.title = `${count >= 1 ? `(${count}) ` : ""}Dashboard`;
  }, [count]);
  const [showAsideDash, setShowAsideDash] = useState(
    Boolean(JSON.parse(sessionStorage.getItem("show-aside")!)) || false
  );

  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }
  return (
    <showAsideContext.Provider value={{ showAsideDash, setShowAsideDash }}>
      <div className="dashboard-par ">
        <div className="dash-nav center">
          <ThemeToggle />
          <NotificationDropDown />
          <MenuTogglar
            bool={showAsideDash}
            setter={setShowAsideDash}
            hideMsg="hide dashboard"
            showMsg="show dashboard"
          />
        </div>

        <Outlet />
      </div>
    </showAsideContext.Provider>
  );
};

export default Dashboard;
