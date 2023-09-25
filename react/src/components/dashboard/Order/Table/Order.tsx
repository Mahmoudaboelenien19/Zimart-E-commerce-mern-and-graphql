import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import OrderDetailsIcon from "../OrderDetailsIcon";
import DashDropDown from "../DashDropDown";
import FadeElement from "@/components/widgets/animation/FadeElement";

import Skeleton from "react-loading-skeleton";

interface Props {
  state: string;
  _id: string;
  cost: number;
  count: number;
  createdAt: string;
  deliveredAt: string;
}
const Order = ({ deliveredAt, state, _id, cost, createdAt }: Props) => {
  const [orderState, setOrderState] = useState(state);

  return (
    <tr>
      <td className="first-table-head">
        {_id || <Skeleton height={12} width={80} />}
      </td>
      <td className="created-at">
        {createdAt ? (
          <>
            {new Date(createdAt).toLocaleDateString()} -
            {new Date(createdAt).toLocaleTimeString()}
          </>
        ) : (
          <Skeleton height={12} width={60} />
        )}
      </td>
      <td className="delivered">
        <AnimatePresence mode="wait">
          {!_id ? (
            <Skeleton height={12} width={30} />
          ) : (
            <>
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
            </>
          )}
        </AnimatePresence>
      </td>
      <td className="tota1">
        {cost ? +cost + "$" : <Skeleton height={12} width={30} />}{" "}
      </td>

      <td
        className="order-state"
        style={{
          color: `var(--${state?.split(" ").slice(-1)})`,
        }}
      >
        <div className="  center ">
          {_id ? (
            <>
              <AnimatePresence mode="wait">
                <FadeElement cls="w-100" key={state}>
                  <span>{state}</span>
                </FadeElement>
              </AnimatePresence>
              <DashDropDown
                arr={["pending", "shipped", "delivered", "canceled", "on hold"]}
                _id={_id}
                setter={setOrderState}
                state={orderState}
              />
              <span className="order-detail-par">
                <OrderDetailsIcon _id={_id} />
              </span>
            </>
          ) : (
            <Skeleton height={12} width={30} />
          )}
        </div>
      </td>
    </tr>
  );
};

Order.displayName = "Order";
export default Order;
