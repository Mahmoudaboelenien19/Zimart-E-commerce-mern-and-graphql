import { useMutation } from "@apollo/client";
import { LogOut_Mutation } from "../../graphql/mutations/user";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../helpers/reduxTypes";
import { clearCart } from "../../redux/cartSlice";
import { clearAllFav } from "../../redux/favSlice";
import { clearNotificationRedux } from "../../redux/notificationsSlice";
import { clearCompare } from "../../redux/compareSlice";
import { updateUserData, userInitialState } from "@/redux/userDataSlice";
import { setIsAuth, updateUserId } from "@/redux/Auth";

const useLogOut = () => {
  const { userId } = useAppSelector((st) => st.isAuth);

  const dispatch = useAppDispatch();
  const [fn] = useMutation(LogOut_Mutation);
  const navigate = useNavigate();
  const handleLogOut = async () => {
    const { data } = await fn({
      variables: {
        lastLogIn: new Date().toISOString(),
        _id: userId,
      },
      context: {
        credentials: "include",
      },
    });
    if (data?.logOut?.msg) {
      dispatch(updateUserData(userInitialState));
      dispatch(updateUserId(""));

      toast.success(data?.logOut.msg);
      dispatch(setIsAuth(false));
      dispatch(clearCart());
      dispatch(clearAllFav());
      dispatch(clearNotificationRedux());
      dispatch(clearCompare());
      navigate("/");
    }
  };

  return { handleLogOut };
};

export default useLogOut;
