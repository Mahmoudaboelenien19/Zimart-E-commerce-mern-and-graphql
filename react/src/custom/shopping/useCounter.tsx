import { Change_Cart_Count } from "@/graphql/mutations/user";
import { changeCartCountRedux } from "@/redux/cartSlice";
import { useMutation } from "@apollo/client";
import { useAnimate } from "framer-motion";
import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { AiFillWarning } from "react-icons/ai";
import { useAppSelector, useAppDispatch } from "../helpers/reduxTypes";

const useCounter = (productId: string, count: number, stock: number) => {
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

  const initialRender = useRef(true);
  useEffect(() => {
    if (stock < count && initialRender.current) {
      initialRender.current = false;
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

  const { userId } = useAppSelector((st) => st.isAuth);
  const dispatch = useAppDispatch();
  const [changeCartCuntDB] = useMutation(Change_Cart_Count);
  const [countRef, animateCount] = useAnimate();

  const handleIncreaseCount = () => {
    handleCount(count);
    if (count != stock) {
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

  return { countRef, handleDecreaseCount, handleIncreaseCount };
};

export default useCounter;
