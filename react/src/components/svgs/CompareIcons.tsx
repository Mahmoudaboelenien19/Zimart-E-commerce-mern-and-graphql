import { AnimatePresence } from "framer-motion";
import Title from "../widgets/Title";
import { MdPlaylistAdd, MdPlaylistRemove } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/custom/helpers/reduxTypes";
import FadeElement from "../widgets/animation/FadeElement";
import useAddToCollection from "@/custom/shopping/useAddToCollection";
import useIsAtCollection from "@/custom/shopping/useIsAtCollection";
import { addToCompareRedux } from "@/redux/compareSlice";
import useRemoveFromCompare from "@/custom/shopping/useRemoveFromCompare";
const CompareIcons = ({ id }: { id: string }) => {
  const { compare } = useAppSelector((state) => state.compare);
  const { atCollection } = useIsAtCollection(compare, id);
  const { handleAddToCollection, loading } = useAddToCollection(id, "compare");
  const dispatch = useAppDispatch();
  const addToCompare = async () => {
    if (!loading) {
      const st = await handleAddToCollection();
      if (st === 200) {
        dispatch(addToCompareRedux({ id }));
      }
    }
  };
  const { removeFromCompare } = useRemoveFromCompare(id);

  return (
    <AnimatePresence mode="wait">
      {atCollection ? (
        <Title title="remove from compareList" key={"remove-from-compare"}>
          <FadeElement onClick={removeFromCompare} className="center">
            <MdPlaylistRemove size={16} />
          </FadeElement>
        </Title>
      ) : (
        <Title title="add to compareList" key={"add-to-compare"}>
          <FadeElement onClick={addToCompare} className="center">
            <MdPlaylistAdd size={16} />
          </FadeElement>
        </Title>
      )}
    </AnimatePresence>
  );
};

export default CompareIcons;
