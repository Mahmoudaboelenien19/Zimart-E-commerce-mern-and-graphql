import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Layout from "@/components/Layout";
import { NotAuthedRoutes } from "./NotAuthedRoutes";
import DashboardLayout from "../dashboard/dashboardLayout";
import NotFound from "../NotFound/NotFound";
import { Component as Product } from "@/components/product Route/Product";
import { Home } from "@/components/Home/Home";
import { Login } from "../login/login";
import { Payment } from "../payment/Payment";
import Loading from "@/loading/Loading";
export const AppRoutes = () => {
  /*   note 
 home and login mustn't be lazyloaded as it doesn't work
            i need to redirect to Home if user is auth and tries to go diectly to login or sign up
            and if he isn't auth and tries to go to any of protected routes  i redirect him to login
            if home and login pages are lazy loaded  this logic not work in react router dom v6.18.0
            but it was working on v 6.10.0 
            */

  const dashBoardRoutes = {
    path: "",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            // lazy: () => import("@/components/dashboard/Dashboard"),
            lazy: () => import("@/components/dashboard/recap/Recap"),

            // {
            //   path: "",
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
          {
            path: "products/:id",
            lazy: () => import("@/components/dashboard/form/DashUpdateProduct"),
          },
        ],
      },
    ],
  };
  const routes: RouteObject[] = [
    {
      //i mad this arr to make navbar not appear in dashboard routes

      children: [
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              index: true,
              element: <Home />,
              path: "",
            },
            {
              path: "",
              element: <NotAuthedRoutes />,

              children: [
                {
                  path: "login",
                  element: <Login />,
                },
                {
                  path: "signup",

                  lazy: () => import("@/components/signup/SignUp"),
                },
              ],
            },
            {
              element: <ProtectedRoutes />,
              path: "",
              children: [
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
                  lazy: () => import("../Compare/CompareProduct"),
                },
                {
                  path: "payment",
                  element: <Payment />,
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
              element: <Product />,
              path: "/product/:id",
            },
          ],
        },
        { ...dashBoardRoutes },

        { path: "*", element: <NotFound /> },
      ],
    },
  ];
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} fallbackElement={<Loading />} />;
};
