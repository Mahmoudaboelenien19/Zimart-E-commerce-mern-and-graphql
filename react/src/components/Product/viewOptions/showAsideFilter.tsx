import { themeContext } from "@/context/ThemContext";
import useParams from "@/custom/useParams";
import { opacityVariant } from "@/variants/globals";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext } from "react";

const ShowAsideBtn = () => {
  const { showAsideFilter, deleteParam, setParam } = useParams();
  const { theme } = useContext(themeContext);
  const hideFilter = () => {
    deleteParam("showAsideFilter");
  };
  const ShowFilter = () => {
    setParam("showAsideFilter", "true");
  };
  return (
    <AnimatePresence mode="wait">
      {showAsideFilter ? (
        <motion.span
          onClick={hideFilter}
          variants={opacityVariant}
          initial="start"
          exit="exit"
          animate="end"
          transition={{ duration: 0.4 }}
          key={"show-filter"}
          style={{ color: `var(--third-${theme})` }}
        >
          Hide Filters
        </motion.span>
      ) : (
        <motion.span
          key={"hide-filter"}
          onClick={ShowFilter}
          className="center"
          variants={opacityVariant}
          initial="start"
          exit="exit"
          animate="end"
          transition={{ duration: 0.4 }}
          style={{ color: `var(--third-${theme})` }}
        >
          Show Filters
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default ShowAsideBtn;
