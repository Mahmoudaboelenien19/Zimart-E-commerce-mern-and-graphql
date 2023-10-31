import "./product.scss";
import { useEffect, useState, useContext } from "react";
import { BiCommentEdit, BiShow } from "react-icons/bi";
import { AiFillPlusSquare, AiOutlineCheck } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { productContext } from "./Product";
import ProductRate from "./ProductRate";
import AddReview from "./Review/AddReview";
import Title from "../widgets/Title";
import CompareIcons from "../svgs/CompareIcons";
import StyledPrice from "../widgets/StyledPrice";
import { toast } from "react-hot-toast";
import BuyBtn from "../payment/BuyBtn";
import CartBtn from "../widgets/buttons/CartBtn";
import { isAuthContext } from "@/context/isAuth";
import HeartSvgProduct from "@/custom SVGs/HeartSvgProduct";
import { useAppSelector } from "@/custom/reduxTypes";
import useAvg from "@/custom/useAvg";
import usePathAndId from "@/custom/usePathAndId";
import { reviewInterface } from "@/interfaces/product";

interface Props {
  setShowPop: React.Dispatch<React.SetStateAction<boolean>>;
}
const ProductDetails = ({ setShowPop }: Props) => {
  const {
    images = [],
    bigImgInd,
    _id,
    rating,
    title,
    description,
    category,
    price,
    stock,
    reviews,
  } = useContext(productContext);
  const parentVariant = {
    start: { x: 400, opacity: 0 },
    end: {
      x: 0,
      opacity: [0, 1],
      transition: { delay: 0.7, type: "spring", stiffness: 70 },
    },
  };
  const { isAuth } = useContext(isAuthContext);

  const { avgRate, reviewLength } = useAvg(rating, reviews);

  const handleshowPop = () => setShowPop(true);
  const [isFavoraited, setIsFavorited] = useState(false);
  const [id] = usePathAndId(images, bigImgInd);
  const { cart } = useAppSelector((state) => state.cart);
  const [onCart, setOnCart] = useState(false);
  const [showAddRate, setShowAddRate] = useState(false);
  const [userReview, setUserReview] = useState("");
  const toggleSHowAddRate = () => setShowAddRate(!showAddRate);
  useEffect(() => {
    const check = cart?.some((e) => e.productId === id);
    if (check) {
      setOnCart(true);
    } else {
      setOnCart(false);
    }
  }, [cart, id]);

  const [hasReview, setHasReview] = useState(false);
  const { userId } = useContext(isAuthContext);
  const [rateIndex, setRateIndex] = useState(0);

  useEffect(() => {
    const check = reviews?.find((e: reviewInterface) => e.userId === userId);
    if (check) {
      setHasReview(true);
      setUserReview(check.review);
      setRateIndex(check.rate - 1);
    } else {
      setHasReview(false);
    }
  }, [reviews]);
  return (
    <motion.div
      className="details"
      variants={parentVariant}
      initial="start"
      animate="end"
    >
      <div className="details-top">
        <h3
          style={{ margin: 0, color: "var(--twitter)" }}
          className="header underline "
        >
          {category}
        </h3>
        <br />
        <div className={"title-par"}>
          <h2 className="title  center">
            {title}
            <span className="center heart-par">
              <HeartSvgProduct
                isFavoraited={isFavoraited}
                setIsFavorited={setIsFavorited}
              />
              <CompareIcons id={_id} title={title} />
            </span>
          </h2>

          <span className=" center stock-par shadow">
            <span className="stock-icon ">
              <AiOutlineCheck className=" icon" />
            </span>
            <span className="stock"> {stock}</span>in stock
          </span>
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
          {reviews?.length >= 1 && (
            <Title title="show all reviews">
              <BiShow
                fontSize={12}
                color="var(--third)"
                onClick={handleshowPop}
              />
            </Title>
          )}

          <AnimatePresence>
            {!hasReview ? (
              <Title title="add review" key={"add-review"}>
                <AiFillPlusSquare
                  color="var(--green)"
                  fontSize={12}
                  onClick={() => {
                    isAuth
                      ? toggleSHowAddRate()
                      : toast.error("you must log in to add review");
                  }}
                />
              </Title>
            ) : (
              <Title title="edit your review" key={"has-review"}>
                <BiCommentEdit
                  fontSize={12}
                  color="var(--green)"
                  onClick={toggleSHowAddRate}
                />
              </Title>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="details-bottom">
        <StyledPrice price={price} />

        <p>{description}</p>

        <div className="hr"></div>

        <div className="product-btn  ">
          <BuyBtn
            products={[
              {
                _id,
                title,
                productId: _id,
                parentId: _id,
                price,
                path: images[bigImgInd]?.productPath || "",
                count: 1,
              },
            ]}
            disabled={stock === 0}
          />
          {!onCart ? (
            <CartBtn id={_id} key={"add-to-cart"} btn="add to cart" />
          ) : (
            <CartBtn id={_id} btn="remove from cart" key={"remove-from-cart"} />
          )}
        </div>
      </div>

      <AddReview
        setShowAddRate={setShowAddRate}
        key={"add-rate-pop"}
        _id={_id}
        rateIndex={rateIndex}
        setRateIndex={setRateIndex}
        defaultVal={userReview}
        hasReview={hasReview}
        bool={showAddRate}
      />
    </motion.div>
  );
};

export default ProductDetails;
