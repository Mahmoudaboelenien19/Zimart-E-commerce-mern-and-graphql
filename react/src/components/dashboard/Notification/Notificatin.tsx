import React, { useEffect, useRef, useState } from "react";
import { notificationInterface } from "../../../redux/notificationsSlice";
import { BiDotsHorizontal } from "react-icons/bi";
import NotificationActionsDropDown from "./NotificationActionsDropDown";
import { AnimatePresence } from "framer-motion";
import Title from "../../widgets/Title";
import FadeElement from "../../widgets/FadeElement";

interface Props extends notificationInterface {
  isScrolling: boolean;
}
const Notificatin = ({
  _id,
  isRead,
  content,
  createdAt,

  isScrolling,
}: Props) => {
  const [showActions, setShowActions] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ top: 0, right: 0 });
  useEffect(() => {
    if (isScrolling) {
      setShowActions(false);
    }
  }, [isScrolling]);
  return (
    <FadeElement cls="notification relative" key={createdAt}>
      <span
        ref={ref}
        className="dots"
        onClick={() => {
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
          <FadeElement cls="is-read">
            <Title title="unread" abs>
              <></>
            </Title>
          </FadeElement>
        )}
      </AnimatePresence>
      <div className="content">{content}</div>
      <div className="time">
        {new Date(createdAt).toLocaleDateString()} -{" "}
        {new Date(createdAt).toLocaleTimeString()}
      </div>
    </FadeElement>
  );
};

export default Notificatin;
