import React, { useContext, useState } from "react";

import Review from "./Review";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import useCarousel from "../../../custom/useCarousel";
import { AnimatePresence, motion, Variants } from "framer-motion";
import useIndex from "../../../custom/useIndex";

import { productContext } from "../Product";
import useMeasure from "react-use-measure";
import Overley from "../../widgets/Overley";
import MobileCloseDropDown from "../../widgets/MobileCloseDropDown";

interface Props {
  setShowPop: React.Dispatch<React.SetStateAction<boolean>>;
}

const Reviews = ({ setShowPop }: Props) => {
  const { reviews } = useContext(productContext);

  const [reviewIndex, setRviewIndex] = useState(0);

  const [variant, dir] = useCarousel(reviewIndex, reviews.length);

  const [animateRef, { width }] = useMeasure();
  const [handleIndex] = useIndex();
  return (
    <Overley sethide={setShowPop} cls=" pop-up-reviews pop-up">
      <h2 className="underline header" style={{ marginBottom: 20 }}>
        reviews
      </h2>
      <AnimatePresence custom={{ dir, width }} mode="wait">
        <motion.div
          id="reviews"
          ref={animateRef}
          key={reviewIndex}
          variants={variant as Variants}
          initial="start"
          exit="exit"
          animate="end"
          custom={{ dir, width }}
        >
          {reviews.map((review, i) => {
            {
              if (i === reviewIndex) {
                return <Review key={review._id} {...review} i={i} />;
              }
            }
          })}
        </motion.div>
      </AnimatePresence>
      <div className="btn-review center">
        <motion.button
          className="center "
          style={{ background: "var(--delete)", color: "var(--white)" }}
          onClick={() =>
            setRviewIndex(handleIndex(reviewIndex - 1, reviews.length))
          }
        >
          <FaLessThan />
        </motion.button>
        <motion.button
          className="center "
          style={{ background: "var(--green)", color: "var(--white)" }}
          onClick={() =>
            setRviewIndex(handleIndex(reviewIndex + 1, reviews.length))
          }
        >
          <FaGreaterThan />
        </motion.button>
      </div>
      <MobileCloseDropDown setter={setShowPop} title={"close reviews"} />
    </Overley>
  );
};

export default Reviews;
