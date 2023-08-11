import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Overley from "./Overley";
import CircleCheckSvg from "../../custom SVGs/CircleCheckSvg";
import { motion, AnimatePresence } from "framer-motion";
import { textVariant } from "../../variants/globals";
const StripeSuccess = () => {
  const location = useLocation();
  const isSuccess = location.search.includes("?success=true");

  const [show, setShow] = useState(false);
  useEffect(() => {
    if (isSuccess) {
      setShow(true);
    }
  }, [isSuccess]);

  const parVar = {
    start: {},
    end: { transition: { staggerChildren: 0.4 } },
  };
  const navigate = useNavigate();
  return (
    <AnimatePresence>
      {show && (
        <Overley
          dir="bottom"
          height={200}
          sethide={setShow}
          cls="order-success gap center col "
        >
          <motion.div className={` confirmed center col gap`} variants={parVar}>
            <div className="scale">
              <CircleCheckSvg check={true} />
            </div>
            <motion.span
              variants={textVariant}
              onAnimationComplete={() =>
                setTimeout(() => {
                  setShow(false);
                  navigate("/");
                }, 2000)
              }
            >
              your order is submitted
            </motion.span>
          </motion.div>
        </Overley>
      )}
    </AnimatePresence>
  );
};

export default StripeSuccess;
