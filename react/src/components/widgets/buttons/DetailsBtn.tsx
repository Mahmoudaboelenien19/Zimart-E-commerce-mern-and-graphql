import React from "react";
import { Link } from "react-router-dom";
import { BsInfoCircleFill } from "react-icons/bs";
import Title from "../Title";
interface Props {
  _id: string;
}

const DetailsBtn = ({ _id }: Props) => {
  return (
    <Link to={`/${_id}`}>
      <Title title="more details ">
        <BsInfoCircleFill />
      </Title>
    </Link>
  );
};

export default DetailsBtn;
