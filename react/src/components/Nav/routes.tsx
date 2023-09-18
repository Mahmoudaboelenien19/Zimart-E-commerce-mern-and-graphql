import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { isAuthContext } from "@/context/isAuth";
import { AnimatePresence } from "framer-motion";
import Loading from "../widgets/loaders/Loading";
import useParams from "@/custom/useParams";
const Home = lazy(() => import("../Home/Home"));
const SignUp = lazy(() => import("../log/SignUp"));
const Login = lazy(() => import("../log/login"));
const Cart = lazy(() => import("./cart/Cart"));
const Product = lazy(() => import("../product Route/Product"));
const User = lazy(() => import("../user/User"));
const Dashboard = lazy(() => import("../dashboard/Dashboard"));
const DashProducts = lazy(
  () => import("../dashboard/dash-products/DashProducts")
);
const DashUpdateProduct = lazy(
  () => import("../dashboard/form/DashUpdateProduct")
);
const DashAddProduct = lazy(() => import("../dashboard/form/DashAddProduct"));
const Orders = lazy(() => import("../dashboard/Order/Orders"));
const CompareProducts = lazy(() => import("../Compare/CompareProducts"));
const OrderDetails = lazy(
  () => import("../dashboard/Order/OrderDetails/OrderDetails")
);
const Recap = lazy(() => import("../dashboard/recap/Recap"));
const UsersDashboard = lazy(() => import("../dashboard/User/UsersDashboard"));
const FaqComponent = lazy(() => import("../user/Faq"));
const Blogs = lazy(() => import("../blogs/Blogs"));
const Blog = lazy(() => import("../blogs/Blog"));
const ContactUs = lazy(() => import("../contactUs/ContactUs"));
const Payment = lazy(() => import("../payment/Payment"));

const AppRoutes = () => {
  const { setParam, deleteParam, getParam } = useParams();

  const isLog = getParam("isLogged");
  const isRegistered = getParam("isRegistered");
  const location = useLocation();

  const { setIsAuth } = useContext(isAuthContext);

  const [InitialRender, setIsIntialRender] = useState(true);
  useEffect(() => {
    if (location.pathname === "/payment") {
      setIsIntialRender(false);
      return;
    }

    setParam("loading", "true");
    setTimeout(() => {
      deleteParam("loading");
      setIsIntialRender(false);
    }, 3000);
  }, []);
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
    <AnimatePresence mode="wait">
      <Suspense fallback={<Loading bool={InitialRender} />}>
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
      </Suspense>
    </AnimatePresence>
  );
};

export default AppRoutes;
