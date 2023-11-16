import SelectedProductData from "./SelectedProductData";
import { motion } from "framer-motion";
import { reverseVariant } from "@/lib/variants/globals";
import Select from "../widgets/shared/select/Select";
import { useAppSelector } from "@/custom/helpers/reduxTypes";

interface Props {
  product: string;
  setProduct: React.Dispatch<React.SetStateAction<string>>;
  order: string;
}
const SelectProduct = ({ product, setProduct, order }: Props) => {
  const { compare } = useAppSelector((st) => st.compare);

  const productId = compare?.find((ob) => ob?.product?.title === product)?.id;

  const compareArr = compare?.map((product) => product?.product?.title || "s");
  return (
    <motion.div
      className="compare-product center col gap w-100"
      variants={reverseVariant}
      initial="start"
      animate="end"
      custom={order}
    >
      <Select
        ar={compareArr}
        val={product || `-- select ${order} product --`}
        className=" select-compare"
        setter={setProduct}
      />

      <SelectedProductData setProduct={setProduct} id={productId || ""} />
    </motion.div>
  );
};
export default SelectProduct;
