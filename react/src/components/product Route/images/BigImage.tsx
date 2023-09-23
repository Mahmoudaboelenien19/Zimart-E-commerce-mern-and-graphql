import { motion, AnimatePresence, Variants } from "framer-motion";
import React, { useContext } from "react";
import { productContext } from "../Product";
import useCarousel from "@/custom/useCarousel";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useModifyUrl from "@/custom/useModifyUrl";

const BigImage = () => {
  const { images = [], bigImgInd, title } = useContext(productContext);
  const [variant, dir] = useCarousel(bigImgInd, images.length);
  const { getlink } = useModifyUrl();
  const url = images[bigImgInd]?.productPath;
  return (
    <AnimatePresence mode="wait" custom={dir}>
      <motion.div
        className="big-img-par center "
        key={url}
        custom={{ dir, width: 100 }}
        variants={variant as Variants}
        transition={{ delay: 0.6 }}
      >
        <LazyLoadImage
          effect="blur"
          alt={title}
          src={getlink(url, 600)}
          wrapperClassName="w-80 h-100  "
          className="w-100 h-100 "
          // srcSet={`${getlink(url, 800)} 400w,${getlink(url, 400)} 1200w
          // `}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default BigImage;
