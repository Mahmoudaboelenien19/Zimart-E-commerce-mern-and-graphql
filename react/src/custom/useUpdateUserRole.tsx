import { useMutation } from "@apollo/client";
import { Update_User_ROle } from "../graphql/mutations/user";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "./reduxTypes";
import { updateUserRedux } from "@/redux/userSlice";

const useUpdateUserRole = () => {
  const [fn] = useMutation(Update_User_ROle);

  const dispatch = useAppDispatch();
  const handleUpdateUserRole = async (_id: string, role: string) => {
    try {
      const res = await fn({
        variables: {
          _id,
          role,
        },
      });
      if (await res?.data.updateUserRole?.msg) {
        dispatch(updateUserRedux({ role, _id }));
        toast.success(res?.data.updateUserRole?.msg);
      }
    } catch (err: unknown) {
      if ((err as Error).message === "Not Authorised!") {
        toast.error("you aren't an admin");
      }
    }
  };
  return { handleUpdateUserRole };
};

export default useUpdateUserRole;
