import React from "react";
import { motion } from "framer-motion";
import UserMobile from "./UserMobile";
import { opacityVariant } from "@/variants/globals";
import { UserInterface } from "@/interfaces/user";
const MobileDashUser = ({ data }: { data: UserInterface[] }) => {
  return (
    <div className="">
      {data?.map((user: UserInterface, i: number) => {
        return (
          <motion.div
            key={i}
            variants={opacityVariant}
            initial="start"
            animate="end"
            exit="exit"
            transition={{ duration: 0.5 }}
            className=" mobile-order-par"
          >
            <UserMobile {...user} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default MobileDashUser;
