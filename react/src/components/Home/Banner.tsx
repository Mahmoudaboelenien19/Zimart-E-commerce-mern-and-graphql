import React, { RefAttributes, useContext, useEffect, useState } from "react";
import useFilterCategory from "../../custom/useFilterCategory";
import { productListContext } from "../../context/FilterData";
import useFilterState from "../../custom/useFIlterState";
import BannerText from "./BannerText";
import { useAppSelector } from "../../custom/reduxTypes";

import { LazyLoadImage } from "react-lazy-load-image-component";

import FadeElement from "../widgets/FadeElement";
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const arrClrs = ["var(--gmail)", "var(--delete)", "var(--fb)", "var(--green)"];

const Banner = () => {
  const [showArrow, setShowArrow] = useState(false);
  const [ind, setInd] = useState(0);
  const { Allproducts } = useAppSelector((st) => st.Allproducts);
  const categoryfn = useFilterCategory();

  const { setProducts, setCategoryFilter } = useContext(productListContext);

  const filterStateFn = useFilterState();

  const handleCategory = (category: string) => {
    categoryfn({ variables: { category } }).then(({ data }) => {
      setProducts(data.filterBycatageory);
      setCategoryFilter(category);
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
      setCategoryFilter(state);
    });
  };
  const handleGetAllProducts = () => {
    setProducts(Allproducts);
  };

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
    navigation: showArrow ? true : false,
    onSlideChange: (e: any) => setInd(e.realIndex),
  };
  return (
    <>
      <Swiper className="banner-par " {...options}>
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
                <div className="banner-image  ">
                  <LazyLoadImage
                    src={ob.image}
                    alt={`banner proile`}
                    effect="blur"
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Banner;
