import ProductCard from "./ProductCard/ProductCard";
import { Product } from "@/types/product";
import Pages from "../../../widgets/shared/Pages";
import ProductListWrapper from "./ProductListWraper";
import NoData from "@/components/widgets/NoData";
import { useAppSelector } from "@/custom/helpers/reduxTypes";
import useParams from "@/custom/helpers/useParams";
import { ScrollRestoration } from "react-router-dom";
const ProductList = () => {
  const { Allproducts, totalProducts } = useAppSelector((st) => st.Allproducts);
  const { page } = useParams();
  return (
    <ProductListWrapper>
      {Allproducts?.length !== 0 ? (
        <>
          <>
            {Allproducts?.map((product: Product, index: number) => (
              <ProductCard
                {...product}
                key={product?._id ? `${product?._id}-list` : index}
              />
            ))}
          </>{" "}
          <Pages
            to="products"
            key="pages"
            page={Number(page)}
            total={totalProducts}
          />
        </>
      ) : (
        <NoData message="No Products Found" className="nodata-products" />
      )}
    </ProductListWrapper>
  );
};

export default ProductList;
