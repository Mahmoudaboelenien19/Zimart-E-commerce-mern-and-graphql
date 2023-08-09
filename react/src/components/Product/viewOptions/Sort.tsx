import React, { useContext } from "react";
import { BsListTask } from "react-icons/bs";
import { HiOutlineViewGrid } from "react-icons/hi";
import { IoFilter } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariant } from "../../../variants/globals";
import SelectFilter from "./SelectFilter";
import Search from "./Search";
import { viewContext } from "../../../context/gridView";
import { productListContext } from "../../../context/FilterData";
import Title from "../../widgets/Title";
import useIsMobile from "../../../custom/useIsMobile";
import FadeElement from "../../widgets/FadeElement";

const Sort = () => {
  const { setShowFilter, showFilter, startTransition } =
    useContext(productListContext);

  const { setGridView, gridView, showSearch } = useContext(viewContext);
  const ShowFilter = () => setShowFilter(true);
  const hideFilter = () => setShowFilter(false);
  const { isMobile } = useIsMobile();
  return (
    <div className="sort-par  center between">
      <Search />
      <AnimatePresence mode="wait">
        {(!isMobile || (isMobile && !showSearch)) && (
          <FadeElement cls=" center view-opt" key={"sort-mobile"} delay={0.1}>
            <div className="hide-filter-par">
              <button className="center">
                <AnimatePresence mode="wait">
                  {showFilter ? (
                    <motion.span
                      onClick={hideFilter}
                      variants={opacityVariant}
                      initial="start"
                      exit="exit"
                      animate="end"
                      transition={{ duration: 0.4 }}
                      key={"show-filter"}
                      style={{ color: "var(--third)" }}
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
                      style={{ color: "var(--third)" }}
                    >
                      Show Filters
                    </motion.span>
                  )}
                </AnimatePresence>
                <IoFilter color="var(--secondary)" />
              </button>
            </div>
            <div className="view-par  ">
              {!isMobile && (
                <span className="display" style={{ color: "var(--third)" }}>
                  Display
                </span>
              )}

              {!isMobile && (
                <span className="center gap view-type">
                  <Title title="list view" cls="" cancelTap={false}>
                    <BsListTask
                      onClick={() => {
                        if (gridView) {
                          startTransition(() => setGridView(false));
                        }
                      }}
                      style={{
                        color: gridView ? "var(--third)" : "var(--green)",
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
                          startTransition(() => setGridView(true));
                        }
                      }}
                      style={{
                        color: gridView ? "var(--green)" : "var(--third)",
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
