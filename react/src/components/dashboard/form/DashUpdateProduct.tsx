import { useEffect } from "react";
import DashForm from "./DashForm";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { update_Product } from "@/graphql/mutations/product";
import { GET_Product_By_Id } from "@/graphql/general";

export const Component = () => {
  const { id } = useParams();

  const { data } = useQuery(GET_Product_By_Id, {
    variables: { id },
  });
  const [updateProductFn, { loading }] = useMutation(update_Product);

  useEffect(() => {
    document.title = "Dashboaed | Update Product";
  }, []);

  // console.log("dash update ", data?.product);
  if (data?.product) {
    return (
      <>
        <DashForm
          btn="update"
          head="Update Product"
          id={id}
          type="update"
          obj={data.product}
          fn={updateProductFn}
          key="update-dash-form"
          // loading={Boolean(loading)}
        />
      </>
    );
  } else return <></>;
};
