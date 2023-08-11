import React from "react";
import DashMain from "../DashMain";
import DashBoardRecap from "./DashBoardRecap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GrProductHunt } from "react-icons/gr";
import { useAppSelector } from "../../../custom/reduxTypes";
import useDashProgress from "../../../custom/useDashProgress";
import { FaDollarSign, FaUserAlt } from "react-icons/fa";
import MainPageCharts from "./MainPageCharts";
import useMeasure from "react-use-measure";
import GridLoader from "../../widgets/GridLoader";

const Recap = () => {
  const { user } = useAppSelector((st) => st.user);

  const { Allproducts } = useAppSelector((st) => st.Allproducts);
  const { order } = useAppSelector((st) => st.order);

  const [productProgress] = useDashProgress(Allproducts);
  const [userProgress] = useDashProgress(user);
  const [orderProgress, orderEaring, orderEaringProgress] = useDashProgress(
    order,
    "order"
  );

  const recapArr = [
    {
      to: "/dashboard/orders",
      head: "orders",
      percentage: Number(orderProgress.toFixed(2)),

      analytics: String(order.length),
      link: "orders",
      Icon: AiOutlineShoppingCart,
    },

    {
      to: "/dashboard/products",
      head: "products",
      percentage: Number(productProgress.toFixed(2)),

      analytics: String(Allproducts.length),
      link: "products",
      Icon: GrProductHunt,
    },
    {
      to: "/dashboard/orders",
      head: "earnings",
      percentage: Number(orderEaringProgress.toFixed(2)),
      analytics: String(orderEaring.toFixed(2)),
      link: "earning",
      Icon: FaDollarSign,
    },
    {
      to: "/dashboard/users",
      head: "users",
      percentage: Number(userProgress.toFixed(2)),
      analytics: String(user.length),
      link: "users",
      Icon: FaUserAlt,
    },
  ];
  const [ref, { width }] = useMeasure();
  const check = order.length >= 1 && Allproducts.length > 0 && user.length > 0;
  return (
    <DashMain>
      {check ? (
        <>
          <div
            className="dash-recap"
            ref={ref}
            style={{ flexWrap: width <= 800 ? "wrap" : "nowrap" }}
          >
            {recapArr?.map((obj, i) => {
              return <DashBoardRecap key={i} {...obj} />;
            })}
          </div>

          <MainPageCharts width={width} />
        </>
      ) : (
        <GridLoader cls="loading-recap center" />
      )}
    </DashMain>
  );
};

export default Recap;
