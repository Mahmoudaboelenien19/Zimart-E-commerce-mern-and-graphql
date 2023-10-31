import { Link } from "react-router-dom";
import { BsInfoCircleFill } from "react-icons/bs";
import Title from "@/components/widgets/Title";
interface Props {
  _id: string;
}

const DetailsBtn = ({ _id }: Props) => {
  return (
    <Link to={`/product/${_id}`} replace className="above">
      <Title title="more details ">
        <BsInfoCircleFill />
      </Title>
    </Link>
  );
};

export default DetailsBtn;
