import { useAppSelector } from "@/custom/helpers/reduxTypes";
import { AnimatePresence, motion } from "framer-motion";
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

const priceVariant = {
  start: {},
  end: (bool: boolean) => ({
    opacity: bool ? 0.4 : 1,
    transition: { delay: bool ? 0 : 0.8 },
  }),
};
type Props = {
  bool: boolean;
};
const Shipping = ({ bool }: Props) => {
  const { cart } = useAppSelector((st) => st.cart);
  return (
    <div className="details w-100">
      <div className="detail">Shipping</div>
      <div className="free-par value">
        <motion.div
          variants={priceVariant}
          custom={bool}
          initial="start"
          animate="end"
          exit="exit"
          key={"price"}
          className="value"
        >
          $ {cart.length ? 10 : 0}
        </motion.div>
        <AnimatePresence>
          {bool && (
            <>
              <motion.span
                key={"line"}
                variants={lineVariant}
                custom={bool}
                className="free-line"
                initial="start"
                animate="end"
                exit="exit"
              />
              <motion.span
                key={"free"}
                variants={freeVariant}
                initial="start"
                animate="end"
                exit="exit"
                className="free shadow"
              >
                free
              </motion.span>{" "}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Shipping;
