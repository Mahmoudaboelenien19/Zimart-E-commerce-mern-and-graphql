import ShowCount from "@/components/Nav/main/showCounter";
import { isAuthContext } from "@/context/isAuth";
import { useAppDispatch, useAppSelector } from "@/custom/reduxTypes";
import { Reset_Notification } from "@/graphql/mutations/user";
import { changeNotificationCount } from "@/redux/notificationsSlice";
import { useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { RiNotification2Line } from "react-icons/ri";
import NotificationDropDown from "./NotificationDropDown";
import useHideScroll from "@/custom/useHideScroll";
import "./notification.scss";
import useIsMobile from "@/custom/useIsMobile";
const NotificatinTogglar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { userId } = useContext(isAuthContext);
  const dispatch = useAppDispatch();
  const { isMobile } = useIsMobile();
  const [resetNotification] = useMutation(Reset_Notification, {
    variables: {
      id: userId,
    },
  });
  const { count } = useAppSelector((st) => st.notification);

  useHideScroll(showNotifications, isMobile);

  return (
    <div className="relative">
      <RiNotification2Line
        className="shdaow above"
        color="var(--third)"
        fontSize={20}
        onClick={async () => {
          await resetNotification();
          dispatch(changeNotificationCount(0));
          setShowNotifications(!showNotifications);
        }}
      />
      <ShowCount length={count} />
      <div className="relative">
        {showNotifications && (
          <NotificationDropDown
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
          />
        )}
      </div>
    </div>
  );
};

export default NotificatinTogglar;
