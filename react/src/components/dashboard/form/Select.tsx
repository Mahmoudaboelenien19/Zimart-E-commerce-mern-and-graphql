import React, { useState, useEffect } from "react";
import { BiDownArrow } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import useClickOutside from "../../../custom/useClickOutside";
import { opacityVariant } from "../../../variants/globals";
import InpErr from "../../widgets/forms/InpErr";

interface Props {
  val: string;
  ar: string[];
  noVal: string;
  isSubmited: boolean;
  setter: React.Dispatch<React.SetStateAction<string>>;
}

const SelectCOuntry = ({ ar, val, setter, noVal, isSubmited }: Props) => {
  const [showDropSelect, setShowSelectDrop] = useState(false);
  const selectRef = useClickOutside<HTMLDivElement>(() => {
    setShowSelectDrop(false);
  }, showDropSelect);

  const parent = {
    start: {},
    end: { transition: { staggerChildren: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0 } },
  };

  const toggleShowSelectDrop = () => {
    setShowSelectDrop(!showDropSelect);
  };

  const [selectErr, setSelectErr] = useState("");
  useEffect(() => {
    if (!val && isSubmited) {
      setSelectErr("Please select a value");
    } else {
      setSelectErr("");
    }
  }, [val, isSubmited]);
  return (
    <div
      className="select-country-par inp-parent relative center start "
      onClick={toggleShowSelectDrop}
      ref={selectRef}
    >
      <AnimatePresence mode="wait">
        <motion.div
          style={{ overflow: "hidden" }}
          className="select-country center gap"
          variants={parent}
          initial="start"
          animate="end"
          exit="exit"
        >
          <motion.span style={{ fontSize: 9 }} variants={opacityVariant}>
            {val ? val : <span style={{ color: "var(--wheat)" }}>{noVal}</span>}
          </motion.span>
        </motion.div>
      </AnimatePresence>
      <BiDownArrow className="icon select-icon arrow" />
      <AnimatePresence>
        {showDropSelect && (
          <motion.div className={`select-dropdown gap drop-country `}>
            {ar.map((val: string) => {
              return (
                <motion.div
                  variants={opacityVariant}
                  initial="start"
                  animate="end"
                  exit="exit"
                  key={val}
                  className="select-country center gap select-opt"
                  onClick={() => {
                    setter(val);
                  }}
                >
                  <span className="select-text"> {val}</span>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      {selectErr && <InpErr err={selectErr} />}
    </div>
  );
};

export default SelectCOuntry;
