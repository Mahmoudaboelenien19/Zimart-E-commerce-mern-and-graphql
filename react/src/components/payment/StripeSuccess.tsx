import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Overley from "../widgets/dropdowns/Overley";
import CircleCheckSvg from "../../custom SVGs/CircleCheckSvg";
import { AnimatePresence } from "framer-motion";
import ContinueShopping from "./ContinueShopping";

import MobileCloseDropDown from "../widgets/dropdowns/MobileCloseDropDown";
import FadeElement from "../widgets/animation/FadeElement";
import MainBtn from "../widgets/buttons/MainBtn";
const StripeSuccess = () => {
  const location = useLocation();

  const orderId = location.state?.orderId;
  const orderRef = useRef(orderId);
  const isSuccess = location.search.includes("?success=true");

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (isSuccess && orderId) {
      setShow(true);
    } else {
      navigate("/");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      navigate("/");
      document.body.style.overflowY = "auto";
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <Overley sethide={setShow} cls=" ">
          <FadeElement cls="order-confirmed pop-up gap center col" delay={0.4}>
            <div className="scale">
              <CircleCheckSvg check={true} />
            </div>
            <MobileCloseDropDown setter={setShow} title="close" />
            <div className="center col ">
              <h1>your order is confirmed</h1>
              <p>
                we&apos;ll send you a shipping confirmation email as soon as
                your order ships
              </p>
            </div>
            <div className="center between" style={{ width: 250 }}>
              <MainBtn
                btn="view order"
                cls="btn center gap order-pop-btn view-order-btn  "
                fn={() => navigate(`/dashboard/orders/${orderRef.current}`)}
              />

              <ContinueShopping setter={setShow} />
            </div>
          </FadeElement>
        </Overley>
      )}
    </AnimatePresence>
  );
};

export default StripeSuccess;
