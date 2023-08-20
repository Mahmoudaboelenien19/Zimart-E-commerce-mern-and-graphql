import React, { useContext, useEffect, useState } from "react";
import { isAuthContext } from "../../context/isAuth";
import { AnimatePresence, motion } from "framer-motion";
import Title from "../widgets/Title";
import { MdPlaylistAdd, MdPlaylistRemove } from "react-icons/md";
import { opacityVariant } from "../../variants/globals";
import { useMutation } from "@apollo/client";
import { AddTo_Compare } from "../../graphql/mutations/user";
import { useAppDispatch, useAppSelector } from "../../custom/reduxTypes";
import { addToCompareRedux } from "../../redux/compareSlice";
import { toast } from "react-hot-toast";
import useRemoveFromCompareList from "../../custom/useRemoveFromCompareList";

interface Props {
  id: string;
  title: string;
}
const CompareIcons = ({ id, title }: Props) => {
  const { compare } = useAppSelector((state) => state.compare);
  const { userId } = useContext(isAuthContext);
  const [atCompare, setAtCompare] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const check = compare.some((obj) => obj.productId === id);
    if (check) {
      setAtCompare(true);
    } else {
      setAtCompare(false);
    }
  }, [compare]);

  const [addToCompare] = useMutation(AddTo_Compare);

  const handleAddToCompare = async () => {
    try {
      const obj = { userId, productId: id, title };
      const { data } = await addToCompare({ variables: { input: obj } });
      if (data?.addToCompare?.msg)
        dispatch(addToCompareRedux({ _id: data?.addToCompare, ...obj }));
      toast.success(data?.addToCompare?.msg);
    } catch (err: unknown) {
      if ((err as Error).message === "Not Authorised!") {
        toast.error((err as Error).message);
      }
    }
  };

  const { handleRemoveFromCompare } = useRemoveFromCompareList({
    userId,
    productId: id,
  });
  return (
    <div>
      <AnimatePresence mode="wait">
        {atCompare ? (
          <motion.span
            key={"remove-from-compare"}
            variants={opacityVariant}
            transition={{ duration: 0.8 }}
            initial="start"
            animate="end"
            exit={"exit"}
            onClick={handleRemoveFromCompare}
          >
            <Title title="remove from compareList">
              <MdPlaylistRemove fontSize={16} />
            </Title>
          </motion.span>
        ) : (
          <motion.span
            key={"add-to-compare"}
            variants={opacityVariant}
            transition={{ duration: 0.8 }}
            initial="start"
            animate="end"
            exit={"exit"}
            onClick={handleAddToCompare}
          >
            <Title title="add to compareList">
              <MdPlaylistAdd fontSize={16} />
            </Title>
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CompareIcons;
