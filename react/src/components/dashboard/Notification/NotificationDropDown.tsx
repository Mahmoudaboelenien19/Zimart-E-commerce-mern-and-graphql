import React, { useContext, useEffect, useState } from "react";

import { motion } from "framer-motion";
import { useMutation } from "@apollo/client";

import { toast } from "react-hot-toast";

import { RiNotification2Line } from "react-icons/ri";

import Notifications from "./Notifications";
import ShowCount from "@/components/Nav/main/showCounter";
import DropDown from "@/components/widgets/dropdowns/DropDown";
import { isAuthContext } from "@/context/isAuth";
import { useAppSelector, useAppDispatch } from "@/custom/reduxTypes";
import useHideScroll from "@/custom/useHideScroll";
import {
  Reset_Notification,
  Clear_Notification,
  Mark_All_as_Notification,
} from "@/graphql/mutations/user";
import {
  notificationInterface,
  clearNotificationRedux,
  MarkAllAsReadNotificationRedux,
  changeNotificationCount,
} from "@/redux/notificationsSlice";
import { opacityVariant } from "@/variants/globals";

const NotificationDropDown = () => {
  const { userId } = useContext(isAuthContext);

  const [resetNotification] = useMutation(Reset_Notification, {
    variables: {
      id: userId,
    },
  });
  const { count } = useAppSelector((st) => st.notification);
  const [showNotifications, setShowNotifications] = useState(false);

  const [showAll, setShowAll] = useState(true);
  const { notificatins } = useAppSelector((st) => st.notification);
  const [clearFn] = useMutation(Clear_Notification, {
    variables: {
      userId,
    },
  });
  const [MarkAllFn] = useMutation(Mark_All_as_Notification, {
    variables: {
      userId,
    },
  });
  const dispatch = useAppDispatch();
  const [dataShown, setDataShown] = useState<notificationInterface[]>([]);

  useEffect(() => {
    if (notificatins.length === 0) {
      setShowAll(true);
    }
    if (showAll) {
      setDataShown(notificatins);
    } else {
      setDataShown(notificatins.filter((e) => e.isRead === false));
    }
  }, [notificatins, showAll]);

  const handleClear = async () => {
    const { data } = await clearFn();
    if (data?.ClearNotification?.msg) {
      dispatch(clearNotificationRedux());
      toast.success(data?.ClearNotification?.msg);
    }
  };

  const handleMarkAllAsRead = async () => {
    const { data } = await MarkAllFn();
    if (data?.MarkAllAsReadNotification?.status) {
      dispatch(MarkAllAsReadNotificationRedux());
    }
  };
  useHideScroll(showNotifications);
  return (
    <>
      <span className="relative">
        <RiNotification2Line
          className="shdaow above"
          color="inherit"
          fontSize={20}
          onClick={async () => {
            await resetNotification();
            dispatch(changeNotificationCount(0));
            setShowNotifications(!showNotifications);
          }}
        />
        <ShowCount length={count} />

        <DropDown
          setter={setShowNotifications}
          bool={showNotifications}
          cls="notification-par"
          head="notifications"
          title="close notifications"
        >
          {notificatins.length >= 1 && (
            <motion.div
              variants={opacityVariant}
              className="notification-btns w-100 center between"
            >
              <div className="filter-btn center">
                <button
                  onClick={() => {
                    setShowAll(true);
                  }}
                  style={{ opacity: showAll ? 1 : 0.4 }}
                >
                  all
                </button>
                <button
                  onClick={() => {
                    setShowAll(false);
                  }}
                  style={{ opacity: !showAll ? 1 : 0.4 }}
                >
                  unread
                </button>
              </div>

              <div className="btn-handle-all  center">
                <button
                  style={{ fontWeight: "bold" }}
                  onClick={handleMarkAllAsRead}
                >
                  mark all as read
                </button>
                <button
                  onClick={handleClear}
                  style={{ fontWeight: "bold", color: "var(--delete)" }}
                >
                  clear
                </button>
              </div>
            </motion.div>
          )}
          <Notifications showAll={showAll} dataShown={dataShown} />
        </DropDown>
      </span>
    </>
  );
};

export default NotificationDropDown;
