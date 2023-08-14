import React from "react";
import { useNavigate } from "react-router-dom";
import { BiRightArrowAlt } from "react-icons/bi";

interface Props {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}
const ContinueShopping = ({ setter }: Props) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate("/");
        setter(false);
      }}
      className="btn center gap order-pop-btn  continue-shopping"
    >
      <span>continue shopping</span>
      <BiRightArrowAlt />
    </button>
  );
};

export default ContinueShopping;
