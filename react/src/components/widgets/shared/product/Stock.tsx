import { AiOutlineCheck } from "react-icons/ai";

type Props = { stock: number };

const Stock = ({ stock }: Props) => {
  return (
    <span className=" center stock-par shadow">
      <span className="stock-icon ">
        <AiOutlineCheck className=" icon" />
      </span>
      <span className="stock"> {stock}</span>in stock
    </span>
  );
};

export default Stock;
