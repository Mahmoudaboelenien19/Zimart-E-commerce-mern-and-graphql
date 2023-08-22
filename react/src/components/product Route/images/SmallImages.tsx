import { motion } from "framer-motion";
import React, { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { productContext } from "../Product";

const SmallImages = () => {
  const { images, setBigImgInd, bigImgInd } = useContext(productContext);

  const smallImageVariant = {
    end: (index: number) => ({
      y: [100, -10, 0],
      x: [40, -5, 0],
      opacity: [0.1, 0.5, 1],
      transition: { delay: 1.5 + 0.4 * index, duration: 0.3 },
    }),
  };
  return (
    <div className="small-img-par center">
      {images?.map(({ productPath }, index) => {
        return (
          <motion.span
            custom={index}
            variants={smallImageVariant}
            className="small-img"
            key={index}
            onClick={() => setBigImgInd(index)}
          >
            <LazyLoadImage
              effect="blur"
              src={productPath}
              style={{ opacity: bigImgInd === index ? 1 : 0.2 }}
            />
          </motion.span>
        );
      })}
    </div>
  );
};

export default SmallImages;
