import { useEffect, useRef, useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import StarIcon from "@/custom SVGs/StarIcon";
import Title from "@/components/widgets/Title";
import useModifyUrl from "@/custom/useModifyUrl";
import { reviewInterface } from "@/interfaces/product";
const clrsArr = [
  "var(--green)",
  "var(--delete)",
  "var(--twitter)",
  "var(--secondary)",
  "var(--fb)",
];

interface Props extends reviewInterface {
  i: number;
}

const Review = ({ image: img, user, rate, review, i, userData }: Props) => {
  const [reviewData, setReviewDate] = useState({ name: "", image: "" });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (userData?.name) {
      setReviewDate({
        name: userData?.name,
        image: userData?.image,
      });
    }
  }, [userData?.name]);
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: false });

  let interval: number | undefined;
  useEffect(() => {
    if (count < rate && inView) {
      interval = setInterval(() => {
        setCount((cur) => cur + 1);
      }, 300);
    }
    return () => clearInterval(interval);
  }, [count, inView]);

  const { getlink } = useModifyUrl();
  const url = reviewData?.image || img;
  return (
    <div ref={ref}>
      <div className="img-review center">
        <div className="before" style={{ background: clrsArr[i] }} />

        <Title title={reviewData?.name || user}>
          <LazyLoadImage effect="blur" src={getlink(url, 200)} />
        </Title>
      </div>
      <p className="review-user center">{reviewData?.name || user}</p>
      <div className="review-rate center">
        <StarIcon avgRate={4} id={1} />
        <span className="center" style={{ marginBottom: -4 }}>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={count}
              initial={{ y: 5 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
              className="user-rate"
            >
              {count}
            </motion.span>
          </AnimatePresence>
          <span className="five center">
            <span>/</span>5
          </span>
        </span>
      </div>

      <div className="user-review center">
        <span>
          <FaQuoteLeft className="icon" fill={clrsArr[i]} />
        </span>
        <p>{review}</p>
        <span>
          <FaQuoteRight className="icon" color={clrsArr[i]} />
        </span>
      </div>
    </div>
  );
};

export default Review;
