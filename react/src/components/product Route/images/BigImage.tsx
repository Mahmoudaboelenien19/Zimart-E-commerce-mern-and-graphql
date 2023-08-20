import { motion, AnimatePresence, Variants } from "framer-motion";
import React, { useContext, useState } from "react";
import { SideBySideMagnifier } from "react-image-magnifiers";
import Hint from "./Hint";
import { productContext } from "../Product";
import useCarousel from "../../../custom/useCarousel";
import useModifyUrl from "../../../custom/useModifyUrl";
import "react-lazy-load-image-component/src/effects/blur.css";
import { LazyLoadImage } from "react-lazy-load-image-component";

const BigImage = () => {
  const { images = [], bigImgInd, category } = useContext(productContext);

  const [variant, dir] = useCarousel(bigImgInd, images.length);
  const modifiedUrl = useModifyUrl(images[bigImgInd]?.productPath, category);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <AnimatePresence mode="wait" custom={dir} initial={false}>
      <motion.div
        className="big-img-par"
        key={modifiedUrl}
        custom={{ dir, width: 100 }}
        variants={variant as Variants}
        onAnimationStart={() => {
          setIsLoaded(false);
        }}
      >
        <AnimatePresence>
          {isLoaded && <Hint key="hover_hint" />}
        </AnimatePresence>
        {!isLoaded ? (
          <LazyLoadImage
            src={modifiedUrl}
            alt={`product`}
            effect="blur"
            afterLoad={() => setIsLoaded(true)}
            className="product-image-lazy"
          />
        ) : (
          <SideBySideMagnifier
            imageSrc={modifiedUrl}
            style={{
              objectFit: "contain",
              height: 200,
              width: 250,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
            overlayBoxOpacity={1}
            overlayOpacity={0.1}
            cursorStyle="crosshair"
            overlayBoxColor="yellow"
            className="zoom"
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default BigImage;
