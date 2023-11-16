import DashForm from "./DashForm";
import { useMutation } from "@apollo/client";
import { Add_Product } from "@/graphql/mutations/product";
import useTitle from "@/custom/helpers/useTitle";

export const Component = () => {
  const [addProductFn] = useMutation(Add_Product);
  useTitle("Dashboaed | Add Product");

  return (
    <DashForm
      key={"addProduct"}
      head="add product"
      fn={addProductFn}
      btn="add"
      type="add"
    />
  );
};
