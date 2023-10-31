import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "@/custom/reduxTypes";
import useNotificationsSubscription from "@/custom/subscriptions/useNotificationsSubscription";
import { useScrollToUp } from "@/custom/useScrolltoUp";
import "./table.scss";
export const Component = () => {
  const { count } = useAppSelector((st) => st.notification);

  useEffect(() => {
    document.title = `${count >= 1 ? `(${count}) ` : ""}Dashboard`;
  }, [count]);

  useNotificationsSubscription();
  useScrollToUp();
  return (
    <div className="dashboard-par ">
      <Outlet />
    </div>
  );
};
