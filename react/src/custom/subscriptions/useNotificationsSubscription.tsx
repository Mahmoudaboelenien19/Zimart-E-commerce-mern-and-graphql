import { New_Notification_Subscription } from "@/graphql/mutations/order";
import {
  notificationInterface,
  addToNotificatinsRedux,
  changeNotificationCount,
} from "@/redux/notificationsSlice";
import { useSubscription, OnDataOptions } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../reduxTypes";

const useNotificationsSubscription = () => {
  const dispatch = useAppDispatch();
  const { count } = useAppSelector((st) => st.notification);
  useSubscription(New_Notification_Subscription, {
    onData: (
      data: OnDataOptions<{ NotificationAdded: notificationInterface }>
    ) => {
      dispatch(addToNotificatinsRedux(data?.data?.data?.NotificationAdded));
      dispatch(changeNotificationCount(count + 1));
    },
  });
};

export default useNotificationsSubscription;
