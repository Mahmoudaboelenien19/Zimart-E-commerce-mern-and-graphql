import { AnimatePresence, motion } from "framer-motion";
import MobileCloseDropDown from "./MobileCloseDropDown";
import useClickOutside from "@/custom/useClickOutside";
import { ChildrenInterFace } from "@/interfaces/general";
import clsx from "clsx";
import { dropdownVariant } from "@/lib/variants/globals";
import useIsMobile from "@/custom/useIsMobile";
interface Props extends ChildrenInterFace {
  bool: boolean;
  className?: string;
  isUser?: boolean;
  addCloseIcon?: boolean;
  height?: number;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropDown = ({
  bool,
  className,
  setter,
  height,
  addCloseIcon,
  children,
}: Props) => {
  const ref = useClickOutside<HTMLDivElement>(() => {
    setter(false);
  }, bool);
  const { isMobile } = useIsMobile();
  const h: string | number = !height
    ? "auto"
    : isMobile && addCloseIcon
    ? "100vh"
    : height;
  return (
    <section ref={ref}>
      <AnimatePresence mode="wait">
        {bool && (
          <motion.div
            className={clsx(
              "dropdown",
              className,
              isMobile && addCloseIcon && "mobile"
            )}
            variants={dropdownVariant}
            initial="start"
            animate="end"
            exit={"exit"}
            custom={h}
          >
            {addCloseIcon && isMobile && (
              <MobileCloseDropDown setter={setter} />
            )}

            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DropDown;
