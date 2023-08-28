import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsInfoCircleFill } from "react-icons/bs";
import Title from "../Title";
interface Props {
  _id: string;
}

const DetailsBtn = ({ _id }: Props) => {
  const navigate = useNavigate();
  const handleDetailsFn = () => {
    navigate(`/${_id}`);
  };

  return (
    <Link to={`/${_id}`}>
      <button className={"details-btn "} onClick={handleDetailsFn}>
        <Title title="more details ">
          <BsInfoCircleFill />
        </Title>
      </button>
    </Link>
  );
};

export default DetailsBtn;
