import React, { useContext, useEffect } from "react";
import { checkContext } from "../Orders";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariant } from "../../../../variants/globals";
import MobileOrder from "./MobileOrder";
import { Outlet } from "react-router-dom";
import { OrderInterface } from "../../../../interfaces/order";
const MobileOrders = () => {
  const { setSlectALl, dataShown } = useContext(checkContext);

  // const { handleDeleteOrder } = useDeleteOrder(arrOfOrders);

  useEffect(() => {
    setSlectALl("");
  }, []);

  return (
    <div className="">
      <AnimatePresence>
        {dataShown.map((order: OrderInterface) => {
          return (
            <motion.div
              key={order._id}
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
