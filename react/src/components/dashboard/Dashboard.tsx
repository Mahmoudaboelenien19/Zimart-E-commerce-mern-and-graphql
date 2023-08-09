import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

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
    Boolean(JSON.parse(sessionStorage.getItem("show-aside") || "false"))
  );

  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }
  return (
    <showAsideContext.Provider value={{ showAsideDash, setShowAsideDash }}>
      <div className="dashboard-par ">
        <Outlet />
      </div>
    </showAsideContext.Provider>
  );
};

export default Dashboard;
