import DashForm from "./DashForm";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { update_Product } from "@/graphql/mutations/product";
import { GET_Product_By_Id } from "@/graphql/general";
import useTitle from "@/custom/helpers/useTitle";

export const Component = () => {
  const { id } = useParams();

  const { data } = useQuery(GET_Product_By_Id, {
    variables: { id },
  });
  const [updateProductFn] = useMutation(update_Product);

  useTitle("Dashboaed | Update Product");
  if (data?.product) {
    return (
      <DashForm
        btn="update"
        head="Update Product"
        id={id}
        type="update"
        obj={data.product}
        fn={updateProductFn}
        key="update-dash-form"
      />
    );
  } else return <></>;
};
