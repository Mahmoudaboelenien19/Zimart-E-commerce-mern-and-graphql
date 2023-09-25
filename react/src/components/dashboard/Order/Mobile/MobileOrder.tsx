import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import OrderDetailsIcon from "../OrderDetailsIcon";
import DashDropDown from "../DashDropDown";
import { useScrollDirection } from "react-use-scroll-direction";
import StyledPrice from "@/components/widgets/StyledPrice";
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
const MobileOrder = ({ deliveredAt, state, _id, cost, createdAt }: Props) => {
  const [orderState, setOrderState] = useState(state);

  const { isScrollingDown } = useScrollDirection();
  return (
    <motion.div
      initial={{ y: isScrollingDown ? -40 : 40 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="order-mobile box-shadow"
    >
      <span className="order-delete-mobile center  ">
        {_id ? (
          <FadeElement cls="center gap" delay={0.2}>
            <div className="order-state-par center ">
              <AnimatePresence mode="wait">
                <FadeElement cls="" key={state}>
                  <span
                    style={{
                      background: `var(--${state?.split(" ").slice(-1)})`,
                      width: 60,
                      padding: 5,
                    }}
                    className="order-state center gap"
                  >
                    {state}
                  </span>
                </FadeElement>
              </AnimatePresence>
              <DashDropDown
                arr={["pending", "shipped", "delivered", "canceled", "on hold"]}
                _id={_id}
                setter={setOrderState}
                state={orderState}
              />
            </div>

            <OrderDetailsIcon _id={_id} />
          </FadeElement>
        ) : (
          <Skeleton width={80} height={15} />
        )}
      </span>

      {!_id ? (
        <Skeleton height={10} width={"50%"} />
      ) : (
        <div className="mobile-order-title center between">
          <span className="mobile-order-id ">
            <span> Order #{_id}</span>
          </span>
        </div>
      )}

      {!_id ? (
        <Skeleton height={10} width={"50%"} />
      ) : (
        <span className="date" style={{ marginTop: 6 }}>
          <span className="order-date">created at : </span>
          &#160; {new Date(createdAt).toLocaleDateString()} -{" "}
          {new Date(createdAt).toLocaleTimeString()}
        </span>
      )}
      {!_id ? (
        <Skeleton height={10} width={"50%"} />
      ) : (
        <span className="date " style={{ display: "flex" }}>
          <span className="order-date">delivred at : </span>
          <AnimatePresence mode="wait">
            <FadeElement cls="" key={deliveredAt}>
              &#160;{" "}
              {deliveredAt
                ? `${new Date(deliveredAt).toLocaleDateString()} -
          ${new Date(deliveredAt).toLocaleTimeString()}`
                : "not delivered yet"}
            </FadeElement>
          </AnimatePresence>
        </span>
      )}
      {!_id ? (
        <Skeleton height={10} width={"50%"} />
      ) : (
        <StyledPrice price={cost} />
      )}
    </motion.div>
  );
};

export default MobileOrder;
