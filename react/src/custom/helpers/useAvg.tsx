import { useState, useEffect } from "react";
import { Review } from "../../types/product";

const useAvg = (rating: number[], reviews: Review[]) => {
  const [avgRate, setAvgRate] = useState(-1);
  const [reviewLength, setReviewLength] = useState(-1);

  const [arr, setArr] = useState<number[]>([]);

  useEffect(() => {
    if (reviews?.length >= 1) {
      setArr([...rating, ...reviews.map((e) => e.rate)]);
    }
  }, [reviews]);

  useEffect(() => {
    if (arr.length >= 1) {
      setAvgRate(getAvg(arr));
      setReviewLength(arr.length);
    }
  }, [arr]);

  const getAvg = (arr: number[]) => {
    let result = 0;
    const len = arr.length;

    for (const num of arr) {
      result += num;
    }

    return result / len;
  };

  return { avgRate, reviewLength };
};

export default useAvg;
