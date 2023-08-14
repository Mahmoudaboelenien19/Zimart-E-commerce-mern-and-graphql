import { motion, AnimatePresence, Variants } from "framer-motion";
import React, { useContext, useState } from "react";
import { SideBySideMagnifier } from "react-image-magnifiers";
import Hint from "./Hint";
import { productContext } from "../Product";
import useIsMobile from "../../../custom/useIsMobile";
import useCarousel from "../../../custom/useCarousel";

const BigImage = () => {
  const { images = [], bigImgInd } = useContext(productContext);

  const [changeImage, setChangeImage] = useState(false);
  const { isMobile } = useIsMobile();

  const [variant, dir] = useCarousel(bigImgInd, images.length);
  return (
    <AnimatePresence mode="wait" custom={dir} initial={false}>
      <motion.div
        className="big-img-par"
        key={images[bigImgInd]?.productPath}
        custom={{ dir, width: 100 }}
        variants={variant as Variants}
        onAnimationStart={() => setChangeImage(true)}
        onAnimationComplete={() => setChangeImage(false)}
      >
        <>
          <SideBySideMagnifier
            imageSrc={images[bigImgInd]?.productPath}
            style={{
              objectFit: "contain",
              width: !isMobile ? 240 : "60%",
              height: 300,
              display: "flex",
              alignItems: "flex-end",
            }}
            overlayBoxOpacity={1}
            overlayOpacity={0.1}
            cursorStyle="crosshair"
            overlayBoxColor="yellow"
            className="zoom"
          />
        </>
        <AnimatePresence>
          {!changeImage && <Hint key="hover_hint" />}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default BigImage;
