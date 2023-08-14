import React, { useContext, useState } from "react";
import Title from "../../../widgets/Title";
import { AnimatePresence, motion } from "framer-motion";
import FadeElement from "../../../widgets/FadeElement";
import StyledPrice from "../../../widgets/StyledPrice";
import { AiTwotoneDelete } from "react-icons/ai";
import { checkContext } from "../Orders";
import useDeleteOrder from "../../../../custom/useDeleteOrder";
import OrderDetailsIcon from "../OrderDetailsIcon";
import DashDropDown from "../DashDropDown";
import { useScrollDirection } from "react-use-scroll-direction";

interface Props {
  state: string;
  _id: string;
  cost: number;
  count: number;
  createdAt: string;
  deliveredAt: string;
}
const MobileOrder = ({ deliveredAt, state, _id, cost, createdAt }: Props) => {
  const { setarrOfOrders } = useContext(checkContext);
  const { handleDeleteOrder } = useDeleteOrder([_id]);
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
        <div className="order-state-par center ">
          <AnimatePresence mode="wait">
            <FadeElement cls="" key={state}>
              <span
                style={{
                  background: `var(--${state.split(" ").slice(-1)})`,
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
        <Title title={`delete this order`}>
          <AiTwotoneDelete
            style={{
              marginRight: 2,
            }}
            fontSize={15}
            className="icon"
            onClick={() => {
              handleDeleteOrder();
              setarrOfOrders([]);
            }}
          />
        </Title>
        <OrderDetailsIcon _id={_id} />
      </span>

      <div className="mobile-order-title center between">
        <span className="mobile-order-id ">
          <span> Order #{_id}</span>
        </span>
      </div>
      <span className="date" style={{ marginTop: 6 }}>
        <span className="order-date">created at : </span>
        &#160; {new Date(createdAt).toLocaleDateString()} -{" "}
        {new Date(createdAt).toLocaleTimeString()}
      </span>
      <span className="date " style={{ display: "flex" }}>
        <span className="order-date">delivred at : </span>
        <AnimatePresence mode="wait">
          <FadeElement cls="" key={deliveredAt}>
            &#160;{" "}
            {deliveredAt
              ? `${new Date(deliveredAt).toLocaleDateString()} -
          ${new Date(deliveredAt).toLocaleTimeString()}`
              : "not delvired yet"}
          </FadeElement>
        </AnimatePresence>
      </span>
      <StyledPrice price={cost} />
    </motion.div>
  );
};

export default MobileOrder;
