import React from "react";
import { motion } from "framer-motion";
import UserMobile from "./UserMobile";
import { opacityVariant } from "@/variants/globals";
const MobileDashUser = ({ data }: { data: any }) => {
  return (
    <div className="">
      {data?.map((user: any, i: number) => {
        return (
          <motion.div
            key={user._id}
            variants={opacityVariant}
            initial="start"
            animate="end"
            exit="exit"
            transition={{ duration: 0.5 }}
            className=" mobile-order-par"
          >
            <UserMobile index={user._id} {...user} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default MobileDashUser;
