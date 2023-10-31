import { AnimatePresence } from "framer-motion";
import { Fragment, useCallback, useEffect, useRef } from "react";
import { useScrollDirection } from "use-scroll-direction";
import Notificatin from "./Notificatin";
import NoData from "@/components/widgets/NoData";
import { useAppSelector } from "@/custom/reduxTypes";
import useParams from "@/custom/useParams";
import FetchLoading from "@/components/widgets/loaders/FetchLoading";

type Props = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  isMore: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const Notifications = ({ isMore, setPage, loading, setLoading }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { isScrolling } = useScrollDirection({ ref });
  const { isScrolling: windowScrolling } = useScrollDirection();
  const { notificatins } = useAppSelector((st) => st.notification);
  const { getParam } = useParams();

  const not_type = getParam("not_type") || "all";

  useEffect(() => {
    if (ref?.current) {
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
                    isScrolling={isScrolling || windowScrolling || false}
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
