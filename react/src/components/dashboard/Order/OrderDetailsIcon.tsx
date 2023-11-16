import { BsInfoCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useParams from "@/custom/helpers/useParams";
import Title from "@/components/widgets/Title";

const OrderDetailsIcon = ({ _id }: { _id: string }) => {
  const navigate = useNavigate();
  const { showDashBoaedAside } = useParams();
  const handleLink = () =>
    navigate(
      `/dashboard/orders/${_id}` +
        `${showDashBoaedAside ? "?showDashBoaedAside=true" : ""}`
    );
  return (
    <Title title={`see order details`}>
      <BsInfoCircleFill
        className="icon"
        color="grey"
        fontSize={14}
        onClick={handleLink}
      />
    </Title>
  );
};

export default OrderDetailsIcon;
