import { Fragment, useContext } from "react";
import { useMutation } from "@apollo/client";
import { isAuthContext } from "@/context/isAuth";
import { useAppDispatch } from "@/custom/reduxTypes";
import {
  Delete_Notification,
  Toggle_Read_Notification,
} from "@/graphql/mutations/user";
import {
  removeFromNotificatinsRedux,
  toggleReadNotificatinsRedux,
} from "@/redux/notificationsSlice";
import toast from "react-hot-toast";

interface Props {
  isRead: boolean;
  _id: string;
}
const NotificationActionsDropDown = ({ isRead, _id }: Props) => {
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
      isRead: !isRead,
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
      dispatch(toggleReadNotificatinsRedux({ id: _id, isRead: !isRead }));
    }
  };

  const actionsArr = [
    { btn: !isRead ? "mark as read" : "mark as unread", fn: handleToggleRead },
    { btn: "remove this notification", fn: handleDelete },
  ];
  return (
    <Fragment>
      {actionsArr.map(({ btn, fn }, i) => {
        return (
          <Fragment key={i}>
            <div
              // className
              style={{
                cursor: "pointer",
              }}
              className="result "
              onClick={async () => await fn()}
            >
              {btn}
            </div>
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default NotificationActionsDropDown;
