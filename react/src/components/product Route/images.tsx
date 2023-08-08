import React, { useContext, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { productContext } from "./Product";
import { SideBySideMagnifier } from "react-image-magnifiers";
import { opacityVariant } from "../../variants/globals";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import useIsMobile from "../../custom/useIsMobile";
interface Props {
  data: {
    images: {
      productPath: string;
      ProductName: string;
      _id: string;
    }[];
    bigImgInd: number;
    setBigImgInd: React.Dispatch<React.SetStateAction<number>>;
  };
}

type Tuple = [number | null, number];

const ProductImages = ({
  data: { setBigImgInd, bigImgInd, images },
}: Props) => {
  const { startHover, setStartHover } = useContext(productContext);

  const [tuple, setTuple] = useState<Tuple>([null, bigImgInd]);
  const [changeImage, setChangeImage] = useState(false);

  if (tuple[1] !== bigImgInd) {
    setTuple([tuple[1], bigImgInd]);
  }

  let direction = "";

  if (tuple[0] !== null) {
    direction = tuple[0] > tuple[1] ? "increase" : "decrease";
  }

  const parentVariant = {
    start: {},
    end: {},
  };

  const bigImageVariant = {
    end: (dir: string) => ({
      // x: 0,
      x: dir === "increase" ? [200, 0] : [-200, 0],

      opacity: 1,
      transition: { duration: 0.6, type: "tween", ease: "easeOut" },
    }),
    exit: (dir: string) => ({
      x: dir === "increase" ? -250 : 250,
      transition: { duration: 0.5 },
    }),
  };

  const bigImageParVariant = {
    start: { x: -200 },
    end: { x: 0, transition: { duration: 1 } },
  };
  const smallImageVariant = {
    end: (index: number) => ({
      y: [100, -10, 0],
      x: [40, -5, 0],
      opacity: [0.1, 0.5, 1],
      transition: { delay: 1.5 + 0.4 * index, duration: 0.3 },
    }),
  };

  const ref = useRef<HTMLDivElement | null>(null);
  const { isMobile } = useIsMobile();
  return (
    <motion.div
      ref={ref}
      className="images center "
      variants={parentVariant}
      initial="start"
      animate="end"
    >
      <motion.span
        style={{ overflow: startHover ? "" : "hidden" }}
        variants={bigImageParVariant}
        initial="start"
        animate="end"
      >
        {/* here  */}

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            className="big-img-par"
            key={images[bigImgInd].productPath}
            custom={direction}
            variants={bigImageVariant}
            // exit="exit"
            onAnimationStart={() => setChangeImage(true)}
            onAnimationComplete={() => setChangeImage(false)}
          >
            <>
              <SideBySideMagnifier
                imageSrc={images[bigImgInd].productPath}
                style={{
                  height: "fit-content",
                  width: !isMobile ? 250 : "70%",
                  objectFit: "contain",
                }}
                alwaysInPlace={isMobile}
                fillAvailableSpace
                fillGapTop={40}
                fillGapRight={ref?.current ? ref?.current?.offsetLeft - 10 : 0}
                overlayBoxOpacity={1}
                overlayOpacity={0.1}
                cursorStyle="crosshair"
                fillGapLeft={30}
                overlayBoxColor="yellow"
                className="zoom"
                onZoomStart={() => setStartHover(true)}
                onZoomEnd={() => setStartHover(false)}
              />
            </>
            <AnimatePresence>
              {!startHover && !changeImage && (
                <motion.div
                  variants={opacityVariant}
                  initial="start"
                  animate="end"
                  exit={"exit"}
                  transition={{ duration: 0.4 }}
                  className="hint"
                >
                  Hover to zoom
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </motion.span>
      <div className="small-img-par center">
        {images.map(({ productPath }, index) => {
          return (
            <motion.span
              custom={index}
              variants={smallImageVariant}
              className="small-img"
              key={index}
              onClick={() => setBigImgInd(index)}
            >
              <LazyLoadImage effect="blur" src={productPath} />
            </motion.span>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ProductImages;
