// import ProductSelect from "./ProductSelect";
import SelectedProductData from "./SelectedProductData";
import { motion } from "framer-motion";
import { useAppSelector } from "@/custom/reduxTypes";
import { reverseVariant } from "@/lib/variants/globals";
import Select from "../widgets/shared/select/Select";

interface Props {
  product: string;
  setProduct: React.Dispatch<React.SetStateAction<string>>;
  order: string;
}
const SelectProduct = ({ product, setProduct, order }: Props) => {
  const { compare } = useAppSelector((state) => state.compare);
  const productId = compare.find((ob) => ob.title === product)?.productId;

  const compareArr = compare.map((product) => product.title);
  return (
    <motion.div
      className="compare-product center col gap w-100"
      variants={reverseVariant}
      initial="start"
      animate="end"
      custom={order}
    >
      <Select
        height={200}
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
