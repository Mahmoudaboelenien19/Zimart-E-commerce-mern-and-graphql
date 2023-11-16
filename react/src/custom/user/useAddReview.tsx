import { useMutation } from "@apollo/client";
import { addReview } from "../../graphql/mutations/user";
import { Review } from "../../types/product";

const useAddReview = (obj: Omit<Review, "image" | "userData">) => {
  const [fn, { loading }] = useMutation(addReview, {
    variables: { input: obj },
  });

  return [fn, loading];
};

export default useAddReview;
