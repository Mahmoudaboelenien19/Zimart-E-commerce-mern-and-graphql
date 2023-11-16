import { AnimatePresence, motion } from "framer-motion";
import useHideScroll from "@/custom/helpers/useHideScroll";
import "./popup.scss";
import FadeElement from "../../animation/FadeElement";
import { parentVariant } from "@/lib/variants/globals";
import MobileCloseDropDown from "../../dropdowns/MobileCloseDropDown";
import { ReactNode } from "react";
import clsx from "clsx";

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
type Props = {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  bool: boolean;
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
};
const MainPop = ({
  bool,
  setter,
  children,
  className = "",
  wrapperClassName,
}: Props) => {
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
            <FadeElement
              className={clsx("w-100", wrapperClassName)}
              delay={0.5}
            >
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
