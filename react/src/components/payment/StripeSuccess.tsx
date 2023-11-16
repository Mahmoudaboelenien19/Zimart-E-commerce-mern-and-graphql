import { useLocation, useNavigate } from "react-router-dom";
import ContinueShopping from "./ContinueShopping";
import MainBtn from "../widgets/buttons/MainBtn";
import MainPop from "../widgets/shared/popup/MainPop";
import CircleCheckSvg from "@/custom SVGs/CircleCheckSvg";
import useParams from "@/custom/helpers/useParams";
import { useState } from "react";

const StripeSuccess = () => {
  const [show, setShow] = useState(true);
  const location = useLocation();
  const orderId = location.state?.orderId;
  const navigate = useNavigate();
  const { deleteParam } = useParams();

  const delSuccessParam = () => deleteParam("success");
  return (
    <>
      {orderId && (
        <MainPop bool={show} setter={setShow} className="order-success">
          <div className=" content col">
            <div className="scale">
              <CircleCheckSvg check={true} />
            </div>
            <h2>your order is confirmed</h2>
            <p>
              we&apos;ll send you a shipping confirmation email as soon as your
              order ships
            </p>

            <div className="btns center">
              <ContinueShopping setter={setShow} fn={delSuccessParam} />
              <MainBtn
                btn="view order"
                className="btn center gap order-pop-btn view-order-btn  "
                onClick={() => {
                  navigate(`/dashboard/orders/${orderId}`);
                }}
              />
            </div>
          </div>
        </MainPop>
      )}
    </>
  );
};

export default StripeSuccess;
