import { AnimatePresence } from "framer-motion";
import React, { useContext } from "react";
import { IoFilter } from "react-icons/io5";
import ApplyFilterButton from "./filter/ApplyFilterButton";
import clsx from "clsx";
import { themeContext } from "@/context/ThemContext";

interface Props {
  startFiltering: boolean;
}
const AsideFilterHead = ({ startFiltering }: Props) => {
  const { theme } = useContext(themeContext);
  return (
    <>
      <div className="aside-head center gap">
        <div className="filter-icon center ">
          <IoFilter className="icon" color="var(--third)" />
          <span className={clsx("filter-head", theme)}>filter</span>
        </div>

        <div className="collapse-par center">
          <AnimatePresence>
            {startFiltering && <ApplyFilterButton />}
          </AnimatePresence>
        </div>
      </div>
      <div className="hr"></div>
    </>
  );
};

export default AsideFilterHead;
