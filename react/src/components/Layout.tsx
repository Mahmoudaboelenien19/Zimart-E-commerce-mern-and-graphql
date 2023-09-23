import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav/main/Nav";
import toast from "react-hot-toast";
import useParams from "@/custom/useParams";
import { isAuthContext } from "@/context/isAuth";

const Layout = () => {
  const { deleteParam, getParam } = useParams();
  const { setIsAuth } = useContext(isAuthContext);
  const isLog = getParam("isLogged");
  const isRegistered = getParam("isRegistered");
  useEffect(() => {
    if (isLog === "") return;
    if (isLog) {
      setIsAuth(true);
      toast.success("successfully logged in");
    } else if (isLog === "false") {
      toast.success("this email is not registered");
    }
    deleteParam("isLogged");
  }, []);
  useEffect(() => {
    if (isRegistered === "") return;
    if (isRegistered === "true") {
      toast.success("this email is registered");
    }
    deleteParam("isRegistered");
  }, []);
  return (
    <>
      <Nav />
      <>
        <Outlet />
      </>
    </>
  );
};

export default Layout;
