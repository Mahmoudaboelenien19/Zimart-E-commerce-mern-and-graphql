import { toast } from "react-hot-toast";
import { updateOrderRedux } from "../redux/OrderSlice";
import { useAppDispatch } from "./reduxTypes";
import { useMutation } from "@apollo/client";
import { update_Order } from "../graphql/mutations/order";

const useUpdateOrder = () => {
  const date = () => new Date();
  const dispatch = useAppDispatch();
  const [updateOrder] = useMutation(update_Order);
  const handleUpdateOrder = async (id: string, state: string) => {
    try {
      const res = await updateOrder({
        variables: {
          input: {
            _id: id,
            state,
            deliveredAt: state === "delivered" ? date() : null,
          },
        },
      });
      if (res?.data?.updateOrder?.msg) {
        dispatch(
          updateOrderRedux({
            id,
            state,
          })
        );
        toast.success((await res).data.updateOrder.msg);
      }
    } catch (err: unknown) {
      if ((err as Error).message === "Not Authorised!") {
        toast.error("you aren't an admin");
      }
    }
  };

  return { handleUpdateOrder };
};

export default useUpdateOrder;
