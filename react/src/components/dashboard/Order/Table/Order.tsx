import { AnimatePresence } from "framer-motion";
import OrderDetailsIcon from "../OrderDetailsIcon";
import FadeElement from "@/components/widgets/animation/FadeElement";
import Skeleton from "react-loading-skeleton";
import useUpdateOrder from "@/custom/dashboadrd/useUpdateOrder";
import DashDropDown from "../../DashDropDown";
import { ORDER } from "@/types/order";
const orderArr = ["pending", "shipped", "delivered", "canceled", "on hold"];
const Order = ({ deliveredAt, state, _id, cost, createdAt }: ORDER) => {
  const { handleUpdateOrder } = useUpdateOrder();
  const updateState = (st: string) => {
    handleUpdateOrder(_id, st);
  };

  return (
    <tr>
      <td className="first-table-head">
        {_id || <Skeleton height={12} width={80} />}
      </td>
      <td className="w-25">
        {createdAt ? (
          <>
            {new Date(createdAt).toLocaleDateString()} -
            {new Date(createdAt).toLocaleTimeString()}
          </>
        ) : (
          <Skeleton height={12} width={60} />
        )}
      </td>
      <td className="w-25">
        <AnimatePresence mode="wait">
          {!_id ? (
            <Skeleton height={12} width={30} />
          ) : (
            <>
              {deliveredAt ? (
                <FadeElement key={`order${deliveredAt}`}>
                  {new Date(deliveredAt).toLocaleDateString()} -
                  {new Date(deliveredAt).toLocaleTimeString()}
                </FadeElement>
              ) : (
                <FadeElement key={"underscore" + deliveredAt}>
                  &#95;
                </FadeElement>
              )}
            </>
          )}
        </AnimatePresence>
      </td>
      <td className="w-10">
        {cost ? +cost + "$" : <Skeleton height={12} width={30} />}{" "}
      </td>

      <td className="state-word">
        <div className="  center ">
          {_id ? (
            <>
              <AnimatePresence mode="wait">
                <FadeElement
                  className="state"
                  key={state}
                  duration={0.15}
                  style={{
                    color: `var(--${state?.split(" ").slice(-1)})`,
                  }}
                >
                  {state}
                </FadeElement>
              </AnimatePresence>

              <>
                <DashDropDown state={state} arr={orderArr} fn={updateState} />
                <OrderDetailsIcon _id={_id} />
              </>
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
