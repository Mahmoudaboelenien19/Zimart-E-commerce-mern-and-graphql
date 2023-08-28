import React, { createContext, useEffect, useState } from "react";
import ProductImages from "./images/images";
import ProductDetails from "./ProductDetails";
import Reviews from "./Review/Reviews";
import { ProductInterface, reviewInterface } from "../../interfaces/product";
import { useParams } from "react-router-dom";
import Animation from "../widgets/animation/Animation";

import GridLoader from "../widgets/loaders/GridLoader";
import SLiderComponent from "../widgets/SLider";
import { GET_Product_By_Id } from "../../graphql/general";
import { OnDataOptions, useQuery, useSubscription } from "@apollo/client";
import { Single_Updated_Product_Subscription } from "../../graphql/mutations/product";

export interface productContextInterface extends ProductInterface {
  reviews: reviewInterface[];
  bigImgInd: number;
  setBigImgInd: React.Dispatch<React.SetStateAction<number>>;
}
export const productContext = createContext({} as productContextInterface);

const Product = () => {
  const [productData, setProductData] = useState({} as ProductInterface);
  const { id } = useParams();
  const [bigImgInd, setBigImgInd] = useState(0);
  const { data } = useQuery(GET_Product_By_Id, {
    variables: {
      id,
    },
  });
  useSubscription(Single_Updated_Product_Subscription, {
    onData: (
      data: OnDataOptions<{ singleProductUpdate: ProductInterface }>
    ) => {
      setProductData(data?.data?.data?.singleProductUpdate as ProductInterface);
    },
    variables: {
      id,
    },
  });
  useEffect(() => {
    if (data?.product?._id) {
      document.title = data?.product?._id;

      setProductData(data?.product);
    }
  }, [data?.product]);

  const [showPop, setShowPop] = useState(false);

  if (productData?._id) {
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
    } = productData;

    return (
      <Animation>
        {data?.product && (
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
