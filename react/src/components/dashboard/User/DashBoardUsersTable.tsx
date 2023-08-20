import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { opacityVariant } from "../../../variants/globals";

import TrUser from "./TrUser";
import FadeElement from "../../widgets/animation/FadeElement";

const DashBoardUsersTable = ({ data }: { data: any }) => {
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
            {data?.map((user: any, i: number) => {
              return (
                <motion.tr
                  key={user._id}
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
