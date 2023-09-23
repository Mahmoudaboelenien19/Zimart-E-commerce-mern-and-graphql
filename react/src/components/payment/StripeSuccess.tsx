import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ContinueShopping from "./ContinueShopping";

import MainBtn from "../widgets/buttons/MainBtn";
import MainPop from "../widgets/MainPop";
import useParams from "@/custom/useParams";
import CircleCheckSvg from "@/custom SVGs/CircleCheckSvg";
import useHideScroll from "@/custom/useHideScroll";
import MobileCloseDropDown from "../widgets/dropdowns/MobileCloseDropDown";
const StripeSuccess = () => {
  const { getParam, deleteParam } = useParams();
  const isSuccess = getParam("success") || "";
  const [show, setShow] = useState(Boolean(isSuccess));
  const location = useLocation();

  const orderId = location.state?.orderId;
  const orderRef = useRef(orderId);
  const check = (isSuccess && orderRef.current) || false;
  const navigate = useNavigate();

  const delSuccessParam = () => deleteParam("success");
  useEffect(() => {
    if (!check) {
      delSuccessParam();
    }
  }, [check]);

  useHideScroll(check);
  return (
    <>
      {check && (
        <MainPop bool={show} setter={setShow}>
          <div className="scale">
            <CircleCheckSvg check={true} />
          </div>
          <MobileCloseDropDown
            setter={setShow}
            bool={show}
            title="close"
            fn={delSuccessParam}
          />
          <div className="center col  order-success-pop">
            <h1>your order is confirmed</h1>
            <p>
              we&apos;ll send you a shipping confirmation email as soon as your
              order ships
            </p>
          </div>
          <div className="center between" style={{ width: 300, gap: 10 }}>
            <MainBtn
              btn="view order"
              cls="btn center gap order-pop-btn view-order-btn  "
              fn={() => navigate(`/dashboard/orders/${orderRef.current}`)}
            />

            <ContinueShopping setter={setShow} fn={delSuccessParam} />
          </div>
        </MainPop>
      )}
    </>
  );
};

export default StripeSuccess;
