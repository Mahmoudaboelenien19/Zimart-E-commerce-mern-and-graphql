import useParams from "./useParams";
import useFilterByCategory from "./useFilterByCategory";

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
  const bannerArr = [
    {
      image:
        "https://res.cloudinary.com/domobky11/image/upload/v1689516849/pngwing.com_1_jpjjnq.png",
      slogan: `feel the  difference with our collection. Our high quality items  are designed to exceed your expectations.`,
      button: "shop now",
      header: "Emancipate Your Fashion Potential. !",
      to: "products",
      fn: () => handleGetAllProducts(),
    },

    {
      image:
        "https://res.cloudinary.com/domobky11/image/upload/v1689516668/kisspng-ranbir-kapoor-jeans-roy-t-shirt-denim-ranveer-kapoor-5b377a066ed380.816650471530362374454_adktpe.png", // header: "Elevate your wardrobe game",

      header: "watch what's trending now. !",
      slogan:
        "Stay Ahead of the Fashion Curve with Our Affordable  items .Look awesome Without Breaking the Bank.",
      button: "watch fashion",
      to: "products",
      fn: () => handleCategoryFiltering("fashion"),
    },

    {
      image:
        "https://res.cloudinary.com/domobky11/image/upload/v1681711640/139536-using-smiling-laptop-girl-png-download-free_nfifxo.png",
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
      image:
        "https://res.cloudinary.com/domobky11/image/upload/v1689515916/pngegg_3_oklao1.png",
      to: "products",
      fn: () => handleCategoryFiltering("sale", ""),
    },
  ];
  return bannerArr;
};

export default useBuildBannerArr;
