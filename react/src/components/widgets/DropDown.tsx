import { AnimatePresence } from "framer-motion";
import React from "react";
import { ChildrenInterFace } from "../../interfaces/general";
import useClickOutside from "../../custom/useClickOutside";
import FadeElement from "./FadeElement";
import MobileCloseDropDown from "./MobileCloseDropDown";

interface Props extends ChildrenInterFace {
  bool: boolean;
  head?: string;
  cls: string;
  title: string;
  isUser?: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropDown = ({ bool, head, cls, setter, title, children }: Props) => {
  const ref = useClickOutside<HTMLDivElement>(() => {
    setter(false);
  }, bool);

  return (
    <section ref={ref}>
      <AnimatePresence mode="wait">
        {bool && (
          <div className={`dropdown ${cls}`}>
            {cls !== "user-drop" && (
              <MobileCloseDropDown setter={setter} title={title} />
            )}
            {head && (
              <h3
                className="underline header header-sm underline-sm"
                style={{
                  width: "fit-content",
                  margin: "10px 0 10px 5px",
                }}
              >
                {head}
              </h3>
            )}

            {children}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DropDown;
