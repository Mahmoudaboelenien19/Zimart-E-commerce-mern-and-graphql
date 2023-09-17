import React, { useContext, useEffect } from "react";
import { useAnimate } from "framer-motion";
import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";
import { AiFillWarning } from "react-icons/ai";
import { isAuthContext } from "@/context/isAuth";
import { useAppDispatch } from "@/custom/reduxTypes";
import { Change_Cart_Count } from "@/graphql/mutations/user";
import { changeCartCountRedux } from "@/redux/cartSlice";

const Counter = ({
  counter,
  setCounter,
  productId,

  stock,
}: {
  productId: string;
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
  stock: number;
}) => {
  const handleCount = (num: number) => {
    if (num < 1) {
      return 1;
    } else if (num >= stock) {
      toast(`you can't exceed ${stock} for this product`, {
        icon: <AiFillWarning fontSize={18} color="var(--star)" />,
      });
      return stock;
    } else {
      return num;
    }
  };

  const { userId } = useContext(isAuthContext);
  const dispatch = useAppDispatch();
  const [changeCartCuntDB] = useMutation(Change_Cart_Count);
  useEffect(() => {
    if (stock < counter) {
      setCounter(stock);
      changeCartCuntDB({
        variables: {
          input: {
            userId,
            productId,
            count: stock,
          },
        },
      });
    }
  }, []);
  const handleIncrease = () =>
    setCounter((cur): number => handleCount(cur + 1));
  const handleDecrease = () =>
    setCounter((cur): number => handleCount(cur - 1));

  const [countRef, animateCount] = useAnimate();
  const handleIncreaseFn = () => {
    handleIncrease();

    if (counter != stock) {
      dispatch(changeCartCountRedux({ count: counter + 1, productId }));
      animateCount("small", { y: [-40, 5, 0] }, { duration: 0.4 });
      changeCartCuntDB({
        variables: {
          input: {
            userId,
            productId,
            count: counter + 1,
          },
        },
      });
    }
  };

  const handleDecreaseCount = () => {
    handleDecrease();
    if (counter != 1) {
      dispatch(changeCartCountRedux({ count: counter - 1, productId }));

      animateCount("small", { y: [40, -5, 0] }, { duration: 0.4 });

      changeCartCuntDB({
        variables: {
          input: {
            userId,
            productId,
            count: counter - 1,
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
        <small>{counter}</small>
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
