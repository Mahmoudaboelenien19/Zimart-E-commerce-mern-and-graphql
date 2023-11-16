import { useAppDispatch, useAppSelector } from "@/custom/helpers/reduxTypes";
import useIsMobile from "@/custom/helpers/useIsMobile";
import useParams from "@/custom/helpers/useParams";
import { GET_NOTiFICATIONS } from "@/graphql/mutations/user";
import {
  skeltonNotificationsRedux,
  clearNotificationRedux,
  addToNotificatinsRedux,
} from "@/redux/notificationsSlice";
import { useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";

const useGetNotifications = () => {
  const { notificatins } = useAppSelector((st) => st.notification);
  const [isMore, setIsMore] = useState(true);
  const { getParam } = useParams();
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const { userId } = useAppSelector((st) => st.isAuth);
  const not_type = getParam("not_type") || "all";
  const [getNotification] = useLazyQuery(GET_NOTiFICATIONS);
  const dispatch = useAppDispatch();
  const { isMobile } = useIsMobile();
  useEffect(() => {
    if (!notificatins.length && page === 1) {
      dispatch(skeltonNotificationsRedux());
    }
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

      if (res.data?.getNotifications.length) {
        setIsMore(true);
        dispatch(addToNotificatinsRedux(res.data?.getNotifications || []));
      } else {
        setIsMore(false);
      }
    });
  }, [page, not_type]);
  return { loading, setPage, isMore, setLoading };
};
export default useGetNotifications;
