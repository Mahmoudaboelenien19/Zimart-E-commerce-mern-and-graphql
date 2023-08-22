import { GrProductHunt } from "react-icons/gr";
import { AiFillCloseCircle, AiFillDashboard } from "react-icons/ai";
import { FaClipboardList, FaUserAlt } from "react-icons/fa";
import { TbSquareRoundedPlusFilled } from "react-icons/tb";

export const dashAsideLinks = [
  {
    head: "Main",
    links: [
      {
        link: "dashboard",
        to: "/dashboard",
        Icon: AiFillDashboard,
        active: "dashboard",
      },
    ],
  },
  {
    head: "products",
    links: [
      {
        link: "all products",
        to: "/dashboard/products",
        Icon: GrProductHunt,
        active: "products",
      },
      {
        link: "add product",
        to: "/dashboard/products/add",
        Icon: TbSquareRoundedPlusFilled,
        active: "add",
      },
    ],
  },

  {
    head: "orders",
    links: [
      {
        link: "orders",
        to: "/dashboard/orders",
        Icon: FaClipboardList,
        active: "orders",
      },
    ],
  },

  {
    head: "users",
    links: [
      {
        link: "users",
        to: "/dashboard/users",
        Icon: FaUserAlt,
        active: "users",
      },
      {
        link: "logout",
        to: "",
        Icon: AiFillCloseCircle,
        active: "login",
      },
    ],
  },
];

export const linksArr = [
  {
    to: "/",
    link: "Home",
  },
  {
    to: "/dashboard",
    link: "dashboard",
  },
  {
    to: "/blogs",
    link: "blogs",
  },
  {
    to: "/contact",
    link: "contact ",
  },
];
