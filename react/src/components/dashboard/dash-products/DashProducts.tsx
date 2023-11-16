import ProductList from "@/components/Product/Products/ProductList/ProductList";
import useTitle from "@/custom/helpers/useTitle";

export const Component = () => {
  useTitle(" Dashboard | All Products");
  return (
    <div className={`product-list-par center gap `}>
      <ProductList />
    </div>
  );
};
