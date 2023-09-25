import React, { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "@/loading/Loading";
import ProtectedRoutes from "./ProtectedRoutes";
import Layout from "@/components/Layout";
import { NotAuthedRoutes } from "./NotAuthedRoutes";
import { isAuthContext } from "@/context/isAuth";
import useInnitialRender from "@/custom/useInnitialRender";
import DashboardLayout from "../dashboard/dashboardLayout";

const AppRoutes = () => {
  /* 
  if user goes directly to a proected or unAuthed Route
  this delayed state to ensure isAuth value is done 
  and to make this delay only once 
  */
  const { isInitialRender } = useInnitialRender(1500);
  const { isAuth } = useContext(isAuthContext);
  const dashBoardRoutes = {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        lazy: () => import("@/components/dashboard/Dashboard"),
        children: [
          {
            path: "",
            lazy: () => import("@/components/dashboard/recap/Recap"),
          },
          {
            path: "users",
            lazy: () => import("@/components/dashboard/User/UsersDashboard"),
          },
          {
            path: "products",
            lazy: () =>
              import("@/components/dashboard/dash-products/DashProducts"),
          },

          {
            path: "products/add",
            lazy: () => import("@/components/dashboard/form/DashAddProduct"),
          },
          {
            path: "orders",
            lazy: () => import("@/components/dashboard/Order/Orders"),
          },
          {
            path: "orders/:id",
            lazy: () =>
              import("@/components/dashboard/Order/OrderDetails/OrderDetails"),
          },
        ],
      },
    ],
  };

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
          path: "",
          element: (
            <NotAuthedRoutes
              isAuth={isAuth}
              isInitialRender={isInitialRender}
            />
          ),

          children: [
            {
              path: "login",
              lazy: () => import("@/components/log/login"),
            },
            {
              path: "signup",

              lazy: () => import("@/components/log/SignUp"),
            },
          ],
        },
        {
          element: (
            <ProtectedRoutes
              isAuth={isAuth}
              // isInitialRender={isInitialRender}
            />
          ),
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
  return <RouterProvider router={router} fallbackElement={<Loading />} />;
};

export default AppRoutes;
