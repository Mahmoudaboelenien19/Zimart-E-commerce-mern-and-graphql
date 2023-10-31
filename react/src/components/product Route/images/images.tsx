import { motion } from "framer-motion";

import "react-lazy-load-image-component/src/effects/blur.css";
import BigImage from "./BigImage";
import SmallImages from "./SmallImages";

const ProductImages = () => {
  const parentVariant = {
    start: {},
    end: {},
  };

  return (
    <motion.div
      className="images center "
      variants={parentVariant}
      initial="start"
      animate="end"
    >
      <BigImage />

      <SmallImages />
    </motion.div>
  );
};

export default ProductImages;
