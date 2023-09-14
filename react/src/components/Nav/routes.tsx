import React, { Suspense, useContext, useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../log/login";
import SignUp from "../log/SignUp";
import Cart from "./cart/Cart";
import Product from "../product Route/Product";
import User from "../user/User";
import { AnimatePresence } from "framer-motion";
import Dashboard from "../dashboard/Dashboard";
import DashProducts from "../dashboard/dash-products/DashProducts";
// import UpdateProduct from "./dashboard/UpdateProduct";
import DashUpdateProduct from "../dashboard/form/DashUpdateProduct";
import DashAddProduct from "../dashboard/form/DashAddProduct";
import Orders from "../dashboard/Order/Orders";
import CompareProducts from "../Compare/CompareProducts";
import OrderDetails from "../dashboard/Order/OrderDetails/OrderDetails";
import { toast } from "react-hot-toast";
import { isAuthContext } from "../../context/isAuth";
import Recap from "../dashboard/recap/Recap";
import UsersDashboard from "../dashboard/User/UsersDashboard";
import FaqComponent from "../user/Faq";
import Blogs from "../blogs/Blogs";
import Blog from "../blogs/Blog";
import ContactUs from "../contactUs/ContactUs";
import Payment from "../payment/Payment";

const AppRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check isLogged and do something
  const [islog, setIslog] = useState("");
  const [isRegistered, setIsRegistered] = useState("");
  const { setIsAuth } = useContext(isAuthContext);
  const handleShowToastLogIn = () => {
    const query = new URLSearchParams(location.search);
    const isLoggedvalue = query.get("isLogged");
    if (isLoggedvalue === "true") {
      setIslog("true");
    } else if (isLoggedvalue === "false") {
      setIslog("false");
    }
  };

  const handleShowToastSignUp = () => {
    const query = new URLSearchParams(location.search);
    const isRegisteredVal = query.get("isRegistered");
    if (isRegisteredVal === "true") {
      setIsRegistered("true");
    } else if (isRegisteredVal === "false") {
      setIsRegistered("false");
    }
  };
  useEffect(() => {
    handleShowToastLogIn();
    handleShowToastSignUp();
  }, []);

  useEffect(() => {
    if (islog === "") return;
    if (islog === "true") {
      setIsAuth(true);
      toast.success("successfully logged in");
    } else if (islog === "false") {
      toast.success("this email is not registered");
    }
    navigate(location.pathname.replace("?isLogged=true", ""), {
      replace: true,
    });

    const timer = setTimeout(() => {
      setIslog("");
    }, 1000);
    return () => clearTimeout(timer);
  }, [islog]);

  useEffect(() => {
    if (isRegistered === "") return;
    if (isRegistered === "true") {
      toast.success("this email is registered");
    }
    navigate(location.pathname.replace("?isRegistered=true", ""), {
      replace: true,
    });
    const timer = setTimeout(() => {
      setIsRegistered("");
    }, 1000);
    return () => clearTimeout(timer);
  }, [isRegistered]);
  return (
    <AnimatePresence
      // initial={false}
      mode="wait"
    >
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/faq" element={<FaqComponent />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user" element={<User />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/compare" element={<CompareProducts />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Recap />} />
          <Route path="users" element={<UsersDashboard />} />
          <Route path="products">
            <Route path="add" element={<DashAddProduct />} />
            <Route path=":id" element={<DashUpdateProduct />} />
            <Route path="" element={<DashProducts />} />
          </Route>
          <Route path="orders">
            <Route path="" element={<Orders />} />

            <Route path=":id" element={<OrderDetails />} />
          </Route>
        </Route>
        <Route path="/:id" element={<Product />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
