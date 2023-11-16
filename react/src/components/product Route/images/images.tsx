import { AnimatePresence, Variants, motion } from "framer-motion";
import MainImage from "@/components/widgets/shared/Image";
import useCarousel from "@/custom/helpers/useCarousel";
import { useState } from "react";
import { type Images } from "@/types/user";
import useModifyUrl from "@/custom/helpers/useModifyUrl";
import { unstable_useViewTransitionState, useLocation } from "react-router-dom";

const smallImageVariant = {
  end: (index: number) => ({
    y: [100, -10, 0],
    x: [40, -5, 0],
    scale: [0.4, 1],
    opacity: [0.1, 0.5, 1],
    transition: { delay: 1.5 + 0.2 * index, duration: 0.3 },
  }),
};
const ProductImages = ({ _id, images }: { _id: string; images: Images[] }) => {
  const [bigImgInd, setBigImgInd] = useState(0);
  const url = images[bigImgInd].productPath;
  const [variant, dir] = useCarousel(bigImgInd);
  const { getlink } = useModifyUrl();
  const { pathname } = useLocation();
  // const vt = unstable_useViewTransitionState(`/`);
  const vt = unstable_useViewTransitionState(pathname);

  return (
    <div className="images center ">
      <AnimatePresence mode="wait" custom={{ dir, width: 100 }} initial={false}>
        <motion.picture
          className="w-80 h-100  big-img-wrapper "
          custom={{ dir, width: 100 }}
          variants={variant as Variants}
          initial="start"
          animate="end"
          exit={"exit"}
          key={`pic -${url}`}
        >
          <img
            style={{
              viewTransitionName: vt ? `view-${_id}` : "",
            }}
            src={getlink(url, 300)}
          />
        </motion.picture>
      </AnimatePresence>

      <div className="small-img-par center">
        {images.map(({ productPath }, index) => {
          return (
            <motion.div
              custom={index}
              variants={smallImageVariant}
              key={productPath}
              onClick={() => setBigImgInd(index)}
            >
              <MainImage
                width={200}
                path={productPath}
                wrapperClassName="small-img"
                style={{ opacity: index === bigImgInd ? 1 : 0.4 }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductImages;
