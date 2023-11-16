import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MobileCloseDropDown from "./MobileCloseDropDown";
import useClickOutside from "@/custom/helpers/useClickOutside";
import clsx from "clsx";
import { dropdownVariant, opacityVariant } from "@/lib/variants/globals";
import useIsMobile from "@/custom/helpers/useIsMobile";
type Props = {
  bool: boolean;
  className?: string;
  isUser?: boolean;
  addCloseIcon?: boolean;
  variant?: string;
  children: ReactNode;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropDown = ({
  variant,
  bool,
  className,
  setter,
  addCloseIcon,
  children,
}: Props) => {
  const ref = useClickOutside<HTMLDivElement>(() => {
    setter(false);
  }, bool);
  const { isMobile } = useIsMobile();

  return (
    <section ref={ref}>
      <AnimatePresence mode="wait">
        {bool && (
          <motion.div
            className={clsx(
              "dropdown border",
              className,
              isMobile && addCloseIcon && "mobile"
            )}
            variants={variant === "opacity" ? opacityVariant : dropdownVariant}
            initial="start"
            animate="end"
            exit={"exit"}
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
