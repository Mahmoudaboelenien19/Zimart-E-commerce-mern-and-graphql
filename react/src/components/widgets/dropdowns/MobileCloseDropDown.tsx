import { AnimatePresence, motion } from "framer-motion";
import { AiFillCloseCircle } from "react-icons/ai";
import Title from "../Title";
import useParams from "@/custom/useParams";
import { opacityVariant } from "@/lib/variants/globals";
import useIsMobile from "@/custom/useIsMobile";
interface Props {
  target?: string;
  bool?: boolean;
  setter?: React.Dispatch<React.SetStateAction<boolean>>;
  fn?: () => void;
}
const MobileCloseDropDown = ({ setter, target, bool, fn }: Props) => {
  const { isMobile } = useIsMobile();
  const { deleteParam } = useParams();
  const closeTarget = () => {
    if (fn) {
      fn();
    }
    if (setter) {
      setter(false);
    } else {
      if (target) {
        deleteParam(target);
      }
    }
  };
  return (
    <AnimatePresence>
      {(isMobile || bool) && (
        <motion.span
          key={"hide-dash"}
          variants={opacityVariant}
          transition={{ duration: 0.4 }}
          className="close-pop"
          onClick={closeTarget}
        >
          <Title title={"close"}>
            <AiFillCloseCircle className="icon red" />
          </Title>
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default MobileCloseDropDown;
