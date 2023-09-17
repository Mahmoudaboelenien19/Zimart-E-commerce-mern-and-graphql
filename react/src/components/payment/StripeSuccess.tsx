import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CircleCheckSvg from "../../custom SVGs/CircleCheckSvg";

import ContinueShopping from "./ContinueShopping";

import MobileCloseDropDown from "../widgets/dropdowns/MobileCloseDropDown";

import MainBtn from "../widgets/buttons/MainBtn";
import MainPop from "../widgets/MainPop";
import useHideScroll from "../../custom/useHideScroll";
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

  useHideScroll(show);

  return (
    <MainPop bool={show} setter={setShow}>
      <div className="scale">
        <CircleCheckSvg check={true} />
      </div>
      <MobileCloseDropDown setter={setShow} title="close" />
      <div className="center col  order-success-pop">
        <h1>your order is confirmed</h1>
        <p>
          we&apos;ll send you a shipping confirmation email as soon as your
          order ships
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
    </MainPop>
  );
};

export default StripeSuccess;
