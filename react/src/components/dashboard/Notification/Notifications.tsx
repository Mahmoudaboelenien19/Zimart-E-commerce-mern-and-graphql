import { AnimatePresence } from "framer-motion";
import React, { LegacyRef } from "react";
import { useScrollDirection } from "react-use-scroll-direction";
import Notificatin from "./Notificatin";
import NoData from "@/components/widgets/NoData";
import { notificationInterface } from "@/redux/notificationsSlice";

interface Props {
  dataShown: notificationInterface[];
  showAll: boolean;
}
const Notifications = ({ dataShown, showAll }: Props) => {
  const { isScrolling, scrollTargetRef } = useScrollDirection();
  return (
    <div
      className="notifications"
      ref={scrollTargetRef as unknown as LegacyRef<HTMLDivElement>}
    >
      <NoData
        message={`no ${!showAll ? "unread " : ""}notifications`}
        length={dataShown.length >= 1}
        cls="no-data-80"
      >
        <AnimatePresence>
          {dataShown.map((notificatin) => {
            return (
              <Notificatin
                key={notificatin._id}
                {...notificatin}
                isScrolling={isScrolling || false}
              />
            );
          })}
        </AnimatePresence>
      </NoData>
    </div>
  );
};

export default Notifications;
