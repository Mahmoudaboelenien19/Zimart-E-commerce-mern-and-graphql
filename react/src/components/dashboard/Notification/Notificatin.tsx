import { Fragment, useEffect, useRef, useState } from "react";
import NotificationActionsDropDown from "./NotificationActionsDropDown";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FadeElement from "@/components/widgets/animation/FadeElement";
import { notificationInterface } from "@/redux/notificationsSlice";
import Skeleton from "react-loading-skeleton";
import clsx from "clsx";
import { BsThreeDotsVertical } from "react-icons/bs";
import DropDown from "@/components/widgets/dropdowns/DropDown";

interface Props extends notificationInterface {
  isScrolling: boolean;
}
const Notificatin = ({
  _id,
  isRead,
  content,
  createdAt,
  isScrolling,
  link = "/",
}: Props) => {
  const [showActions, setShowActions] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const nvaigate = useNavigate();
  useEffect(() => {
    if (isScrolling) {
      setShowActions(false);
    }
  }, [isScrolling]);

  return (
    <FadeElement
      className={clsx("notification relative")}
      key={createdAt}
      onClick={() => nvaigate(link)}
    >
      <Fragment>
        {_id && (
          <Fragment>
            <div
              ref={ref}
              className="dots"
              onClick={(e) => {
                e.stopPropagation();
                setShowActions(!showActions);
              }}
            >
              <BsThreeDotsVertical className="dots" />

              <DropDown
                bool={showActions}
                setter={setShowActions}
                addCloseIcon
                variant="opacity"
                className="notification-drop  notification-actions"
              >
                <NotificationActionsDropDown _id={_id} isRead={isRead} />
              </DropDown>
            </div>
            <AnimatePresence>
              {!isRead && (
                <FadeElement className="is-read">
                  <Fragment />
                </FadeElement>
              )}
            </AnimatePresence>
          </Fragment>
        )}
      </Fragment>

      <div className="content">
        {content ? content : <Skeleton height={8} style={{ width: "90%" }} />}
      </div>
      <div className="time">
        {!_id ? (
          <Skeleton height={8} style={{ width: "90%" }} />
        ) : (
          <>
            {new Date(createdAt).toLocaleDateString()} -
            {new Date(createdAt).toLocaleTimeString()}
          </>
        )}
      </div>
    </FadeElement>
  );
};

export default Notificatin;
