import Notifications from "./Notifications";
import DropDown from "@/components/widgets/dropdowns/DropDown";
import NotificationsHeader from "./NotificationsHeader";

type Props = {
  showNotifications: boolean;
  setShowNotifications: React.Dispatch<React.SetStateAction<boolean>>;
};
const NotificationDropDown = ({
  showNotifications,
  setShowNotifications,
}: Props) => {
  return (
    <DropDown
      setter={setShowNotifications}
      bool={showNotifications}
      className="notification-par centered"
      addCloseIcon
    >
      <NotificationsHeader />
      <Notifications />
    </DropDown>
  );
};

export default NotificationDropDown;
