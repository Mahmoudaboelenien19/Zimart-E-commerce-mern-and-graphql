import { isAuthContext } from "@/context/isAuth";
import { Authenticate_Query } from "@/graphql/mutations/user";
import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillWarning } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const { setIsAuth } = useContext(isAuthContext);
  const navigate = useNavigate();
  const [authenticate, { loading }] = useMutation(Authenticate_Query);

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

    if (res.data.authenticate.status === 404) {
      toast.error(res.data.authenticate.msg);
    } else if (res.data.authenticate.status === 200) {
      toast.success(res.data.authenticate.msg);
      setIsAuth(true);
      navigate("/");
    } else {
      toast(res.data.authenticate.msg, {
        icon: <AiFillWarning size={18} color="var(--star)" />,
      });
    }
  };
  return { handleLogIn, loading };
};

export default useLogin;
