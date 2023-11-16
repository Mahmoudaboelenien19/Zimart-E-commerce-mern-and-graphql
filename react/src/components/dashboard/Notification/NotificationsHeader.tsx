import { useAppSelector, useAppDispatch } from "@/custom/helpers/reduxTypes";
import useParams from "@/custom/helpers/useParams";
import {
  Clear_Notification,
  Mark_All_as_Notification,
  GET_NOTiFICATIONS,
} from "@/graphql/mutations/user";
import { opacityVariant } from "@/lib/variants/globals";
import {
  clearNotificationRedux,
  skeltonNotificationsRedux,
  MarkAllAsReadNotificationRedux,
} from "@/redux/notificationsSlice";
import { useMutation } from "@apollo/client";
import { motion } from "framer-motion";
import React, { Fragment } from "react";
import toast from "react-hot-toast";

const NotificationsHeader = () => {
  const { notificatins } = useAppSelector((st) => st.notification);
  const { setParam, getParam } = useParams();
  const not_type = getParam("not_type") || "all";
  const { userId } = useAppSelector((st) => st.isAuth);

  const resetNotificationRedux = () => {
    dispatch(clearNotificationRedux());
    dispatch(skeltonNotificationsRedux());
  };

  const [clearFn] = useMutation(Clear_Notification, {
    variables: {
      userId,
    },
  });
  const [MarkAllFn] = useMutation(Mark_All_as_Notification, {
    refetchQueries: [{ query: GET_NOTiFICATIONS }],
    variables: {
      userId,
    },
  });

  const dispatch = useAppDispatch();
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

  return (
    <Fragment>
      <h2 className="header">Notification</h2>
      {(notificatins.length >= 1 || not_type === "unread") && (
        <motion.div
          variants={opacityVariant}
          className="notification-btns w-100 center between"
        >
          <div className="filter-btn center">
            <button
              onClick={() => {
                if (not_type === "unread") {
                  setParam("not_type", "all");
                  resetNotificationRedux();
                }
              }}
              style={{ opacity: not_type === "all" ? 1 : 0.4 }}
            >
              all
            </button>
            <button
              onClick={() => {
                if (not_type !== "unread") {
                  setParam("not_type", "unread");
                  resetNotificationRedux();
                }
              }}
              style={{ opacity: not_type === "unread" ? 1 : 0.4 }}
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
    </Fragment>
  );
};

export default NotificationsHeader;
