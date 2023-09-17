import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import OrderDetailsIcon from "../OrderDetailsIcon";
import DashDropDown from "../DashDropDown";
import FadeElement from "@/components/widgets/animation/FadeElement";
import Checkbox from "@/custom SVGs/checkbox";
import { opacityVariant } from "@/variants/globals";

interface Props {
  state: string;
  _id: string;
  cost: number;
  count: number;
  index: number;
  createdAt: string;
  deliveredAt: string;
}
const Order = ({ deliveredAt, state, _id, cost, index, createdAt }: Props) => {
  const [isSelected, setIsSeleted] = useState<number | string>("");
  const [orderState, setOrderState] = useState(state);

  return (
    <motion.tr
      variants={opacityVariant}
      initial="start"
      animate="end"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <td className="center" style={{ height: 20 }}>
        <Checkbox
          filter={_id}
          isChecked={isSelected}
          setIsChecked={setIsSeleted}
          index={index}
        />{" "}
      </td>

      <td>{_id}</td>
      <td>
        {new Date(createdAt).toLocaleDateString()} -{" "}
        {new Date(createdAt).toLocaleTimeString()}
      </td>
      <td>
        <AnimatePresence mode="wait">
          {deliveredAt ? (
            <FadeElement cls="" key={`order${deliveredAt}`}>
              {new Date(deliveredAt).toLocaleDateString()} -
              {new Date(deliveredAt).toLocaleTimeString()}
            </FadeElement>
          ) : (
            <FadeElement cls="" key={"underscore" + deliveredAt}>
              &#95;
            </FadeElement>
          )}
        </AnimatePresence>
      </td>
      <td>{cost} $</td>
      <div className=" center gap`">
        <td
          className="order-state center"
          style={{
            width: "100%",
            color: `var(--${state.split(" ").slice(-1)})`,
          }}
        >
          <AnimatePresence mode="wait">
            <FadeElement cls="" key={state}>
              <div style={{ width: 70 }}>{state}</div>
            </FadeElement>
          </AnimatePresence>
          <DashDropDown
            arr={["pending", "shipped", "delivered", "canceled", "on hold"]}
            _id={_id}
            setter={setOrderState}
            state={orderState}
          />
          <div className="order-detail-par">
            <OrderDetailsIcon _id={_id} />
          </div>
        </td>
      </div>
    </motion.tr>
  );
};

Order.displayName = "Order";
export default Order;
