import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import TrUser from "./TrUser";
import FadeElement from "@/components/widgets/animation/FadeElement";
import { opacityVariant } from "@/variants/globals";
import { UserInterface } from "@/interfaces/user";

const DashBoardUsersTable = ({ data }: { data: UserInterface[] }) => {
  return (
    <FadeElement delay={0.3} cls="">
      <table className="order box-shadow">
        <thead>
          <tr>
            <th> username</th>
            <th>email</th>
            <th> createdAt </th>
            <th> last in </th>
            <th style={{ width: 150 }}> order state </th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence mode="wait">
            {data?.map((user: UserInterface, i: number) => {
              return (
                <motion.tr
                  key={i}
                  variants={opacityVariant}
                  initial="start"
                  animate="end"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                >
                  <TrUser index={i} {...user} />
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </tbody>
      </table>
    </FadeElement>
  );
};

export default DashBoardUsersTable;
