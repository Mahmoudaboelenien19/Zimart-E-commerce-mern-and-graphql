import React, { useEffect, useState } from "react";
import StarIcon from "../../../custom SVGs/StarIcon";

import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import Title from "../../widgets/Title";
import { LazyLoadImage } from "react-lazy-load-image-component";

const clrsArr = [
  "var(--green)",
  "var(--delete)",
  "var(--twitter)",
  "var(--secondary)",
  "var(--fb)",
];

interface Props {
  _id: string;
  image: string;
  user: string;
  rate: number;
  review: string;
  i: number;
  userData: { name: string; image: string };
}

const Review = ({ image: img, user, rate, review, i, userData }: Props) => {
  const [reviewData, setReviewDate] = useState({ name: "", image: "" });

  useEffect(() => {
    if (userData?.name) {
      setReviewDate({
        name: userData?.name,
        image: userData?.image,
      });
    }
  }, [userData?.name]);

  return (
    <>
      <div className="img-review center">
        <div className="before" style={{ background: clrsArr[i] }}></div>

        <Title title={reviewData?.name || user}>
          <LazyLoadImage effect="blur" src={reviewData?.image || img} />
        </Title>
      </div>
      <p className="review-user center">{reviewData?.name || user}</p>
      <div className="review-rate center">
        <StarIcon avgRate={4} id={1} />
        <span className="center" style={{ marginBottom: -4 }}>
          <AnimatePresence mode="wait">
            <span className="user-rate">{rate}</span>
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
        {review}
        <span>
          <FaQuoteRight className="icon" color={clrsArr[i]} />
        </span>
      </div>
    </>
  );
};

export default Review;
