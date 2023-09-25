import React, { useContext, useEffect, useState } from "react";
import { BsListTask } from "react-icons/bs";
import { HiOutlineViewGrid } from "react-icons/hi";
import { IoFilter } from "react-icons/io5";
import { AnimatePresence } from "framer-motion";
import SelectFilter from "./SelectFilter";
import Search from "./Search/Search";
import FadeElement from "@/components/widgets/animation/FadeElement";
import { viewContext } from "@/context/gridView";
import useIsMobile from "@/custom/useIsMobile";
import Title from "@/components/widgets/Title";
import ShowAsideBtn from "./showAsideFilter";
import { themeContext } from "@/context/ThemContext";
import clsx from "clsx";
const Sort = () => {
  const { setGridView, gridView } = useContext(viewContext);
  const { isMobile, isMidScreen } = useIsMobile();
  const [showSearch, setShowSearch] = useState(false);

  const { theme } = useContext(themeContext);
  return (
    <div className={clsx("sort-par  center between main-txt", theme)}>
      <Search showSearch={showSearch} setShowSearch={setShowSearch} />
      <AnimatePresence mode="wait">
        {(!isMidScreen || (isMidScreen && !showSearch)) && (
          <FadeElement cls=" center view-opt" key={"sort-mobile"} delay={0.1}>
            <div className="hide-filter-par">
              <button className="center">
                <ShowAsideBtn />
                <IoFilter color={`var(--third-${theme})`} />
              </button>
            </div>
            <div className="view-par  ">
              {!isMobile && <span className="display">Display</span>}

              {!isMobile && (
                <span className="center gap view-type">
                  <Title title="list view" cls="" cancelTap={false}>
                    <BsListTask
                      onClick={() => {
                        if (gridView) {
                          setGridView(false);
                        }
                      }}
                      style={{
                        color: gridView
                          ? `var(--third-${theme})`
                          : "var(--green)",
                      }}
                      className={`view-icon  ${
                        gridView ? " icon-shadow" : ""
                      } `}
                    />
                  </Title>
                  <Title title="grid view" cls="" cancelTap={false}>
                    <HiOutlineViewGrid
                      onClick={() => {
                        if (!gridView) {
                          setGridView(true);
                        }
                      }}
                      style={{
                        color: gridView
                          ? "var(--green)"
                          : `var(--third-${theme}`,
                      }}
                      className={`view-icon  ${
                        !gridView ? " icon-shadow" : ""
                      } `}
                    />
                  </Title>
                </span>
              )}
            </div>
            <SelectFilter />
          </FadeElement>
        )}
      </AnimatePresence>
      <div className="hr sort-hr"></div>
    </div>
  );
};

export default Sort;
