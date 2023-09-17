import React, { useState, useContext, useEffect } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";

import ListCartBtn from "./ListCartBtn";

import { AiOutlineCheck } from "react-icons/ai";

import { RiEditLine } from "react-icons/ri";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductRate from "@/components/product Route/ProductRate";
import CompareIcons from "@/components/svgs/CompareIcons";
import ProductListHeart from "@/components/svgs/ProductListHeart";
import StyledPrice from "@/components/widgets/StyledPrice";
import FadeWithY from "@/components/widgets/animation/FadeWithY";
import DetailsBtn from "@/components/widgets/buttons/DetailsBtn";
import { productListContext } from "@/context/FilterData";
import { viewContext } from "@/context/gridView";
import useAvg from "@/custom/useAvg";
import useIsMobile from "@/custom/useIsMobile";
import { ProductInterface } from "@/interfaces/product";
import Title from "@/components/widgets/Title";
import useParams from "@/custom/useParams";

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

  description,
  reviews,
}: Props) => {
  const [searchParams] = useSearchParams();
  const searchWord = searchParams.get("search");
  const { avgRate, reviewLength } = useAvg(rating, reviews);
  const [isFavoraited, setIsFavorited] = useState(false);
  const [onCart, setOnCart] = useState(false);
  const { isPending } = useContext(productListContext);
  const { gridView, setGridView } = useContext(viewContext);
  const [sectionRef, { width: sectionWidth }] = useMeasure();
  const { showAsideFilter } = useParams();
  const navigat = useNavigate();
  const { isMobile } = useIsMobile();
  useEffect(() => {
    if (isMobile) {
      setGridView(true);
    }
  }, [isMobile]);
  return (
    <section
      className={`product-List center ${
        gridView ? "grid col" : "list between "
      }`}
      ref={sectionRef}
      // initial={{ height: 0 }}
      style={{
        height:
          sectionWidth <= 400 && !gridView && showAsideFilter
            ? 200
            : !gridView
            ? 280
            : 380,
      }}
    >
      <LazyLoadImage
        effect="blur"
        src={images[0].productPath}
        alt={title}
        wrapperClassName={` img-par center ${gridView ? "grid" : "list"}`}
        placeholder={<StyledPrice price={price} />}
      />
      <div className="divider">
        <StyledPrice price={price} />
      </div>

      <div className="center col product-data">
        <h5 className="product-head-underline" style={{ marginBottom: 12 }}>
          {searchWord && !isDash && !isSLide && !isPending
            ? category
                .split(new RegExp(`(${searchWord})`, "gi"))
                .map((part, index) => {
                  if (part?.toLowerCase() === searchWord.toLowerCase()) {
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

        <span className="title-product">
          {" "}
          {searchWord && !isDash && !isSLide && !isPending
            ? title
                .split(new RegExp(`(${searchWord})`, "gi"))
                .map((part, index) => {
                  if (part?.toLowerCase() === searchWord.toLowerCase()) {
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
                <RiEditLine color="var(--third)" />
              </Title>
            </span>
          )}
        </span>
        <span className={`product-state center ${state}`}>{state}</span>
      </div>
    </section>
  );
};

export default ProductFliter;
