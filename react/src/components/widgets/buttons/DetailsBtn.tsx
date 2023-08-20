import React from "react";
import { useNavigate } from "react-router-dom";
import MainBtn from "./MainBtn";
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
    <button className={"details-btn "} onClick={handleDetailsFn}>
      <Title title="more details ">
        <BsInfoCircleFill />
      </Title>
    </button>
  );
};

export default DetailsBtn;
