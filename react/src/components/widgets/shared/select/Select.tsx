import { useState } from "react";
import { BiDownArrow } from "react-icons/bi";
import { AnimatePresence } from "framer-motion";
import useClickOutside from "@/custom/helpers/useClickOutside";
import FadeElement from "@/components/widgets/animation/FadeElement";
import clsx from "clsx";
import DropDown from "../../dropdowns/DropDown";
interface Props {
  val: string;
  ar: string[];
  noVal?: string;
  setter?: React.Dispatch<React.SetStateAction<string>>;
  fn?: (val: string) => void;
  className?: string;
}

const Select = ({ className, ar, fn, val, noVal, setter }: Props) => {
  const [showDropSelect, setShowSelectDrop] = useState(false);
  const selectRef = useClickOutside<HTMLDivElement>(() => {
    setShowSelectDrop(false);
  }, showDropSelect);

  const toggleShowSelectDrop = () => {
    setShowSelectDrop(!showDropSelect);
  };
  return (
    <div
      className={clsx("select w-100", className)}
      onClick={toggleShowSelectDrop}
      ref={selectRef}
    >
      <AnimatePresence mode="wait">
        <FadeElement key={val || noVal} duration={0.15} className="w-100">
          <div className="select-value "> {val || noVal}</div>
        </FadeElement>
      </AnimatePresence>
      <BiDownArrow color="var(--green-light)" />
      <DropDown
        bool={showDropSelect}
        setter={setShowSelectDrop}
        className={"w-100"}
      >
        {ar?.map((val: string) => {
          return (
            <div
              key={val}
              className="result "
              onClick={() => {
                if (setter) {
                  setter(val);
                }
                if (fn) {
                  fn(val);
                  setShowSelectDrop(false);
                }
              }}
            >
              {val}
            </div>
          );
        })}
      </DropDown>
    </div>
  );
};

export default Select;
