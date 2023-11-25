import { MotionValue, motion } from "framer-motion";

type Props = {
  ar: string[];
  y: MotionValue;
};
const Column = ({ ar, y }: Props) => {
  return (
    <motion.div className="col" style={{ y }}>
      {ar.map((img, i) => {
        return (
          <picture key={i}>
            <img src={img} />
          </picture>
        );
      })}
    </motion.div>
  );
};

export default Column;
