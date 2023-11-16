import { motion } from "framer-motion";
import FIlter from "./FIlter";
import Checkbox from "@/custom SVGs/checkbox";
import { opacityVariant } from "@/lib/variants/globals";
import useParams from "@/custom/helpers/useParams";

interface Props {
  filter: string;
  head: string;
  ar: string[];
}
const FilterSection = ({ filter, ar, head }: Props) => {
  const { getParam, deleteParam, setParam } = useParams();
  const SPfilter = getParam(filter);

  return (
    <FIlter head={head}>
      {ar.map((category, i) => {
        return (
          <motion.span
            className={"center category"}
            style={{ width: "fit-content" }}
            key={i}
            variants={opacityVariant}
            onClick={() => {
              setParam(filter, `${category === SPfilter ? "" : category}`);
              if (category === SPfilter) {
                deleteParam(filter);
              }
            }}
          >
            <Checkbox filter={category} isChecked={SPfilter === category} />
            {category}
          </motion.span>
        );
      })}
    </FIlter>
  );
};

export default FilterSection;
