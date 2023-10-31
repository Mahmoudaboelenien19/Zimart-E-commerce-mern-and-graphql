import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Price from "./Price";
import BuyBtn from "@/components/payment/BuyBtn";
import FadeElement from "@/components/widgets/animation/FadeElement";
import { cartInterface } from "@/interfaces/user.interface";

const TotalPrice = ({
  subTotal,
  cart,
}: {
  subTotal: number;

  cart: cartInterface[];
}) => {
  const [total, setTotal] = useState(0);
  const [freeShipping, setFreeShipping] = useState(false);
  const [discount, setDiscount] = useState(false);

  useEffect(() => {
    if (subTotal >= 800) {
      setFreeShipping(true);
    } else {
      setFreeShipping(false);
    }
    if (subTotal >= 1000) {
      setDiscount(true);
    } else {
      setDiscount(false);
    }
  }, [subTotal]);

  useEffect(() => {
    if (freeShipping && discount) {
      setTotal(subTotal - subTotal * 0.05);
    } else if (freeShipping) {
      setTotal(subTotal);
    } else {
      setTotal(subTotal + 10);
    }
  }, [subTotal, freeShipping, discount]);

  const priceVariant = {
    start: {},
    end: (bool: boolean) => ({
      opacity: bool ? 0.4 : 1,
      transition: { delay: bool ? 0 : 0.8 },
    }),
  };

  const freeVariant = {
    start: { opacity: 0 },
    end: { opacity: 1, transition: { delay: 1, duration: 0.2 } },
    exit: { opacity: 0, transition: { delay: 0, duration: 0.2 } },
  };

  const lineVariant = {
    start: { width: 0 },
    end: {
      width: "110%",
      opacity: 1,
      transition: { delay: 0.4, duration: 0.4 },
    },
    exit: { width: 0, transition: { delay: 0.5, duration: 0.2 } },
  };
  if (cart.length >= 1 && cart[0]?.product?.title) {
    const ar = cart
      .filter((item) => item?.product?.stock !== 0)
      ?.map(
        ({
          _id,
          productId,
          parentId,
          count,
          path,
          product: { title, price },
        }) => ({
          _id,
          productId,
          parentId,
          price,
          path,
          title,
          count,
        })
      );

    return (
      <AnimatePresence>
        <FadeElement
          className="totel-price center between col box-shadow"
          delay={1.5}
          key="cart-total-price"
        >
          <div className="center col" style={{ height: 40 }}>
            <h3
              className="header underline header-sm underline-sm"
              style={{ color: "var(--white)", marginBottom: 8 }}
            >
              order summary
            </h3>
          </div>

          <div className="order-details gap center col w-100">
            <div className="center between w-100">
              <span className="cart-detail">Subtotal :</span>
              <span className="order-val">
                {" "}
                ${" "}
                <AnimatePresence mode="wait">
                  <Price num={Number(subTotal.toFixed(2))} key={"subtotal"} />
                </AnimatePresence>
              </span>
            </div>

            <div className="center between w-100">
              <span className="cart-detail">Shipping :</span>
              <span className="free-par">
                <motion.span
                  variants={priceVariant}
                  custom={freeShipping}
                  initial="start"
                  animate="end"
                  exit="exit"
                  key={"price"}
                >
                  $ {cart.length ? 10 : 0}
                </motion.span>
                <AnimatePresence>
                  {freeShipping && (
                    <>
                      <motion.span
                        key={"line"}
                        variants={lineVariant}
                        custom={freeShipping}
                        className="free-line"
                        initial="start"
                        animate="end"
                        exit="exit"
                      ></motion.span>
                      <motion.span
                        key={"free"}
                        variants={freeVariant}
                        initial="start"
                        animate="end"
                        exit="exit"
                        className="free shadow"
                      >
                        {" "}
                        free
                      </motion.span>{" "}
                    </>
                  )}
                </AnimatePresence>
              </span>
            </div>

            <div className="center between w-100">
              <span className="cart-detail ">Discount :</span>
              <span className="order-val">
                ${" "}
                <AnimatePresence>
                  <Price
                    key={"discounted"}
                    num={discount ? Number((0.05 * subTotal).toFixed(2)) : 0}
                  />
                </AnimatePresence>
              </span>
            </div>
            <h3 className="total-cost">
              <span>total:</span>
              <span style={{ color: "var(--white)" }}>
                <span> $</span>
                <AnimatePresence mode="wait">
                  <Price
                    num={cart.length ? Number(total.toFixed(2)) : 0}
                    key={"total-$"}
                  />
                </AnimatePresence>
              </span>
            </h3>
          </div>
          <BuyBtn products={ar} />
        </FadeElement>
      </AnimatePresence>
    );
  } else {
    return <></>;
  }
};

export default TotalPrice;
