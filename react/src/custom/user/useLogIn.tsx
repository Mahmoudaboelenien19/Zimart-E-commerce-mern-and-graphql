import { Authenticate_Query } from "@/graphql/mutations/user";
import { useMutation } from "@apollo/client";
import { FieldValues } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillWarning } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../helpers/reduxTypes";
import { updateUserData } from "@/redux/userDataSlice";
import { setIsAuth, updateUserId } from "@/redux/Auth";

const useLogin = () => {
  const navigate = useNavigate();
  const [authenticate, { loading }] = useMutation(Authenticate_Query);

  const dispatch = useAppDispatch();
  const handleLogIn = async (data: FieldValues) => {
    const { email, password } = data;
    const res = await authenticate({
      variables: {
        email,
        password,
      },
      context: {
        credentials: "include",
      },
    });
    const { id, msg, status } = res.data.authenticate;
    if (status === 404) {
      toast.error(msg);
    } else if (status === 200) {
      toast.success(msg);
      dispatch(setIsAuth(true));
      dispatch(updateUserId(id));
      navigate("/");
    } else {
      toast(msg, {
        icon: <AiFillWarning size={18} color="var(--star)" />,
      });
    }
  };
  return { handleLogIn, loading };
};

export default useLogin;
