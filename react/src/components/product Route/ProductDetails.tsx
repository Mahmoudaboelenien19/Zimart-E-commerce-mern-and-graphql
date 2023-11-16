import "./product.scss";
import ProductRate from "./ProductRate";
import AddReview from "./Review/AddReviewIcons";
import CompareIcons from "../svgs/CompareIcons";
import StyledPrice from "../widgets/StyledPrice";
import BuyBtn from "../widgets/buttons/BuyBtn";
import useAvg from "@/custom/helpers/useAvg";
import { Product } from "@/types/product";
import ProductListHeart from "../svgs/ProductListHeart";
import MainBtn from "../widgets/buttons/MainBtn";
import CartBtns from "../Product/Products/ProductList/ProductCard/CartBtns";
import { BsFillCartPlusFill, BsFillCartXFill } from "react-icons/bs";
import Header from "../widgets/shared/Header";
import Stock from "../widgets/shared/product/Stock";
import Reviews from "./Review/Reviews";
import { motion } from "framer-motion";
import ReviewsWrapper from "./Review/ReviewsWrapper";

const parentVariant = {
  start: { x: 400, opacity: 0 },
  end: {
    x: 0,
    opacity: [0, 1],
    transition: { delay: 0.7, type: "spring", stiffness: 70 },
  },
};
const ProductDetails = ({
  title,
  description,
  _id,
  images,
  category,
  stock,
  price,
  rating,
  reviews,
}: Product) => {
  const { avgRate, reviewLength } = useAvg(rating, reviews);

  return (
    <motion.div
      className="details"
      variants={parentVariant}
      initial="start"
      animate="end"
    >
      <div>
        <Header head={category} />
        <br />
        <div className={"title-par"}>
          <h2 className="title  center">
            {title}
            <span className="center heart-par">
              <CompareIcons id={_id} /> <ProductListHeart id={_id} />
            </span>
          </h2>

          <Stock stock={stock} />
        </div>

        <div className="center gap" style={{ justifyContent: "flex-start" }}>
          <div className="center">
            <ProductRate
              key={`${description}-rate`}
              avgRate={avgRate}
              ratingLen={reviewLength}
              rating={rating}
              reviews={reviews}
            />
          </div>
          <ReviewsWrapper reviews={reviews} _id={_id} />
        </div>
      </div>

      <div className="details-bottom">
        <StyledPrice price={price} />

        <p>{description}</p>

        <div className="hr" />

        <div className="product-btn  ">
          <BuyBtn
            products={[
              {
                title,
                productId: _id,
                price,
                path: images[0]?.productPath || "",
                count: 1,
              },
            ]}
            disabled={stock === 0}
          />
          <CartBtns
            _id={_id}
            onCollection={
              <MainBtn
                className="btn main center gap"
                btn={"add to cart"}
                Icon={BsFillCartPlusFill}
              />
            }
            offCollection={
              <MainBtn
                className="btn remove center gap"
                btn={"remove from  cart"}
                Icon={BsFillCartXFill}
              />
            }
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
