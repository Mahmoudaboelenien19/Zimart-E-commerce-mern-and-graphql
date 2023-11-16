import { AnimatePresence } from "framer-motion";
import { Fragment, useCallback, useLayoutEffect, useRef } from "react";
import { useScrollDirection } from "use-scroll-direction";
import Notificatin from "./Notificatin";
import NoData from "@/components/widgets/NoData";
import { useAppSelector } from "@/custom/helpers/reduxTypes";
import useParams from "@/custom/helpers/useParams";
import FetchLoading from "@/components/widgets/loaders/FetchLoading";
import useGetNotifications from "./useGetNotifications";

const Notifications = () => {
  const { isMore, loading, setPage, setLoading } = useGetNotifications();
  const ref = useRef<HTMLDivElement>(null);
  const { isScrolling } = useScrollDirection({ ref });
  const { notificatins } = useAppSelector((st) => st.notification);
  const { getParam } = useParams();

  const not_type = getParam("not_type") || "all";

  useLayoutEffect(() => {
    if (ref?.current) {
      setPage(1);
      ref.current.scrollTo(0, 0);
    }
  }, [not_type]);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastEle = useCallback((node: HTMLDivElement) => {
    if (isMore) {
      if (!node) return;
      if (observer.current) observer?.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        setLoading(true);
        if (entries[0].isIntersecting) {
          setPage((cur) => cur + 1);
        }
      });
      observer.current.observe(node);
    }
  }, []);

  return (
    <div className="notifications w-100" ref={ref}>
      <AnimatePresence>
        {notificatins.length ? (
          <>
            {notificatins.map((notificatin, i: number) => {
              return (
                <span
                  key={notificatin?._id || i}
                  ref={i === notificatins.length - 1 ? lastEle : null}
                >
                  <Notificatin
                    {...notificatin}
                    isScrolling={isScrolling || false}
                  />
                </span>
              );
            })}
            <Fragment>
              {loading && isMore && (
                <div className="w-100 center  notification-loader ">
                  <FetchLoading clr={"grey"} />
                </div>
              )}
            </Fragment>
          </>
        ) : (
          <NoData
            message={
              not_type === "all"
                ? "no notifications "
                : "no unread notifications"
            }
            className=""
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notifications;
