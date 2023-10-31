import { useMutation } from "@apollo/client";
import { addReview } from "../graphql/mutations/user";
import { reviewInterface } from "../interfaces/product";

const useAddReview = (obj: reviewInterface) => {
  const [fn] = useMutation(addReview, { variables: { input: obj } });

  return [fn];
};

export default useAddReview;
