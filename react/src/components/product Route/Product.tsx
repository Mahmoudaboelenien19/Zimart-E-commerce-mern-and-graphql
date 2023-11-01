import { createContext, useEffect, useState } from "react";
import ProductImages from "./images/images";
import ProductDetails from "./ProductDetails";
import Reviews from "./Review/Reviews";
import { useParams } from "react-router-dom";
import SLiderComponent from "../widgets/SLider";
import { OnDataOptions, useQuery, useSubscription } from "@apollo/client";
import { GET_Product_By_Id } from "@/graphql/general";
import { Single_Updated_Product_Subscription } from "@/graphql/mutations/product";
import { ProductInterface, reviewInterface } from "@/interfaces/product";
import { useAppSelector } from "@/custom/reduxTypes";
import { AnimatePresence, motion } from "framer-motion";
import useTitle from "@/custom/useTitle";

export interface productContextInterface extends ProductInterface {
  reviews: reviewInterface[];
  bigImgInd: number;
  setBigImgInd: React.Dispatch<React.SetStateAction<number>>;
}
export const productContext = createContext({} as productContextInterface);
export const Component = () => {
  const [ind, setInd] = useState(-1);
  const { Allproducts } = useAppSelector((st) => st.Allproducts);
  const [productData, setProductData] = useState({} as ProductInterface);
  const { id } = useParams();
  const [bigImgInd, setBigImgInd] = useState(0);
  const { data } = useQuery(GET_Product_By_Id, {
    variables: {
      id,
    },
  });

  //to catch  product changes
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
    if (Allproducts.length) {
      const index = Allproducts.findIndex((ob) => ob?._id === id);
      setInd(index);
      document.title = Allproducts[index]?.title;
    }
  }, [id]);

  useEffect(() => {
    if (ind === -1 && data?.product?._id) {
      document.title = data?.product?.title;
      setProductData(data?.product);
    }
  }, [data?.product?.title, ind]);

  const [showPop, setShowPop] = useState(false);

  if (productData?._id || ind >= 0) {
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
    } = ind === -1 ? productData : Allproducts[ind];

    return (
      <div className="product-par">
        {" "}
        <section className="product-page">
          {data?.product?._id ? (
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
              <ProductImages key={_id} />

              <ProductDetails key={`product-${_id}`} setShowPop={setShowPop} />
              <Reviews
                key={`review-${_id}`}
                setShowPop={setShowPop}
                bool={showPop}
              />
            </productContext.Provider>
          ) : (
            <>&lt; </>
          )}
        </section>
        <SLiderComponent />
      </div>
    );
  } else {
    return <>&lt;</>;
  }
};
