import MainBtn from "@/components/widgets/buttons/MainBtn";
import { useContext } from "react";
import { MdFilterListAlt } from "react-icons/md";
import { asideContext } from "../../Products";
import useParams from "@/custom/useParams";

const ApplyFilterButton = () => {
  const { loading, handleClickFIlter } = useContext(asideContext);
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
