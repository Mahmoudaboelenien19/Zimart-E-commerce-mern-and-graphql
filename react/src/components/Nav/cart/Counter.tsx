import React, { useContext, useState } from "react";
import { useAnimate } from "framer-motion";
import { useAppDispatch } from "../../../custom/reduxTypes";
import { changeCartCountRedux } from "../../../redux/cartSlice.js";
import { useMutation } from "@apollo/client";
import { Change_Cart_Count } from "../../../graphql/mutations/user";
import { isAuthContext } from "../../../context/isAuth";

const Counter = ({
  count: defaultCount,
  productId,
}: {
  productId: string;
  count: number;
}) => {
  const [count, setCount] = useState(defaultCount);
  const handleCount = (num: number) => {
    if (num < 1) {
      return 1;
    } else if (num >= 20) {
      return 20;
    } else {
      return num;
    }
  };
  const { userId } = useContext(isAuthContext);
  const dispatch = useAppDispatch();
  const [changeCartCuntDB] = useMutation(Change_Cart_Count);
  const handleIncrease = () => setCount((cur): number => handleCount(cur + 1));
  const handleDecrease = () => setCount((cur): number => handleCount(cur - 1));

  const [countRef, animateCount] = useAnimate();
  const handleIncreaseFn = () => {
    handleIncrease();

    if (count != 20) {
      dispatch(changeCartCountRedux({ count: count + 1, productId }));
      animateCount("small", { y: [-40, 5, 0] }, { duration: 0.4 });
      changeCartCuntDB({
        variables: {
          input: {
            userId,
            productId,
            count: count + 1,
          },
        },
      });
    }
  };

  const handleDecreaseCount = () => {
    handleDecrease();
    if (count != 1) {
      dispatch(changeCartCountRedux({ count: count - 1, productId }));

      animateCount("small", { y: [40, -5, 0] }, { duration: 0.4 });

      changeCartCuntDB({
        variables: {
          input: {
            userId,
            productId,
            count: count - 1,
          },
        },
      });
    }
  };

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
        onClick={handleIncreaseFn}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
