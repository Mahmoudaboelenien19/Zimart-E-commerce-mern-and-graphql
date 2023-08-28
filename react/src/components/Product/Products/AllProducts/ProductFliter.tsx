import React, { useState, useContext } from "react";
import ProductRate from "../../../product Route/ProductRate";
import useAvg from "../../../../custom/useAvg";
import ProductListHeart from "../../../svgs/ProductListHeart";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import useMeasure from "react-use-measure";
import { viewContext } from "../../../../context/gridView";
import { productListContext } from "../../../../context/FilterData";
import ListCartBtn from "./ListCartBtn";
import DetailsBtn from "../../../widgets/buttons/DetailsBtn";
import { AiOutlineCheck } from "react-icons/ai";
import { ProductInterface } from "../../../../interfaces/product";
import Title from "../../../widgets/Title";
import { RiEditLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import CompareIcons from "../../../svgs/CompareIcons";
import StyledPrice from "../../../widgets/StyledPrice";
interface Props extends ProductInterface {
  isDash?: boolean;
  isSLide?: boolean;
  index: number;
}

const ProductFliter = ({
  isSLide,
  isDash,
  category,
  _id,
  price,
  stock,
  title,
  images,
  rating,
  state,
  index,
  description,
  reviews,
}: Props) => {
  const { avgRate, reviewLength } = useAvg(rating, reviews);
  const [isFavoraited, setIsFavorited] = useState(false);
  const [onCart, setOnCart] = useState(false);
  const { productSearchWord, showFilter } = useContext(productListContext);
  const { gridView } = useContext(viewContext);
  const [sectionRef, { width: sectionWidth }] = useMeasure();

  const [ref, animate] = useAnimate();
  const navigat = useNavigate();

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      transition={{ delay: 0.05 }}
      whileInView={{ opacity: [0, 0.2, 0.4, 0.6, 1] }}
    >
      <motion.div
        className="par"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        onAnimationComplete={() => {
          animate(
            ".par , .product-List",
            { opacity: [0, 0.4, 1], x: [10, 5, 0], y: [5, 0] },
            { delay: index * 0.15, duration: 0.15 }
          );
        }}
      >
        <motion.section
          className={`product-List center ${
            gridView ? "grid col" : "list between "
          }`}
          ref={sectionRef}
          initial={{ height: 0 }}
          animate={{
            height:
              sectionWidth <= 400 && !gridView && showFilter
                ? 200
                : !gridView
                ? 280
                : 350,
          }}
          transition={{ duration: 0.1, type: "tween" }}
        >
          <LazyLoadImage
            effect="blur"
            src={images[0].productPath}
            alt={title}
            wrapperClassName={` img-par center ${gridView ? "grid" : "list"}`}
          />

          <div className="center col product-data">
            <h5 className="product-head-underline" style={{ marginBottom: 12 }}>
              {productSearchWord && !isDash && !isSLide
                ? category
                    .split(new RegExp(`(${productSearchWord})`, "gi"))
                    .map((part, index) => {
                      if (
                        part?.toLowerCase() === productSearchWord.toLowerCase()
                      ) {
                        return (
                          <span key={index} className="highlight">
                            {part}
                          </span>
                        );
                      } else {
                        return <span key={index}>{part}</span>;
                      }
                    })
                : category}
            </h5>
            <StyledPrice price={price} />

            <span className="title-product">
              {" "}
              {productSearchWord && !isDash && !isSLide
                ? title
                    .split(new RegExp(`(${productSearchWord})`, "gi"))
                    .map((part, index) => {
                      if (
                        part?.toLowerCase() === productSearchWord.toLowerCase()
                      ) {
                        return (
                          <span key={index} className="highlight">
                            {part}
                          </span>
                        );
                      } else {
                        return <span key={index}>{part}</span>;
                      }
                    })
                : title}
            </span>

            <span className=" center stock-par shadow">
              <span className="stock-icon ">
                <AiOutlineCheck className=" icon" />
              </span>
              <span className="stock "> {stock}</span>{" "}
              <span className="stock-card">in stock</span>
            </span>

            <AnimatePresence mode="wait">
              {!gridView && sectionWidth >= 400 && (
                <motion.p
                  key={description}
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    transition: { delay: 0.3, duration: 0.3 },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: { duration: 0.3 },
                  }}
                  style={{ fontWeight: "normal" }}
                >
                  {description}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="product-rate-filter center ">
              <ProductRate
                key={`${_id}-rate`}
                id={_id}
                avgRate={avgRate}
                ratingLen={reviewLength}
                reviews={reviews}
                rating={rating}
                pos={"bottom"}
              />
            </div>
            {!isDash && (
              <div className="product-links center  w-100">
                <AnimatePresence mode="wait">
                  {!onCart ? (
                    <ListCartBtn
                      key={"ListCartBtn"}
                      setOnCart={setOnCart}
                      price={price}
                      title={title}
                      parentId={_id}
                      images={images}
                      btn="add to cart"
                    />
                  ) : (
                    <ListCartBtn
                      key={"removeListCartBtn"}
                      setOnCart={setOnCart}
                      price={price}
                      title={title}
                      parentId={_id}
                      images={images}
                      btn="remove from cart"
                    />
                  )}
                </AnimatePresence>

                {/* <DetailsBtn
                  btn="details"
                  cls="btn details-outline center shadow gap"
                  _id={_id}
                  Icon={BsInfoCircleFill}
                /> */}
              </div>
            )}
            <span className="heart-filter  center">
              {!isDash ? (
                <div className="center col ">
                  <DetailsBtn _id={_id} />{" "}
                  <ProductListHeart
                    isFavoraited={isFavoraited}
                    price={price}
                    title={title}
                    setIsFavorited={setIsFavorited}
                    parentId={_id}
                    images={images}
                  />
                  <span style={{ marginLeft: 4 }}>
                    <CompareIcons id={_id} title={title} />
                  </span>
                </div>
              ) : (
                <span onClick={() => navigat(`/dashboard/products/${_id}`)}>
                  <Title title="edit product">
                    <RiEditLine fontSize={16} color="var(--third)" />
                  </Title>
                </span>
              )}
            </span>
            <span className={`product-state center ${state}`}>{state}</span>
          </div>
        </motion.section>
      </motion.div>
    </motion.span>
  );
};

export default ProductFliter;
