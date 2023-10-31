import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLazyQuery, useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";
import Notifications from "./Notifications";
import DropDown from "@/components/widgets/dropdowns/DropDown";
import { isAuthContext } from "@/context/isAuth";
import { useAppSelector, useAppDispatch } from "@/custom/reduxTypes";
import {
  Clear_Notification,
  Mark_All_as_Notification,
  GET_NOTiFICATIONS,
} from "@/graphql/mutations/user";
import {
  clearNotificationRedux,
  addToNotificatinsRedux,
  skeltonNotificationsRedux,
  MarkAllAsReadNotificationRedux,
} from "@/redux/notificationsSlice";
import { opacityVariant } from "@/lib/variants/globals";
import useParams from "@/custom/useParams";
import useIsMobile from "@/custom/useIsMobile";

type Props = {
  showNotifications: boolean;
  setShowNotifications: React.Dispatch<React.SetStateAction<boolean>>;
};
const NotificationDropDown = ({
  showNotifications,
  setShowNotifications,
}: Props) => {
  const { notificatins } = useAppSelector((st) => st.notification);
  const [loading, setLoading] = useState(false);
  const [isMore, setIsMore] = useState(true);
  const { setParam, getParam } = useParams();
  const [page, setPage] = useState(1);
  const { userId } = useContext(isAuthContext);
  const not_type = getParam("not_type") || "all";
  const [getNotification] = useLazyQuery(GET_NOTiFICATIONS);

  useEffect(() => {
    if (notificatins.length) {
      setPage(1);
      dispatch(clearNotificationRedux());
      dispatch(skeltonNotificationsRedux());
    }
  }, [not_type]);

  const { isMobile } = useIsMobile();
  useEffect(() => {
    if (!notificatins.length && page === 1) {
      dispatch(skeltonNotificationsRedux());
    }
    //this timer just to at some delay to show  the animation
    const timer = setTimeout(() => {
      const limit = isMobile ? 25 : 15;
      getNotification({
        variables: {
          input: {
            id: userId,
            skip: Number(page) >= 2 ? limit * (Number(page) - 1) : 0,
            limit,
            type: not_type,
          },
        },
      }).then((res) => {
        if (page === 1) {
          dispatch(clearNotificationRedux());
        }
        setLoading(false);
        if (res.data?.getNotifications.length) {
          setIsMore(true);
          dispatch(addToNotificatinsRedux(res.data?.getNotifications || []));
        } else {
          setIsMore(false);
        }
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [page, not_type]);

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
    <DropDown
      setter={setShowNotifications}
      bool={showNotifications}
      className="notification-par"
      addCloseIcon
      height={400}
    >
      <h2 className="header">Notification</h2>
      {(notificatins.length >= 1 || not_type === "unread") && (
        <motion.div
          variants={opacityVariant}
          className="notification-btns w-100 center between"
        >
          <div className="filter-btn center">
            <button
              onClick={() => {
                setParam("not_type", "all");
              }}
              style={{ opacity: not_type === "all" ? 1 : 0.4 }}
            >
              all
            </button>
            <button
              onClick={() => {
                setParam("not_type", "unread");
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
      <>
        <Notifications
          setPage={setPage}
          loading={loading}
          isMore={isMore}
          setLoading={setLoading}
        />
      </>
    </DropDown>
  );
};

export default NotificationDropDown;
