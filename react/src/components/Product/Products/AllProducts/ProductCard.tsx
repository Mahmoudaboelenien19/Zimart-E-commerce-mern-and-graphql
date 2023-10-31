import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { RiEditLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import ProductRate from "@/components/product Route/ProductRate";
import CompareIcons from "@/components/svgs/CompareIcons";
import ProductListHeart from "@/components/svgs/ProductListHeart";
import StyledPrice from "@/components/widgets/StyledPrice";
import useAvg from "@/custom/useAvg";
import useIsMobile from "@/custom/useIsMobile";
import { ProductInterface } from "@/interfaces/product";
import Title from "@/components/widgets/Title";
import useParams from "@/custom/useParams";
import ProductDescription from "./ProductDescription";
import ProductBtns from "./ProductBtns";
import HighlightSearchResult from "./HighlightSearchResult";
import useModifyUrl from "@/custom/useModifyUrl";
import Skeleton from "react-loading-skeleton";
import clsx from "clsx";
import InViewAnimation from "@/components/widgets/animation/InViewAnimation";

interface Props extends ProductInterface {
  isDash?: boolean;
  isSLide?: boolean;
  index: number;
}

const ProductCard = ({
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
  const {
    search: searchWord,
    deleteParam,
    showDashBoaedAside,
    getParam,
  } = useParams();
  const view = getParam("view") || "grid";
  const { avgRate, reviewLength } = useAvg(rating, reviews);
  const [isFavoraited, setIsFavorited] = useState(false);
  const { getlink } = useModifyUrl();
  const navigat = useNavigate();
  const { isMobile } = useIsMobile();
  useEffect(() => {
    if (isMobile) {
      deleteParam("view");
    }
  }, [isMobile]);
  return (
    <InViewAnimation
      className={clsx("product-card ", view === "list" ? "list " : "grid  ")}
      style={{
        height: view === "list" ? 280 : 500,
      }}
    >
      {_id ? (
        <LazyLoadImage
          effect="blur"
          src={getlink(images[0]?.productPath, 400)}
          alt={title}
          wrapperClassName={clsx(
            "img-par center",
            view === "grid" ? "grid" : "list"
          )}
        />
      ) : (
        <Skeleton
          circle
          width={200}
          height={200}
          containerClassName={clsx(
            "img-par center",
            view === "grid" ? "grid" : "list"
          )}
        />
      )}
      <div className=" col product-data">
        {_id ? (
          <>
            <HighlightSearchResult
              bool={Boolean(searchWord && !isDash && !isSLide)}
              Element="span"
              className="card-cateagry"
              value={category}
            />

            <Link to={`/product/${_id}`}>
              <HighlightSearchResult
                bool={Boolean(searchWord && !isDash && !isSLide)}
                Element="h5"
                className="title-product"
                value={title}
              />
            </Link>

            {/* {_id ? (
          <>
            <span className=" center stock-par shadow">
              <span className="stock-icon ">
                <AiOutlineCheck className=" icon" />
              </span>
              <span className="stock "> {stock}</span>{" "}
              <span className={"stock-card"}>in stock</span>
            </span>
      
     
          </>
        ) : (
          <div className="w-100 ">
            <Skeleton
              style={{ width: "80%", margin: "5px 10% " }}
              height={15}
              count={4}
            />
          </div>
        )} */}

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
              <div className={clsx("card-actions   center gap ")}>
                {!isDash ? (
                  <>
                    <ProductBtns
                      price={price}
                      title={title}
                      images={images}
                      _id={_id}
                      stock={stock}
                    />
                    <CompareIcons id={_id} title={title} />{" "}
                    <ProductListHeart
                      isFavoraited={isFavoraited}
                      price={price}
                      title={title}
                      setIsFavorited={setIsFavorited}
                      parentId={_id}
                      images={images}
                    />
                  </>
                ) : (
                  <span
                    onClick={() =>
                      navigat(
                        `/dashboard/products/${_id}` +
                          `${
                            showDashBoaedAside ? "?showDashBoaedAside=true" : ""
                          }`
                      )
                    }
                  >
                    <Title title="edit product">
                      <RiEditLine color="var(--third)" />
                    </Title>
                  </span>
                )}
              </div>
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
    </InViewAnimation>
  );
};

export default ProductCard;
