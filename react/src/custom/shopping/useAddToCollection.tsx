import { useMutation } from "@apollo/client";
import { ADD_TO_SHOPING_COLLECTION } from "../../graphql/mutations/user";
import { toast } from "react-hot-toast";
import { useAppSelector } from "../helpers/reduxTypes";

const useAddToCollection = (id: string, target: string) => {
  const { userId } = useAppSelector((st) => st.isAuth);
  const [fn, { loading }] = useMutation(ADD_TO_SHOPING_COLLECTION);
  const handleAddToCollection = async () => {
    try {
      const res = await fn({
        variables: { input: { id, userId, target } },
      });

      toast.success(res?.data.addToShoppingCollection?.msg);
      return res?.data.addToShoppingCollection.status;
    } catch (err: unknown) {
      if ((err as Error).message === "Not Authorised!") {
        toast.error("login please !");
      }
    }
  };

  return { handleAddToCollection, loading };
};

export default useAddToCollection;
