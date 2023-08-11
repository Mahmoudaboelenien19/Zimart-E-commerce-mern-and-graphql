import React, { createContext, useEffect, useState } from "react";
import ProductImages from "./images";
import ProductDetails from "./ProductDetails";
import Reviews from "./Reviews";
import { ProductInterface, reviewInterface } from "../../interfaces/product";
import { AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import Animation from "../widgets/Animation";
import { useAppSelector } from "../../custom/reduxTypes";
import ContinueShopping from "../widgets/ContinueShopping";
import SLiderComponent from "../widgets/SLider";

export interface productContextInterface extends ProductInterface {
  reviews: reviewInterface[];
  bigImgInd: number;
  startHover: boolean;
  setStartHover: React.Dispatch<React.SetStateAction<boolean>>;
}
export const productContext = createContext({} as productContextInterface);

const Product = () => {
  const { id } = useParams();
  const [bigImgInd, setBigImgInd] = useState(0);
  const [startHover, setStartHover] = useState(false);

  const [singleProduct, setSingleProduct] = useState<any>({ _id: "" });
  const { Allproducts } = useAppSelector((st) => st.Allproducts);

  useEffect(() => {
    if (singleProduct._id) {
      document.title = singleProduct.title;
    }
  }, [singleProduct._id]);
  useEffect(() => {
    if (Allproducts?.length >= 1) {
      const pro = Allproducts.find((product: any) => product._id === id);
      setSingleProduct(pro);
    }
  }, [Allproducts]);

  const [showPop, setShowPop] = useState(false);

  if (singleProduct?._id !== "") {
    const {
      images,
      _id,
      title,
      description,
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
              startHover,
              setStartHover,
              createdAt,
            }}
          >
            <ContinueShopping />
            <section className="product-page">
              <ProductImages
                key={_id}
                data={{
                  images,
                  bigImgInd,
                  setBigImgInd,
                }}
              />

              <ProductDetails key={`product-${_id}`} setShowPop={setShowPop} />
              <AnimatePresence mode="wait">
                {showPop && (
                  <Reviews key={`review-${_id}`} setShowPop={setShowPop} />
                )}
              </AnimatePresence>
            </section>
          </productContext.Provider>
        )}
        <SLiderComponent />
      </Animation>
    );
  } else {
    return <> loading</>;
  }
};

export default Product;
