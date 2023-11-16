import { ADD_USER } from "@/graphql/mutations/user";
import { useMutation } from "@apollo/client";
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillWarning } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useParams from "../helpers/useParams";

const useSignUp = () => {
  const { getParam } = useParams();

  const navigate = useNavigate();
  const [addUserFn, { loading }] = useMutation(ADD_USER);
  const handleSignUp = async (user: FieldValues, country: string) => {
    const { name, password, email } = user;

    const { data } = await addUserFn({
      variables: {
        input: {
          name,
          password,
          email,
          country,
          image: getParam("image") || "",
        },
      },
    });

    if (data.addUser.status === 200) {
      navigate(`/login?email=` + email);
      toast.success(data.addUser.msg);
    } else {
      toast(data.addUser.msg, {
        icon: <AiFillWarning fontSize={18} color="var(--star)" />,
      });
    }
  };

  return { loading, handleSignUp };
};

export default useSignUp;
