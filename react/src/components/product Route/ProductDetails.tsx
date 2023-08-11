import React, { useEffect, useState, useContext } from "react";
import { BiCommentEdit, BiPurchaseTagAlt, BiShow } from "react-icons/bi";

import { AiFillPlusSquare, AiOutlineCheck } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import useAvg from "../../custom/useAvg";
import { useAppSelector } from "../../custom/reduxTypes";
import HeartSvgProduct from "../../custom SVGs/HeartSvgProduct";
import { productContext } from "./Product";
import usePathAndId from "../../custom/usePathAndId";
import ProductRate from "./ProductRate";
import CartBtn from "../widgets/CartBtn";
import AddReview from "./AddReview";
import Title from "../widgets/Title";
import { isAuthContext } from "../../context/isAuth";
import useBuy from "../../custom/useBuy";
import OpacityBtn from "../widgets/OpacityBtn";
import CompareIcons from "../widgets/CompareIcons";
import StyledPrice from "../widgets/StyledPrice";
import { toast } from "react-hot-toast";

interface Props {
  setShowPop: React.Dispatch<React.SetStateAction<boolean>>;
}
const ProductDetails = ({ setShowPop }: Props) => {
  const {
    images,
    bigImgInd,
    _id,
    rating,
    title,
    description,
    category,
    price,
    stock,
    reviews,
    startHover,
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
    const check = cart.some((e) => e.productId === id);
    if (check) {
      setOnCart(true);
    } else {
      setOnCart(false);
    }
  }, [cart, id]);

  const { handlePurchase, isPending } = useBuy([
    { _id, productId: _id, parentId: "", price, path: "", title, count: 1 },
  ]);

  const [hasReview, setHasReview] = useState(false);
  const { userId } = useContext(isAuthContext);
  const [rateIndex, setRateIndex] = useState(-1);

  useEffect(() => {
    const check = reviews?.find((e: any) => e.userId === userId);
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
      style={{ position: "relative", zIndex: startHover ? -1 : 1 }}
    >
      <div className="details-top">
        <h3
          style={{ margin: 0, color: "var(--twitter)" }}
          className="header underline "
        >
          {category}
        </h3>
        <br />
        <div className="title-par">
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
          {reviews.length >= 1 && (
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

        <p style={{ color: "var(--third)" }}>{description}</p>

        <div className="hr"></div>

        <div className="product-btn  ">
          <OpacityBtn
            cls="btn btn-buy center"
            fn={handlePurchase}
            Icon={BiPurchaseTagAlt}
            btn="Buy Now"
            isPending={isPending}
          />

          {!onCart ? (
            <CartBtn id={_id} key={"add-to-cart"} btn="add to cart" />
          ) : (
            <CartBtn id={_id} btn="remove from cart" key={"remove-from-cart"} />
          )}
        </div>
      </div>

      <AnimatePresence>
        {showAddRate && (
          <AddReview
            setShowAddRate={setShowAddRate}
            key={"add-rate-pop"}
            _id={_id}
            rateIndex={rateIndex}
            setRateIndex={setRateIndex}
            defaultVal={userReview}
            hasReview={hasReview}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductDetails;
