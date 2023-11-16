import Star from "../../Product/Products/Aside/Star";
import { motion } from "framer-motion";

interface Props {
  setRateIndex: React.Dispatch<React.SetStateAction<number>>;
  rateIndex: number;
}

const AddRate = ({ setRateIndex, rateIndex }: Props) => {
  console.log({ rateIndex });
  return (
    <div className="gap center add-rate-pop">
      {[1, 2, 3, 4, 5].map((st, i) => {
        return (
          <motion.div
            key={i}
            onHoverStart={() => setRateIndex(st)}
            animate={{
              y:
                rateIndex === st
                  ? [5, 10, 5]
                  : rateIndex === st + 1 || rateIndex === st - 1
                  ? 2.5
                  : 0,
              scale:
                rateIndex === st
                  ? [1, 2, 1.8]
                  : rateIndex === st + 1 || rateIndex === st - 1
                  ? 1.4
                  : 1,
              margin:
                rateIndex === st
                  ? "0 5px"
                  : rateIndex === st + 1 || rateIndex === st - 1
                  ? "0 4px"
                  : 0,
            }}
            transition={{ duration: 0.2 }}
            className="add-rate"
          >
            <Star bool={rateIndex >= st} />
          </motion.div>
        );
      })}
    </div>
  );
};

export default AddRate;
