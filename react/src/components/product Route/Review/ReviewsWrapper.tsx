import { type Review } from "@/types/product";
import React, { useState } from "react";
import AddReview from "./AddReviewIcons";
import Reviews from "./Reviews";

type Props = { reviews: Review[]; _id: string };
const ReviewsWrapper = ({ reviews, _id }: Props) => {
  const [reviewData, setReviewData] = useState(reviews);
  return (
    <>
      <Reviews key={`review-${_id}`} reviews={reviewData} />
      <AddReview reviews={reviewData} setReviewData={setReviewData} _id={_id} />
    </>
  );
};

export default ReviewsWrapper;
