import { toast } from "react-hot-toast";
import { useAppDispatch } from "../helpers/reduxTypes";
import { useMutation } from "@apollo/client";
import { update_Order } from "../../graphql/mutations/order";
import { updateOrderRedux } from "@/redux/orderSlice";

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
        toast.success(res?.data?.updateOrder?.msg);
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
