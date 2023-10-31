import { useEffect, useRef, useState } from "react";
import { BiDotsHorizontal } from "react-icons/bi";
import NotificationActionsDropDown from "./NotificationActionsDropDown";
import { AnimatePresence } from "framer-motion";
import Title from "@/components/widgets/Title";
import { useNavigate } from "react-router-dom";
import FadeElement from "@/components/widgets/animation/FadeElement";
import { notificationInterface } from "@/redux/notificationsSlice";
import Skeleton from "react-loading-skeleton";
import clsx from "clsx";

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
  const [pos, setPos] = useState({ top: 0, right: 0 });
  const nvaigate = useNavigate();
  // useEffect(() => {
  //   if (isScrolling) {
  //     setShowActions(false);
  //   }
  // }, [isScrolling]);

  return (
    <FadeElement
      className={clsx("notification relative")}
      key={createdAt}
      onClick={() => nvaigate(link)}
    >
      <>
        {_id && (
          <>
            <span
              ref={ref}
              className="dots"
              onClick={(e) => {
                e.stopPropagation();
                setShowActions(!showActions);
                setPos({
                  right: ref.current?.getBoundingClientRect().right || 0,
                  top: ref.current?.getBoundingClientRect().bottom || 0,
                });
              }}
            >
              <BiDotsHorizontal className="dots" />
              <AnimatePresence>
                {showActions && (
                  <NotificationActionsDropDown
                    _id={_id}
                    bool={isRead}
                    top={pos.top}
                    right={pos.right}
                    setter={setShowActions}
                  />
                )}
              </AnimatePresence>
            </span>
            <AnimatePresence>
              {!isRead && (
                <FadeElement className="is-read">
                  <Title title="unread" abs>
                    <></>
                  </Title>
                </FadeElement>
              )}
            </AnimatePresence>
          </>
        )}
      </>

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
