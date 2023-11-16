import MainBtn from "@/components/widgets/buttons/MainBtn";
import { MdFilterListAlt } from "react-icons/md";
import useParams from "@/custom/helpers/useParams";

import useApplyFilters from "@/custom/product/useApplyFilters";

const ApplyFilterButton = () => {
  const { loading, handleClickFIlter } = useApplyFilters();
  const { getParam } = useParams();
  const catFilter = getParam("catFilter");
  return (
    <MainBtn
      key={"apply-btn"}
      className={"btn shadow main center  gap"}
      btn={"apply"}
      onClick={handleClickFIlter}
      Icon={MdFilterListAlt}
      disabled={loading && !catFilter}
    />
  );
};

export default ApplyFilterButton;
