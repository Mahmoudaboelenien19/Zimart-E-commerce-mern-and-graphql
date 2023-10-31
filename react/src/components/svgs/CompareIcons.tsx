import { useContext, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Title from "../widgets/Title";
import { MdPlaylistAdd, MdPlaylistRemove } from "react-icons/md";
import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";
import { isAuthContext } from "@/context/isAuth";
import { useAppSelector, useAppDispatch } from "@/custom/reduxTypes";
import useRemoveFromCompareList from "@/custom/useRemoveFromCompareList";
import { AddTo_Compare } from "@/graphql/mutations/user";
import { addToCompareRedux } from "@/redux/compareSlice";
import FadeElement from "../widgets/animation/FadeElement";

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
    const check = compare.some((obj) => obj?.productId === id);
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
        toast.error("login please !");
      }
    }
  };

  const { handleRemoveFromCompare } = useRemoveFromCompareList({
    userId,
    productId: id,
  });
  return (
    <AnimatePresence mode="wait">
      {atCompare ? (
        <Title title="remove from compareList" key={"remove-from-compare"}>
          <FadeElement onClick={handleRemoveFromCompare} className="center">
            <MdPlaylistRemove size={16} />
          </FadeElement>
        </Title>
      ) : (
        <Title title="add to compareList" key={"add-to-compare"}>
          <FadeElement onClick={handleAddToCompare} className="center">
            <MdPlaylistAdd size={16} />
          </FadeElement>
        </Title>
      )}
    </AnimatePresence>
  );
};

export default CompareIcons;
