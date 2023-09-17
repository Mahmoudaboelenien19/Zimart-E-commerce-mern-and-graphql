import React, { useState, useContext, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import useMeasure from "react-use-measure";
import { AiOutlineCheck } from "react-icons/ai";
import { RiEditLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import ProductRate from "@/components/product Route/ProductRate";
import CompareIcons from "@/components/svgs/CompareIcons";
import ProductListHeart from "@/components/svgs/ProductListHeart";
import StyledPrice from "@/components/widgets/StyledPrice";
import DetailsBtn from "@/components/widgets/buttons/DetailsBtn";
import { productListContext } from "@/context/FilterData";
import { viewContext } from "@/context/gridView";
import useAvg from "@/custom/useAvg";
import useIsMobile from "@/custom/useIsMobile";
import { ProductInterface } from "@/interfaces/product";
import Title from "@/components/widgets/Title";
import useParams from "@/custom/useParams";
import ProductDescription from "./ProductDescription";
import ProductBtns from "./ProductBtns";
import HighlightSearchResult from "./HighlightSearchResult";

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
  const { search: searchWord, showAsideFilter } = useParams();
  const { avgRate, reviewLength } = useAvg(rating, reviews);
  const [isFavoraited, setIsFavorited] = useState(false);

  const { isPending } = useContext(productListContext);
  const { gridView, setGridView } = useContext(viewContext);
  const [sectionRef, { width: sectionWidth }] = useMeasure();
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
      style={{
        height:
          sectionWidth <= 400 && !gridView && showAsideFilter
            ? 200
            : !gridView
            ? 320
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
        <HighlightSearchResult
          bool={Boolean(searchWord && !isDash && !isSLide && !isPending)}
          Element="h5"
          className="product-head-underline"
          value={category}
        />

        <HighlightSearchResult
          bool={Boolean(searchWord && !isDash && !isSLide && !isPending)}
          Element="span"
          className="title-product"
          value={title}
        />

        <span className=" center stock-par shadow">
          <span className="stock-icon ">
            <AiOutlineCheck className=" icon" />
          </span>
          <span className="stock "> {stock}</span>{" "}
          <span className="stock-card">in stock</span>
        </span>

        <>
          {!gridView && sectionWidth >= 400 && (
            <ProductDescription description={description || ""} />
          )}
        </>

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
            <ProductBtns
              price={price}
              title={title}
              images={images}
              _id={_id}
            />
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
