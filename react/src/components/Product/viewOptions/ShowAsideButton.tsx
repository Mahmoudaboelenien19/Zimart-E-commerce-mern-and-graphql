import FadeElement from "@/components/widgets/animation/FadeElement";
import useParams from "@/custom/helpers/useParams";
import { AnimatePresence } from "framer-motion";

const ShowAsideButton = () => {
  const { showAsideFilter, deleteParam, setParam } = useParams();

  const hideFilter = () => {
    deleteParam("showAsideFilter");
  };
  const ShowFilter = () => {
    setParam("showAsideFilter", "true");
  };
  return (
    <AnimatePresence mode="wait">
      {showAsideFilter ? (
        <FadeElement
          className="center  txt gap no-wrap control-aside"
          onClick={hideFilter}
          key={"show-filter"}
        >
          Hide Filters
        </FadeElement>
      ) : (
        <FadeElement
          key={"hide-filter"}
          onClick={ShowFilter}
          className="center txt no-wrap control-aside"
        >
          Show Filters
        </FadeElement>
      )}
    </AnimatePresence>
  );
};

export default ShowAsideButton;
