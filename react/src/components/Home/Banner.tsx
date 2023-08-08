import React, { useContext, useEffect, useRef } from "react";
import useFilterCategory from "../../custom/useFilterCategory";
import { productListContext } from "../../context/FilterData";
import useFilterState from "../../custom/useFIlterState";
import BannerText from "./BannerText";
import { useAppSelector } from "../../custom/reduxTypes";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import FadeElement from "../widgets/FadeElement";

const arrClrs = ["var(--gmail)", "var(--delete)", "var(--fb)", "var(--green)"];

const Banner = () => {
  const settings = {
    slidesToScroll: 1,
    slidesToShow: 1,
    ease: "esaeInOut",
    dots: true,
    infinite: true,
    speed: 1000,
    initialSlide: -5,
  };
  const { Allproducts } = useAppSelector((st) => st.Allproducts);
  const categoryfn = useFilterCategory();
  const { setProducts, setCategoryFilter } = useContext(productListContext);

  const filterStateFn = useFilterState();
  const sliderRef = useRef<null | Slider>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      sliderRef?.current?.slickNext();
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  const handleCategory = (category: string) => {
    categoryfn({ variables: { category } }).then(({ data }) => {
      setProducts(data.filterBycatageory);
      setCategoryFilter(category);
    });
  };

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

  return (
    <>
      <Slider
        ref={sliderRef}
        {...settings}
        lazyLoad="ondemand"
        className="banner-par "
        dotsClass="slick-dots banner-dot"
        dots
        waitForAnimate
        arrows={false}
      >
        {bannerArr.map((ob, index) => {
          return (
            <div className="banner " key={index}>
              <BannerText clr={arrClrs[index]} {...ob} key={ob.header} />
              <div className="banner-image  ">
                <FadeElement delay={1.7} cls="">
                  <LazyLoadImage
                    src={ob.image}
                    alt={`banner proile`}
                    effect="blur"
                    width={"fit-content"}
                    height={350}
                    style={{ marginTop: -5, overflow: "visible" }}
                  />
                  {/* <img src={image} alt={`banner proile`} /> */}
                </FadeElement>
              </div>
            </div>
          );
        })}
      </Slider>
      <FadeElement cls="" delay={0.1}>
        <div className="background"></div>
      </FadeElement>
    </>
  );
};

export default Banner;
