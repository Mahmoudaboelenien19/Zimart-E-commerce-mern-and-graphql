import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ContinueShopping from "./ContinueShopping";
import MainBtn from "../widgets/buttons/MainBtn";
import MainPop from "../widgets/shared/popup/MainPop";
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
  console.log({
    check,
    orderRef,
    isSuccess,
  });
  const navigate = useNavigate();

  const delSuccessParam = () => deleteParam("success");
  useEffect(() => {
    if (!orderRef.current) {
      delSuccessParam();
    }
  }, [isSuccess]);

  useHideScroll(Boolean(isSuccess));
  return (
    <>
      {check && (
        <MainPop bool={show} setter={setShow}>
          <MobileCloseDropDown
            setter={setShow}
            bool={show}
            title="close"
            fn={delSuccessParam}
          />
          <div className="center col  order-success-pop">
            <div className="scale">
              <CircleCheckSvg check={true} />
            </div>
            <h1>your order is confirmed</h1>
            <p>
              we&apos;ll send you a shipping confirmation email as soon as your
              order ships
            </p>
          </div>
          <div className="center " style={{ width: 300, gap: 20 }}>
            <ContinueShopping setter={setShow} fn={delSuccessParam} />
            <MainBtn
              btn="view order"
              className="btn center gap order-pop-btn view-order-btn  "
              onClick={() => navigate(`/dashboard/orders/${orderRef.current}`)}
            />
          </div>
        </MainPop>
      )}
    </>
  );
};

export default StripeSuccess;
