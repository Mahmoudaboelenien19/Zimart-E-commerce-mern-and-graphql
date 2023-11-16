import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ProductRate from "@/components/product Route/ProductRate";
import StyledPrice from "@/components/widgets/StyledPrice";
import useAvg from "@/custom/helpers/useAvg";
import useIsMobile from "@/custom/helpers/useIsMobile";
import { Product } from "@/types/product";
import useParams from "@/custom/helpers/useParams";
import ProductDescription from "./ProductDescription";
import HighlightSearchResult from "./HighlightSearchResult";
import Skeleton from "react-loading-skeleton";
import clsx from "clsx";
import ProductCardImage from "./ProductCardImage";
import Stock from "@/components/widgets/shared/product/Stock";
import ProductCardButtons from "./ProductCardButtons";

type Props = {
  isSLide?: boolean;
} & Product;

const ProductCard = ({
  isSLide,
  category,
  _id,
  stock,
  price,
  title,
  images,
  rating,
  state,
  description,
  reviews,
}: Props) => {
  const { deleteParam, getParam } = useParams();
  const view = getParam("view") || "grid";
  const { avgRate, reviewLength } = useAvg(rating, reviews);

  const { isMobile } = useIsMobile();
  useEffect(() => {
    if (isMobile) {
      deleteParam("view");
    }
  }, [isMobile]);
  const { pathname } = useLocation();
  const isDash = pathname.startsWith("/dashboard");

  return (
    <div
      className={clsx(
        "product-card ",
        !isDash && !isSLide && view === "list" ? "list " : "grid  "
      )}
      style={{
        height: view === "list" ? 280 : 500,
      }}
      key={_id}
    >
      <ProductCardImage
        path={images ? images[0]?.productPath : ""}
        _id={_id}
        isSLide={isSLide || false}
      />
      <div className=" col product-data">
        {_id ? (
          <>
            <div className="w-100 between center">
              <HighlightSearchResult
                bool={Boolean(!isDash && !isSLide)}
                Element="span"
                className="card-cateagry"
                value={category}
              />
              <Stock stock={stock} />
            </div>
            <Link to={`/product/${_id}`} unstable_viewTransition>
              <HighlightSearchResult
                bool={Boolean(!isDash && !isSLide)}
                Element="h5"
                className="title-product"
                value={title}
              />
            </Link>

            <ProductDescription description={description || ""} />
            <ProductRate
              key={`${_id}-rate`}
              id={_id}
              avgRate={avgRate}
              ratingLen={reviewLength}
              reviews={reviews}
              rating={rating}
            />

            <div className="line" />
            <div className="center between w-100">
              <StyledPrice price={price} />
              <ProductCardButtons _id={_id} isDash={isDash} />
            </div>

            <span className={`product-state center ${state}`}>{state}</span>
          </>
        ) : (
          <Skeleton
            count={5}
            height={18}
            width={"100%"}
            containerClassName="w-100 flex between col gap  h-100 skeleton"
            className="skeleton"
            enableAnimation
          />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
