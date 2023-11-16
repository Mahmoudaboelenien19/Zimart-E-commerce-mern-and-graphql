import { useAppSelector } from "../helpers/reduxTypes";
import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";
import { REMOVE_FROM_SHOPING_COLLECTION } from "@/graphql/mutations/user";

const useRemoveFromCollection = (id: string, target: string) => {
  const [fn] = useMutation(REMOVE_FROM_SHOPING_COLLECTION);
  const { userId } = useAppSelector((st) => st.isAuth);

  const handleRemoveFromCollection = async () => {
    const res = await fn({
      variables: {
        input: {
          userId,
          id,
          target,
        },
      },
    });
    if (res?.data?.removeFromShoppingCollection?.msg) {
      toast.success(res?.data?.removeFromShoppingCollection.msg);
      return res?.data?.removeFromShoppingCollection.status;
    }
  };
  return { handleRemoveFromCollection };
};

export default useRemoveFromCollection;
