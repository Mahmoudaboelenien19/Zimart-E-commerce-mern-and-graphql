import React, { Fragment, useContext } from "react";
import { motion } from "framer-motion";
import {
  opacityVariant,
  selectDropDownVariants,
} from "../../../variants/globals";
import { useMutation } from "@apollo/client";
import { isAuthContext } from "../../../context/isAuth";
import {
  Delete_Notification,
  Toggle_Read_Notification,
} from "../../../graphql/mutations/user";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../../../custom/reduxTypes";
import {
  removeFromNotificatinsRedux,
  toggleReadNotificatinsRedux,
} from "../../../redux/notificationsSlice";
import useClickOutside from "../../../custom/useClickOutside";

interface Props {
  bool: boolean;
  _id: string;
  top: number;
  right: number;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}
const NotificationActionsDropDown = ({
  bool,
  _id,
  top,
  right,
  setter,
}: Props) => {
  const dispatch = useAppDispatch();
  const { userId } = useContext(isAuthContext);
  const [deleteNotificationDB] = useMutation(Delete_Notification, {
    variables: {
      id: _id,
      userId,
    },
  });

  const [toggleReadNotificationDB] = useMutation(Toggle_Read_Notification, {
    variables: {
      id: _id,
      userId,
      isRead: !bool,
    },
  });

  const handleDelete = async () => {
    const { data } = await deleteNotificationDB();
    if (data?.deleteNotification?.msg) {
      dispatch(removeFromNotificatinsRedux(_id));
      toast.success(data?.deleteNotification?.msg);
    }
  };

  const handleToggleRead = async () => {
    const { data } = await toggleReadNotificationDB();

    if (data?.toggleReadNotification?.status === 200) {
      dispatch(toggleReadNotificatinsRedux({ id: _id, isRead: !bool }));
    }
  };

  const actionsArr = [
    { btn: !bool ? "mark as read" : "mark as unread", fn: handleToggleRead },
    { btn: "remove this notification", fn: handleDelete },
  ];
  const ref = useClickOutside<HTMLDivElement>(() => setter(false), bool);
  return (
    <motion.div
      className="order-drop box-shadow notification-actions"
      variants={selectDropDownVariants}
      initial="start"
      animate="end"
      style={{
        position: "fixed",
        top: top + 20,
        left: right - 160,
      }}
      ref={ref}
    >
      {actionsArr.map(({ btn, fn }, i) => {
        return (
          <Fragment key={i}>
            <motion.div
              style={{
                cursor: "pointer",
              }}
              variants={opacityVariant}
              whileHover={{ x: 4 }}
              className="order-link notification-actions"
              onClick={async () => await fn()}
            >
              {btn}
            </motion.div>
          </Fragment>
        );
      })}
    </motion.div>
  );
};

export default NotificationActionsDropDown;
