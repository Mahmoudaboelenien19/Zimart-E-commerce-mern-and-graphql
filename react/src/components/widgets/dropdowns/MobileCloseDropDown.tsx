import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { opacityVariant } from "../../../variants/globals";
import useIsMobile from "../../../custom/useIsMobile";
import Title from "../Title";
interface Props {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  bool?: boolean;
}
const MobileCloseDropDown = ({ setter, title, bool }: Props) => {
  const { isMobile } = useIsMobile();

  return (
    <AnimatePresence>
      {(isMobile || bool) && (
        <motion.span
          key={"hide-dash"}
          variants={opacityVariant}
          transition={{ duration: 0.4 }}
          className="close-pop"
          onClick={() => setter(false)}
        >
          <Title title={title}>
            <AiFillCloseCircle className="icon red" />
          </Title>
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default MobileCloseDropDown;
