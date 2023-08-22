import React, { createContext, useEffect, useState } from "react";
import ProductImages from "./images/images";
import ProductDetails from "./ProductDetails";
import Reviews from "./Review/Reviews";
import { ProductInterface, reviewInterface } from "../../interfaces/product";
import { AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import Animation from "../widgets/animation/Animation";
import { useAppSelector } from "../../custom/reduxTypes";

import GridLoader from "../widgets/loaders/GridLoader";
import SLiderComponent from "../widgets/SLider";

export interface productContextInterface extends ProductInterface {
  reviews: reviewInterface[];
  bigImgInd: number;
  setBigImgInd: React.Dispatch<React.SetStateAction<number>>;
}
export const productContext = createContext({} as productContextInterface);

const Product = () => {
  const { id } = useParams();
  const [bigImgInd, setBigImgInd] = useState(0);

  const [singleProduct, setSingleProduct] = useState<ProductInterface>(
    {} as ProductInterface
  );
  const { Allproducts } = useAppSelector((st) => st.Allproducts);

  useEffect(() => {
    if (singleProduct._id) {
      document.title = singleProduct.title;
    }
  }, [singleProduct._id]);
  useEffect(() => {
    if (Allproducts?.length >= 1) {
      const pro = Allproducts.find(
        (product: ProductInterface) => product._id === id
      );
      setSingleProduct(pro as ProductInterface);
    }
  }, [Allproducts]);

  const [showPop, setShowPop] = useState(false);

  if (singleProduct?._id !== "") {
    const {
      images,
      _id,
      title,
      description,
      state,
      category,
      stock,
      price,
      rating,
      reviews,
      createdAt,
    } = singleProduct;

    return (
      <Animation>
        {singleProduct && (
          <productContext.Provider
            value={{
              setBigImgInd,
              _id,
              title,
              rating,
              reviews,
              images,
              bigImgInd,
              price,
              description,
              category,
              stock,
              createdAt,
              state,
            }}
          >
            <section className="product-page">
              <ProductImages key={_id} />

              <ProductDetails key={`product-${_id}`} setShowPop={setShowPop} />
              <Reviews
                key={`review-${_id}`}
                setShowPop={setShowPop}
                bool={showPop}
              />
            </section>
          </productContext.Provider>
        )}
        <SLiderComponent />
      </Animation>
    );
  } else {
    return <GridLoader cls="loading center" />;
  }
};

export default Product;
