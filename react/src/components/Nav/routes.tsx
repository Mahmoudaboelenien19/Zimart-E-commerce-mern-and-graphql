import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from "react-router-dom";
import Loading from "@/loading/Loading";
import ProtectedRoutes from "./ProtectedRoutes";
import Layout from "@/components/Layout";
import { NotAuthedRoutes } from "./NotAuthedRoutes";
import DashboardLayout from "../dashboard/dashboardLayout";
import NotFound from "../NotFound/NotFound";
import { AnimatePresence } from "framer-motion";

const AppRoutes = () => {
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
            lazy: () => import("@/components/dashboard/Dashboard"),
            children: [
              {
                path: "",
                lazy: () => import("@/components/dashboard/recap/Recap"),
              },
              {
                path: "users",
                lazy: () =>
                  import("@/components/dashboard/User/UsersDashboard"),
              },
              {
                path: "products",
                lazy: () =>
                  import("@/components/dashboard/dash-products/DashProducts"),
              },

              {
                path: "products/add",
                lazy: () =>
                  import("@/components/dashboard/form/DashAddProduct"),
              },
              {
                path: "orders",
                lazy: () => import("@/components/dashboard/Order/Orders"),
              },
              {
                path: "orders/:id",
                lazy: () =>
                  import(
                    "@/components/dashboard/Order/OrderDetails/OrderDetails"
                  ),
              },
              {
                path: "products/:id",
                lazy: () =>
                  import("@/components/dashboard/form/DashUpdateProduct"),
              },
            ],
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
              lazy: () => import("@/components/Home/Home"),
              path: "",
            },
            {
              path: "",
              element: <NotAuthedRoutes />,

              children: [
                {
                  path: "login",
                  lazy: () => import("@/components/login/login"),
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
          ],
        },
        { ...dashBoardRoutes },

        { path: "*", element: <NotFound /> },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} fallbackElement={<Loading />} />
    </AnimatePresence>
  );
};

export default AppRoutes;
