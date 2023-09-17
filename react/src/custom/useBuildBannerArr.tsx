import { productListContext } from "@/context/FilterData";
import { useContext } from "react";
import { useAppSelector } from "./reduxTypes";
import useFilterState from "./useFIlterState";
import useFilterCategory from "./useFilterCategory";
import useParams from "./useParams";

const useBuildBannerArr = () => {
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

  const handleState = (state: string) => {
    filterStateFn({ variables: { state } }).then(({ data }) => {
      setProducts(data.filterByState);
      setParam("featured products", state);
    });
  };
  const handleCategory = (category: string) => {
    categoryfn({ variables: { category } }).then(({ data }) => {
      setProducts(data.filterBycatageory);
      handleAddCategoryParam(category);
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
  return bannerArr;
};

export default useBuildBannerArr;
