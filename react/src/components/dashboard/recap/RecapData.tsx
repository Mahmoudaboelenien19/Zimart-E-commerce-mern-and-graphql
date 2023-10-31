import { Fragment, memo, useContext, useEffect } from "react";
import DashBoardRecap from "./DashBoardRecap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GrProductHunt } from "react-icons/gr";
import { FaDollarSign, FaUserAlt } from "react-icons/fa";
import MainPageCharts from "./MainPageCharts";
import AdminEmailPop from "../AdminEmailPop";
import useDashProgress from "@/custom/useDashProgress";
import { useQuery } from "@apollo/client";
import { GET_NEEDED_DASHBOARD_DATA } from "@/graphql/general";
import { isAuthContext } from "@/context/isAuth";
import { changeNotificationCount } from "@/redux/notificationsSlice";
import { useAppDispatch } from "@/custom/reduxTypes";

const RecapData = () => {
  const { userId } = useContext(isAuthContext);
  const { data } = useQuery(GET_NEEDED_DASHBOARD_DATA, {
    variables: {
      id: userId,
    },
  });
  const dispatch = useAppDispatch();
  const user = data?.getDashBoardData?.users || [];
  const order = data?.getDashBoardData?.orders || [];
  const Allproducts = data?.getDashBoardData?.products || [];
  const notificationsCount = data?.getDashBoardData?.notificationsCount;
  const [productProgress] = useDashProgress(Allproducts);
  const [userProgress] = useDashProgress(user);
  const [orderProgress, orderEaring, orderEaringProgress] = useDashProgress(
    order,
    "order"
  );

  useEffect(() => {
    dispatch(changeNotificationCount(notificationsCount));
  }, [notificationsCount]);
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
  const check = order.length >= 1 && Allproducts.length > 0 && user.length > 0;
  return (
    <Fragment>
      {check && (
        <>
          {/* i make 2 of these to make  if element is wrapped it takes full width 
        
        but doin' this if it's wrapped it will be two elements
        */}

          <div className="center dash-recap-par ">
            <div className="dash-recap">
              {recapArr.slice(0, 2)?.map((obj, i) => {
                return <DashBoardRecap key={i} i={i} {...obj} />;
              })}
            </div>
            <div className="dash-recap">
              {recapArr.slice(2)?.map((obj, i) => {
                return <DashBoardRecap key={i} i={i} {...obj} />;
              })}
            </div>
          </div>
          <MainPageCharts AllProducts={Allproducts} order={order} user={user} />
        </>
      )}
      <AdminEmailPop isLoaded={check} />
    </Fragment>
  );
};

export default memo(RecapData);
