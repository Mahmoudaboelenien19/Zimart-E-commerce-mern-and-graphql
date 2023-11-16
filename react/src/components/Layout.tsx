import { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Nav from "./Nav/main/Nav";
import toast from "react-hot-toast";
import useParams from "@/custom/helpers/useParams";

const Layout = () => {
  const { deleteParam, getParam } = useParams();
  const isLog = getParam("isLogged");
  const isRegistered = getParam("isRegistered");
  useEffect(() => {
    if (isLog === "") return;
    if (isLog) {
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
      <ScrollRestoration
        getKey={(location, matches) => {
          return location.pathname.startsWith("/product/")
            ? location.key
            : location.pathname;
        }}
      />
      <Nav />

      <Outlet />
    </>
  );
};

export default Layout;
