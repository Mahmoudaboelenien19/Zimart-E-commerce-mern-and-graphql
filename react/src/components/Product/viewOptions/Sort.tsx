import { useState } from "react";
import { BsListTask } from "react-icons/bs";
import { HiOutlineViewGrid } from "react-icons/hi";
import { IoFilter } from "react-icons/io5";
import { AnimatePresence } from "framer-motion";
import SelectFilter from "./SelectFilter";
import Search from "./Search/Search";
import FadeElement from "@/components/widgets/animation/FadeElement";
import useIsMobile from "@/custom/useIsMobile";
import Title from "@/components/widgets/Title";
import ShowAsideButton from "./ShowAsideButton";
import useParams from "@/custom/useParams";
import clsx from "clsx";
const Sort = () => {
  const { isMobile, isMidScreen } = useIsMobile();
  const [showSearch, setShowSearch] = useState(false);
  const { setParam, getParam, deleteParam } = useParams();
  const view = getParam("view") || "grid";

  return (
    <div className={"sort-par  center between main-txt"}>
      <Search showSearch={showSearch} setShowSearch={setShowSearch} />
      <AnimatePresence mode="wait">
        {(!isMidScreen || (isMidScreen && !showSearch)) && (
          <FadeElement
            className=" center view-opt"
            key={"sort-mobile"}
            delay={0.1}
          >
            <div className="hide-filter-par txt center gap">
              <ShowAsideButton />
              <IoFilter color={`var(--third)`} />
            </div>
            <p className="view-par">
              {!isMobile && <span>Display</span>}

              {!isMobile && (
                <span className="center gap view-type">
                  <Title title="list view">
                    <BsListTask
                      onClick={() => {
                        if (view === "grid") {
                          setParam("view", "list");
                        }
                      }}
                      style={{
                        color:
                          view !== "list" ? `var(--third)` : "var(--green)",
                      }}
                      className={`view-icon  ${
                        view === "list" ? " icon-shadow" : ""
                      } `}
                    />
                  </Title>
                  <Title title="grid view">
                    <HiOutlineViewGrid
                      onClick={() => {
                        if (view) {
                          deleteParam("view");
                        }
                      }}
                      style={{
                        color:
                          view === "grid" ? "var(--green)" : `var(--third)`,
                      }}
                      className={clsx(
                        "view-icon  ",
                        view === "grid" && " icon-shadow"
                      )}
                    />
                  </Title>
                </span>
              )}
            </p>
            <SelectFilter />
          </FadeElement>
        )}
      </AnimatePresence>
      <div className="hr sort-hr" />
    </div>
  );
};

export default Sort;
