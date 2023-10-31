import { AnimatePresence } from "framer-motion";
import { IoFilter } from "react-icons/io5";
import ApplyFilterButton from "./filter/ApplyFilterButton";

interface Props {
  startFiltering: boolean;
}
const AsideFilterHead = ({ startFiltering }: Props) => {
  return (
    <>
      <div className="filter-head aside-head">
        <div className="filter-icon center ">
          <IoFilter className="icon" color="var(--third)" />
          <span>filters</span>
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
