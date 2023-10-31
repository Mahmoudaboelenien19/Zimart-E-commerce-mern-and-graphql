import { AnimatePresence, motion } from "framer-motion";
import { ChildrenInterFace } from "@/interfaces/general";
import useHideScroll from "@/custom/useHideScroll";
import "./popup.scss";
import FadeElement from "../../animation/FadeElement";
import { parentVariant } from "@/lib/variants/globals";
import MobileCloseDropDown from "../../dropdowns/MobileCloseDropDown";

const skewVariant = {
  start: { transform: "rotate(0)" },
  end: {
    transform: "rotate(-3deg)",

    transition: { delay: 0.1, duration: 0.3, ease: "easeInOut" },
  },
  exit: {
    transform: "rotate(0)",

    transition: { duration: 0.3, ease: "easeInOut" },
  },
};
interface Props extends ChildrenInterFace {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  bool: boolean;
  className?: string;
}
const MainPop = ({ bool, setter, children, className = "" }: Props) => {
  useHideScroll(bool);
  const handlehidePop = () => {
    setter(false);
  };
  return (
    <AnimatePresence mode="wait">
      {bool && (
        <motion.div
          className="overley center"
          onClick={handlehidePop}
          key="overley"
          variants={parentVariant}
          animate={"end"}
          initial="start"
          exit="exit"
        >
          <div
            key={"overley-pop"}
            onClick={(e) => e.stopPropagation()}
            className={`popup  center col gap   ${className}`}
          >
            <FadeElement className="w-100" delay={0.5}>
              <MobileCloseDropDown bool={bool} setter={setter} />
              {children}
            </FadeElement>
            <motion.div className="skewed" variants={skewVariant} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MainPop;
