import Title from "@/components/widgets/Title";
import { opacityVariant } from "@/lib/variants/globals";
import { AnimatePresence, motion } from "framer-motion";
import { BiPlus } from "react-icons/bi";
import { FcMinus } from "react-icons/fc";

interface Props {
  head: string;
  bool: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}
const FilterHeader = ({ head, setter, bool }: Props) => {
  const handleShow = () => setter(true);
  const handleHide = () => setter(false);
  return (
    <h4 className={"filter-head   "}>
      {head}
      <AnimatePresence mode="wait">
        <motion.span
          variants={opacityVariant}
          initial="start"
          animate="end"
          exit="exit"
          key={"plus"}
          transition={{ duration: 0.4 }}
        >
          <AnimatePresence mode="wait">
            {bool ? (
              <Title title={"collapse"} key="collapse">
                <FcMinus onClick={handleHide} />
              </Title>
            ) : (
              <Title title={"expand"} key="expand">
                <BiPlus onClick={handleShow} />
              </Title>
            )}
          </AnimatePresence>
        </motion.span>
      </AnimatePresence>
    </h4>
  );
};

export default FilterHeader;
