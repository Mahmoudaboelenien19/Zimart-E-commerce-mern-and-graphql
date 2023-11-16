import { motion } from "framer-motion";
import Checkbox from "@/custom SVGs/checkbox";
import { opacityVariant } from "@/lib/variants/globals";
import useParams from "@/custom/helpers/useParams";
import Star from "./Star";
import FIlter from "./filter/FIlter";

const Rating = () => {
  const { deleteParam, setParam, getParam } = useParams();
  const rate = getParam("rate");
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const group: React.ReactNode[] = [];

    for (let g = 5; g >= 1; g--) {
      group.push(
        <Star
          key={`${Date.now()}-${Math.random().toString(16)}`}
          bool={g >= i ? true : false}
        />
      );
    }

    stars.push(
      <motion.div
        variants={opacityVariant}
        className="center rate-filter-par"
        key={`group-${i}`}
        onClick={() => {
          if (!rate || rate !== String(6 - i)) {
            setParam("rate", `${String(6 - i) === rate ? "" : String(6 - i)}`);
          }
          if (String(6 - i) === rate) {
            deleteParam("rate");
          }
        }}
      >
        <Checkbox isChecked={String(6 - i) === rate} filter={String(6 - i)} />
        <span className="rate-filter">{group}</span>
      </motion.div>
    );
  }

  return <FIlter head="rating">{stars}</FIlter>;
};

export default Rating;
