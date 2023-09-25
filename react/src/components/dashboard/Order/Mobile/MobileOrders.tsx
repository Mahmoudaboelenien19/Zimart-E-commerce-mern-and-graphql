import React, { useContext, useEffect } from "react";
import { checkContext } from "../Orders";
import { AnimatePresence, motion } from "framer-motion";
import MobileOrder from "./MobileOrder";
import { Outlet } from "react-router-dom";
import { OrderInterface } from "@/interfaces/order";
import { opacityVariant } from "@/variants/globals";

const MobileOrders = () => {
  const { dataShown } = useContext(checkContext);
  return (
    <div className="">
      <AnimatePresence>
        {dataShown?.map((order: OrderInterface, i: number) => {
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
              <MobileOrder {...order} />
            </motion.div>
          );
        })}
      </AnimatePresence>
      <Outlet />
    </div>
  );
};

export default MobileOrders;
