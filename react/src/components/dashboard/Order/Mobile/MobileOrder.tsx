import { Fragment } from "react";
import { AnimatePresence, motion } from "framer-motion";
import OrderDetailsIcon from "../OrderDetailsIcon";
import { useScrollDirection } from "use-scroll-direction";
import StyledPrice from "@/components/widgets/StyledPrice";
import FadeElement from "@/components/widgets/animation/FadeElement";
import Skeleton from "react-loading-skeleton";
import useUpdateOrder from "@/custom/dashboadrd/useUpdateOrder";
import DashDropDown from "../../DashDropDown";
import { ORDER } from "@/types/order";

const MobileOrder = ({ deliveredAt, state, _id, cost, createdAt }: ORDER) => {
  const { isScrollingDown } = useScrollDirection();
  const { handleUpdateOrder } = useUpdateOrder();
  const updateState = (st: string) => {
    handleUpdateOrder(_id, st);
  };
  return (
    <motion.div
      initial={{ y: isScrollingDown ? -40 : 40 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="dash-details-mobile   col gap"
    >
      {_id ? (
        <Fragment>
          <div className="mobile-title center between">
            <div className="details">
              <span className="detail"> order :</span>
              <p>{_id}</p>
            </div>
            <FadeElement className="center gap" delay={0.2}>
              <div className="state-par  ">
                <AnimatePresence mode="wait">
                  <FadeElement
                    className="mobile"
                    key={state}
                    style={{
                      background: `var(--${state?.split(" ").slice(-1)})`,
                    }}
                  >
                    {state}
                  </FadeElement>
                </AnimatePresence>
                <DashDropDown
                  arr={[
                    "pending",
                    "shipped",
                    "delivered",
                    "canceled",
                    "on hold",
                  ]}
                  fn={updateState}
                  state={state}
                />
              </div>

              <OrderDetailsIcon _id={_id} />
            </FadeElement>
          </div>

          <div className="details">
            <div className="detail">created at : </div>
            <p>
              {new Date(createdAt).toLocaleDateString()} -{" "}
              {new Date(createdAt).toLocaleTimeString()}
            </p>
          </div>

          <div className="details">
            <div className="detail">delivred at : </div>
            <AnimatePresence mode="wait">
              <FadeElement key={deliveredAt}>
                <p>
                  {deliveredAt
                    ? `${new Date(deliveredAt).toLocaleDateString()} -
                  ${new Date(deliveredAt).toLocaleTimeString()}`
                    : "not delivered yet"}
                </p>
              </FadeElement>
            </AnimatePresence>
          </div>
          <StyledPrice price={cost} />
        </Fragment>
      ) : (
        <Skeleton count={4} className="skelton" style={{ margin: "5px 0" }} />
      )}
    </motion.div>
  );
};

export default MobileOrder;
