import { useNavigate } from "react-router-dom";
import { BiRightArrowAlt } from "react-icons/bi";

interface Props {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  fn: () => void;
}
const ContinueShopping = ({ setter, fn }: Props) => {
  const navigate = useNavigate();
  const handle = () => {
    navigate("/");
    setter(false);
    fn();
  };
  return (
    <button
      onClick={handle}
      className="btn center gap order-pop-btn  continue-shopping"
    >
      <span>continue shopping</span>
      <BiRightArrowAlt />
    </button>
  );
};

export default ContinueShopping;
