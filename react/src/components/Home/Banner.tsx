import React, { RefAttributes, useContext, useEffect, useState } from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";

import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import BannerText from "./BannerText";
import { useAppSelector } from "@/custom/reduxTypes";
import useFilterCategory from "@/custom/useFilterCategory";
import useFilterState from "@/custom/useFIlterState";
import useIsMobile from "@/custom/useIsMobile";
import { productListContext } from "@/context/FilterData";
import FadeElement from "../widgets/animation/FadeElement";
import useParams from "@/custom/useParams";

const arrClrs = ["var(--green)", "var(--gmail)", "var(--delete)", "var(--fb)"];

const Banner = () => {
  const [showArrow, setShowArrow] = useState(false);
  const [ind, setInd] = useState(0);
  const { isMobile } = useIsMobile();
  const { Allproducts } = useAppSelector((st) => st.Allproducts);
  const categoryfn = useFilterCategory();
  const { setProducts } = useContext(productListContext);
  const filterStateFn = useFilterState();
  const { setParam, deleteParam } = useParams();

  const handleAddCategoryParam = (category: string) => {
    setParam("category", category);
    deleteParam("page");
    deleteParam("search");
    deleteParam("rate");
    deleteParam("featured products");
    deleteParam("price");
  };

  const handleCategory = (category: string) => {
    categoryfn({ variables: { category } }).then(({ data }) => {
      setProducts(data.filterBycatageory);
      handleAddCategoryParam(category);
    });
  };
  useEffect(() => {
    setTimeout(() => {
      setShowArrow(true);
    }, 1500);
  }, []);
  const handleState = (state: string) => {
    filterStateFn({ variables: { state } }).then(({ data }) => {
      setProducts(data.filterByState);
      setParam("featured products", state);
    });
  };
  const handleGetAllProducts = () => {
    setProducts(Allproducts);
  };

  useEffect(() => {
    document.documentElement.style.setProperty("--nav-btn", `${arrClrs[ind]}`);
    sessionStorage.setItem("banner-index", `${ind}`);
  }, [ind]);

  const bannerArr = [
    {
      image:
        "https://res.cloudinary.com/domobky11/image/upload/v1689516849/pngwing.com_1_jpjjnq.png",
      slogan: `feel the  difference with our collection. Our high quality items  are designed to exceed your expectations.`,
      button: "shop now",
      header: "Unlock Your Fashion Potential",
      to: "products",
      fn: () => handleGetAllProducts(),
    },
    {
      image:
        "https://res.cloudinary.com/domobky11/image/upload/v1689516668/kisspng-ranbir-kapoor-jeans-roy-t-shirt-denim-ranveer-kapoor-5b377a066ed380.816650471530362374454_adktpe.png", // header: "Elevate your wardrobe game",

      header: "Shop  latest fashion trends",
      slogan:
        "Stay Ahead of the Fashion Curve with Our Affordable  items .Look awesome Without Breaking the Bank.",
      button: "watch fashion",
      to: "products",
      fn: () => handleCategory("fashion"),
    },

    {
      image:
        "https://res.cloudinary.com/domobky11/image/upload/v1681711640/139536-using-smiling-laptop-girl-png-download-free_nfifxo.png",
      slogan:
        "Unlock Your Potential with High Performance Laptops and pcs. From lighweight ultrabooks to  gaming laptops.",
      button: "watch laptops",
      header: "Stay connected and Productive",
      to: "products",
      fn: () => handleCategory("laptops"),
    },

    {
      slogan:
        "Don't miss out on our limited time offer! Shop now and enjoy huge savings on our top items. From electronics to fashion,",

      header: "Save Big on Our Top Products",
      button: "watch Sales",
      image:
        "https://res.cloudinary.com/domobky11/image/upload/v1689515916/pngegg_3_oklao1.png",
      to: "products",
      fn: () => handleState("sale"),
    },
  ];

  const options: RefAttributes<SwiperRef> & SwiperProps = {
    loop: true,
    spaceBetween: 5,
    slidesPerView: 1,
    direction: "horizontal",
    pagination: { clickable: true },
    modules: [Pagination, Navigation],
    navigation: showArrow && !isMobile ? true : false,
    onSlideChange: (e: any) => setInd(e.realIndex),
  };
  return (
    <>
      <Swiper
        className="banner-par container "
        {...options}
        initialSlide={Number(sessionStorage.getItem("banner-index")) || 0}
      >
        <FadeElement cls="" delay={0.6}>
          <div className="custom-shape-divider-top-1691782077">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M741,116.23C291,117.43,0,27.57,0,6V120H1200V6C1200,27.93,1186.4,119.83,741,116.23Z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
        </FadeElement>
        {bannerArr.map((ob, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="banner ">
                <BannerText
                  clr={arrClrs[index]}
                  {...ob}
                  key={ob.header}
                  isShown={index === ind && showArrow}
                />
                <LazyLoadImage
                  src={ob.image}
                  alt={`banner proile`}
                  wrapperClassName="banner-image"
                  effect="blur"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Banner;
