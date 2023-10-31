import StarIcon from "../../custom SVGs/StarIcon";
import { Fragment } from "react";
import RatingDetails from "../Product/Products/RateDetails";
import { reviewInterface } from "../../interfaces/product";

const ProductRate = ({
  avgRate,
  ratingLen,
  id = "",
  reviews,
  rating,
}: {
  ratingLen: number;
  avgRate: number;
  id?: string;
  rating: number[];
  reviews: reviewInterface[];
}) => {
  return (
    <div className="product-rate center">
      <Fragment>
        {[1, 2, 3, 4, 5].map((e, i) => {
          return <StarIcon key={e} id={i} avgRate={avgRate} optional={id} />;
        })}
      </Fragment>

      <span className="shadow rate center">
        {avgRate >= 0 ? avgRate.toFixed(1) : null}
      </span>
      <span
        style={{
          color: "var(--green)",
          fontWeight: "bold",
          marginLeft: 6,
        }}
        className="shadow center relative"
      >
        {ratingLen >= 0 ? ratingLen : <p className="center "> no reviews </p>}

        <RatingDetails
          arr={
            reviews
              ? [
                  ...(Array.isArray(rating) ? rating : []),
                  ...reviews.map((e: reviewInterface) => e.rate),
                ]
              : []
          }
        />
      </span>
    </div>
  );
};

export default ProductRate;
