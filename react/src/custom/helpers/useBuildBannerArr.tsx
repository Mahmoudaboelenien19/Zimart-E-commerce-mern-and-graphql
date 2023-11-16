import useParams from "./useParams";
import useFilterByCategory from "../product/useFilterByCategory";
import { useMemo } from "react";

const useBuildBannerArr = () => {
  const { setParam, deleteParam } = useParams();
  const { handleCategoryFiltering } = useFilterByCategory();

  const handleGetAllProducts = () => {
    setParam("sort", "relevance");
    deleteParam("search");
    deleteParam("isFilterApplied");
    deleteParam("catFilter");
    deleteParam("page");
  };
  const bannerArr = useMemo(
    () => [
      {
        // image:
        //   "https://res.cloudinary.com/domobky11/image/upload/v1689516849/pngwing.com_1_jpjjnq.png",
        slogan: `feel the  difference with our collection. Our high quality items  are designed to exceed your expectations.`,
        image:
          "https://res.cloudinary.com/domobky11/image/upload/v1699610690/hero_image_nftsnf.png",
        button: "shop now",
        header: "Emancipate Your Fashion Potential. !",
        to: "products",
        fn: () => handleGetAllProducts(),
      },

      {
        // image:
        //   "https://res.cloudinary.com/domobky11/image/upload/v1689516668/kisspng-ranbir-kapoor-jeans-roy-t-shirt-denim-ranveer-kapoor-5b377a066ed380.816650471530362374454_adktpe.png", // header: "Elevate your wardrobe game",
        image:
          "https://res.cloudinary.com/domobky11/image/upload/v1699756386/pngegg_4_do7dce.png",
        header: "watch what's trending now. !",
        slogan:
          "Stay Ahead of the Fashion Curve with Our Affordable  items .Look awesome Without Breaking the Bank.",
        button: "watch fashion",
        to: "products",
        fn: () => handleCategoryFiltering("fashion"),
      },

      {
        image:
          "https://res.cloudinary.com/domobky11/image/upload/v1699756951/pngegg_5_yhfxzl.png",
        slogan:
          "Unlock Your Potential with High Performance Laptops and pcs. From lighweight ultrabooks to  gaming laptops.",
        button: "watch laptops",
        header: "upercharge Your Work Productivity. !",
        to: "products",
        fn: () => handleCategoryFiltering("laptops"),
      },

      {
        slogan:
          "Don't miss out on our limited time offer! Shop now and enjoy huge savings on our top items. From electronics to fashion.",

        header: "Unrestraint Your Fashion Style. ! ",
        button: "watch Sales",
        // image:
        //   "https://res.cloudinary.com/domobky11/image/upload/v1689515916/pngegg_3_oklao1.png",
        image:
          "https://res.cloudinary.com/domobky11/image/upload/v1699755547/pngegg_2_t76jly.png",
        to: "products",
        fn: () => handleCategoryFiltering("sale", ""),
      },
    ],
    []
  );
  return bannerArr;
};

export default useBuildBannerArr;
