import { useMutation } from "@apollo/client";
import { LogOut_Mutation } from "../graphql/mutations/user";
import { useContext } from "react";
import { isAuthContext } from "../context/isAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./reduxTypes";
import { clearCart } from "../redux/cartSlice";
import { clearAllFav } from "../redux/favSlice";
import { clearNotificationRedux } from "../redux/notificationsSlice";
import { clearCompare } from "../redux/compareSlice";

const useLogOut = () => {
  const { setIsAuth, userId, setUserData } = useContext(isAuthContext);
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
    if (data?.logOut.msg) {
      toast.success(data?.logOut.msg);
      navigate("/login");
      setIsAuth(false);
      setUserData({
        _id: "",
        email: "",
        name: "",
        fav: [],
        cart: [],
        compare: [],
        notificatins: [],
        country: "",
        phone: "",
        role: "",
        image: "",
      });
      dispatch(clearCart());
      dispatch(clearAllFav());
      dispatch(clearNotificationRedux());
    }
    dispatch(clearCompare());
  };

  return { handleLogOut };
};

export default useLogOut;
