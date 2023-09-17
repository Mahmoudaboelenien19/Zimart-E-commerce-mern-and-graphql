import React, { useContext, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

import { AnimatePresence, motion } from "framer-motion";
import Title from "@/components/widgets/Title";
import { themeContext } from "@/context/ThemContext";
import useClickOutside from "@/custom/useClickOutside";
import useUpdateOrder from "@/custom/useUpdateOrder";
import useUpdateUserRole from "@/custom/useUpdateUserRole";
import { selectDropDownVariants, opacityVariant } from "@/variants/globals";

interface Props {
  state: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  _id: string;
  arr: string[];
  type?: string;
}

const DashDropDown = ({ type, state, setter, _id, arr }: Props) => {
  const { theme } = useContext(themeContext);
  const [isSClicked, setIsCLicked] = useState(false);

  const handleToggle = () => setIsCLicked(!isSClicked);
  const { handleUpdateOrder } = useUpdateOrder();
  const { handleUpdateUserRole } = useUpdateUserRole();
  const ref = useClickOutside<HTMLDivElement>(
    () => setIsCLicked(false),
    isSClicked
  );
  return (
    <div className="relative">
      <Title title={isSClicked ? "update order state" : ""}>
        <HiDotsVertical
          className="icon"
          onClick={handleToggle}
          color={theme === "light" ? "grey" : "var(--white)"}
        />
      </Title>
      <AnimatePresence>
        {isSClicked && (
          <motion.div
            className="order-drop box-shadow"
            variants={selectDropDownVariants}
            initial="start"
            animate="end"
            exit="exit"
            ref={ref}
          >
            <>
              {arr.map((st, i) => {
                return (
                  <motion.div
                    style={{
                      color: st === state ? `var(--${st})` : "var(--wheat)",
                      cursor: "pointer",
                    }}
                    variants={opacityVariant}
                    onClick={() => {
                      setIsCLicked(false);
                      if (state != st) {
                        if (type === "user") {
                          handleUpdateUserRole(_id, st, setter);
                        } else {
                          handleUpdateOrder(_id, st);
                        }
                      }
                    }}
                    key={i}
                    className="order-link select-opt"
                  >
                    {st}
                  </motion.div>
                );
              })}
            </>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashDropDown;
