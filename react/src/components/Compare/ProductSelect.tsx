import React, { useEffect, useRef, useState } from "react";
import { BiDownArrow } from "react-icons/bi";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { opacityVariant, selectDropDownVariants } from "../../variants/globals";
import { useAppSelector } from "../../custom/reduxTypes";
interface Props {
  product: string;
  setProduct: React.Dispatch<React.SetStateAction<string>>;
}

const ProductSelect = ({ product, setProduct }: Props) => {
  const [showDropSelect, setShowSelectDrop] = useState(false);
  const { compare } = useAppSelector((st) => st.compare);
  const toggleShowSelectDrop = () => {
    setShowSelectDrop(!showDropSelect);
  };

  const parent = {
    start: {},
    end: { transition: { staggerChildren: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.4 } },
  };

  const listVariant = {
    start: { opacity: 0, x: -100 },
    end: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };
  const ref = useRef<HTMLDivElement | null>(null);
  const view = useInView(ref);
  return (
    <div
      className="select-country-par relative center   w-100"
      style={{ margin: "100px 0px 10px 0px" }}
      onClick={toggleShowSelectDrop}
    >
      <AnimatePresence mode="wait">
        <motion.div
          style={{ overflow: "hidden" }}
          className="select-country center gap"
          variants={parent}
          initial="start"
          animate="end"
          exit="exit"
        >
          <motion.span variants={opacityVariant}> {product}</motion.span>
        </motion.div>
      </AnimatePresence>
      <BiDownArrow className="icon select-icon arrow" />
      <AnimatePresence>
        {showDropSelect && (
          <motion.div
            className={`select-dropdown gap drop-country`}
            style={{ height: "fit-content", maxHeight: 150 }}
          >
            <>
              {compare.length ? (
                <div key={"compared-data"}>
                  {compare.map(({ title, productId }, i) => {
                    return (
                      <motion.div
                        variants={listVariant}
                        custom={view}
                        ref={ref}
                        initial="start"
                        animate="end"
                        exit="exit"
                        key={i}
                        className="select-country center gap"
                        whileHover={{ x: 4 }}
                        onClick={() => {
                          setProduct(title);
                        }}
                      >
                        <span> {title}</span>
                      </motion.div>
                    );
                  })}{" "}
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.span
                    variants={opacityVariant}
                    key={"no compared-date"}
                    transition={{ duration: 0.4 }}
                    initial="start"
                    animate="end"
                    exit="exit"
                  >
                    no products at your product list
                  </motion.span>
                </AnimatePresence>
              )}
            </>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>{showDropSelect && <></>}</AnimatePresence>
    </div>
  );
};

export default ProductSelect;
