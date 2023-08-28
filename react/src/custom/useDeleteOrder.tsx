import { toast } from "react-hot-toast";
import { removeFromOrderRedux } from "../redux/OrderSlice";
import { useAppDispatch } from "./reduxTypes";
import { Remove_Order } from "../graphql/mutations/order";
import { useMutation } from "@apollo/client";

const useDeleteOrder = (arr: string[]) => {
  const dispatch = useAppDispatch();
  const [deleteOrder] = useMutation(Remove_Order);
  const handleDeleteOrder = async () => {
    try {
      const res = await deleteOrder({
        variables: { _id: arr },
      });
      if (res?.data?.deleteOrder?.msg) {
        dispatch(removeFromOrderRedux(arr));
        toast.success(res.data.deleteOrder.msg);
      }
    } catch (err: unknown) {
      if ((err as Error).message === "Not Authorised!") {
        toast.error("lyou aren't an admin");
      }
    }
  };

  return { handleDeleteOrder };
};

export default useDeleteOrder;
