import useCounter from "@/custom/shopping/useCounter";

const Counter = ({
  count,
  productId,
  stock,
}: {
  productId: string;
  count: number;
  stock: number;
}) => {
  const { countRef, handleDecreaseCount, handleIncreaseCount } = useCounter(
    productId,
    count,
    stock
  );

  return (
    <div className="counter-par center " ref={countRef}>
      <button
        className="btn  center counter red "
        onClick={handleDecreaseCount}
      >
        -
      </button>
      <span className="count ">
        <small>{count}</small>
      </span>

      <button
        className="btn  center green counter relative"
        onClick={handleIncreaseCount}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
