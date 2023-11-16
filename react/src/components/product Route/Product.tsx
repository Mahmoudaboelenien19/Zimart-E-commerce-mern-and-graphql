import { useEffect, useState } from "react";
import ProductImages from "./images/images";
import ProductDetails from "./ProductDetails";
import { useParams } from "react-router-dom";
import SLiderComponent from "../widgets/SLider";
import { OnDataOptions, useLazyQuery, useSubscription } from "@apollo/client";
import { GET_Product_By_Id } from "@/graphql/general";
import { Single_Updated_Product_Subscription } from "@/graphql/mutations/product";
import { Product } from "@/types/product";
import { useAppSelector } from "@/custom/helpers/reduxTypes";

export const Component = () => {
  const { Allproducts = [] } = useAppSelector((st) => st.Allproducts);

  const [productData, setProductData] = useState<Product | null>(null);
  const { id } = useParams();
  const [getProductData] = useLazyQuery(GET_Product_By_Id, {
    variables: {
      id,
    },
  });
  console.log({ id });
  //to catch  product changes
  useSubscription(Single_Updated_Product_Subscription, {
    onData: (data: OnDataOptions<{ singleProductUpdate: Product }>) => {
      setProductData(data?.data?.data?.singleProductUpdate as Product);
    },
    variables: {
      id,
    },
  });

  const index = Allproducts.findIndex((ob) => ob?._id === id);
  useEffect(() => {
    if (index === -1) {
      getProductData().then(({ data }) => {
        setProductData(data.product);
        document.title = data.product.title;
      });
    } else {
      //this is important as if user clicks a product from slider it shows same product
      setProductData(null);
      document.title = Allproducts[index]?.title;
      return;
    }
  }, [id, productData]);

  const { images = [], _id = "" } = productData || Allproducts[index] || {};
  const productObj = productData || Allproducts[index] || {};
  return (
    <div className="product-par">
      <section className="product-page">
        {images.length >= 1 && (
          <ProductImages _id={id || ""} key={_id} images={images} />
        )}

        {images.length >= 1 && (
          <ProductDetails key={`product-${_id}`} {...productObj} />
        )}
      </section>
      <SLiderComponent />
    </div>
  );
};
// };
