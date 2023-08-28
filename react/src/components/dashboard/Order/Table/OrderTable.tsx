import React, { useContext } from "react";
import Checkbox from "../../../../custom SVGs/checkbox";
import Title from "../../../widgets/Title";
import { AnimatePresence } from "framer-motion";
import { AiTwotoneDelete } from "react-icons/ai";
import useDeleteOrder from "../../../../custom/useDeleteOrder";
import FadeElement from "../../../widgets/animation/FadeElement";
import { checkContext } from "../Orders";
import Order from "./Order";
import { OrderInterface } from "../../../../interfaces/order";

const OrderTable = () => {
  const { arrOfOrders, setarrOfOrders, selectALl, setSlectALl, dataShown } =
    useContext(checkContext);

  const { handleDeleteOrder } = useDeleteOrder(arrOfOrders);

  return (
    <>
      <div
        onClick={() => {
          handleDeleteOrder();
          setarrOfOrders([]);
          setSlectALl("");
        }}
        className="order-del-par"
      >
        <AnimatePresence>
          {arrOfOrders.length >= 1 && (
            <FadeElement cls="gap delete-order" key={"delete-order"}>
              <Title
                title={`delete ${arrOfOrders.length} order${
                  arrOfOrders.length >= 2 ? "s" : ""
                }`}
                dir="left"
                abs
              >
                <AiTwotoneDelete className="icon " color="var(--delete)" />
              </Title>
            </FadeElement>
          )}
        </AnimatePresence>
      </div>
      <FadeElement delay={0.3} cls="">
        <table className="order box-shadow">
          <thead>
            <tr>
              <th className="center">
                <Title
                  title={
                    selectALl === "all" ? "unselect all" : "select all orders"
                  }
                  dir="left"
                >
                  <Checkbox
                    filter={"all"}
                    isChecked={selectALl}
                    setIsChecked={setSlectALl}
                  />{" "}
                </Title>
              </th>
              <th> order id</th>
              <th> created At</th>
              <th>delivered At</th>
              <th> total </th>
              <th style={{ width: 150 }}> order state </th>
            </tr>
          </thead>
          <tbody style={{ overflow: "hidden" }}>
            <>
              {dataShown.map((order: OrderInterface, i: number) => {
                return <Order key={order._id} index={i} {...order} />;
              })}
            </>
          </tbody>
        </table>
      </FadeElement>
    </>
  );
};

export default OrderTable;
