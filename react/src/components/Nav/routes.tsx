import React, { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "@/components/widgets/loaders/Loading";
import ProtectedRoutes from "./ProtectedRoutes";
import Layout from "../Layout";
import { NotAuthedRoutes } from "./NotAuthedRoutes";
import { isAuthContext } from "@/context/isAuth";
import { Login } from "../log/login";
import { Signup } from "../log/SignUp";

const AppRoutes = () => {
  const dashBoardRoutes = {
    path: "dashboard",
    lazy: () => import("@/components/dashboard/Dashboard"),
    children: [
      { path: "", lazy: () => import("@/components/dashboard/recap/Recap") },
      {
        path: "users",
        lazy: () => import("@/components/dashboard/User/UsersDashboard"),
      },
      {
        path: "products",
        lazy: () => import("@/components/dashboard/dash-products/DashProducts"),
      },

      {
        path: "products/add",
        lazy: () => import("@/components/dashboard/form/DashAddProduct"),
      },
      // {
      //   path: "dashboard/products/:id",
      //   lazy: () => import("@/components/dashboard/form/DashUpdateProduct"),
      // },
      {
        path: "orders",
        lazy: () => import("@/components/dashboard/Order/Orders"),
      },
      {
        path: "dashboard/orders/:id",
        lazy: () =>
          import("@/components/dashboard/Order/OrderDetails/OrderDetails"),
      },
    ],
  };

  const { isAuth } = useContext(isAuthContext);

  const routes = [
    {
      path: "/",
      element: <Layout />,

      children: [
        {
          index: true,
          lazy: () => import("@/components/Home/Home"),
          // element: <Home />,
          path: "",
        },

        {
          // loader: async () => await getnewAccess(),

          path: "",
          element: <NotAuthedRoutes isAuth={isAuth} />,
          children: [
            {
              path: "login",
              // lazy: () => import("../log/login"),
              element: <Login />,
            },
            {
              path: "signup",
              // lazy: () => import("../log/SignUp"),
              element: <Signup />,
            },
          ],
        },

        {
          element: <ProtectedRoutes />,
          path: "",
          children: [
            { ...dashBoardRoutes },
            {
              path: "user",
              lazy: () => import("../user/User"),
            },
            {
              path: "cart",
              lazy: () => import("./cart/Cart"),
            },
            {
              path: "compare",
              lazy: () => import("../Compare/CompareProducts"),
            },
            {
              path: "payment",
              lazy: () => import("../payment/Payment"),
            },
          ],
        },
        {
          lazy: () => import("../contactUs/ContactUs"),

          path: "contact",
        },
        {
          lazy: () => import("@/components/user/Faq"),
          path: "faq",
        },
        {
          lazy: () => import("@/components/blogs/Blogs"),
          path: "blogs",
        },

        {
          path: "/blogs/:id",
          lazy: () => import("@/components/blogs/Blog"),
        },
        {
          lazy: () => import("@/components/product Route/Product"),
          path: "/product/:id",
        },
        {
          path: "/dashboard/products/:id",
          lazy: () => import("@/components/dashboard/form/DashUpdateProduct"),
        },
      ],
    },
  ];

  //@ts-ignore
  const router = createBrowserRouter(routes);
  return (
    <RouterProvider
      router={router}
      fallbackElement={<Loading />}
      key={"main-route"}
    />
  );
};

export default AppRoutes;
