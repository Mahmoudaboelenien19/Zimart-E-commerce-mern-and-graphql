import React, { useContext, useEffect } from "react";

import { useForm, FormProvider, FieldValues } from "react-hook-form";

import Input from "../widgets/Input";
import { useMutation } from "@apollo/client";
import { Authenticate_Query } from "../../graphql/mutations/user";
import OpacityBtn from "../widgets/OpacityBtn";
import { toast } from "react-hot-toast";
import { isAuthContext } from "../../context/isAuth";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import Animation from "../widgets/Animation";
import LogInWithGoogle from "./LogInWithGoogle";
import FormAnimation from "../widgets/FormAnimation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiFillWarning } from "react-icons/ai";
const Login = () => {
  useEffect(() => {
    document.title = "Zimart | login";
  }, []);

  const schema = yup.object().shape({
    email: yup.string().email("insert a valid email").required(),
    password: yup.string().required(),
  });
  const navigate = useNavigate();
  const methods = useForm({ resolver: yupResolver(schema) });
  const {
    formState: { errors },
    handleSubmit,
    getValues,
  } = methods;

  const { setIsAuth, isAuth } = useContext(isAuthContext);

  const [authenticate] = useMutation(Authenticate_Query);
  const handleLogIn = async () => {
    const { email, password } = getValues();
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
        icon: <AiFillWarning fontSize={18} color="var(--star)" />,
      });
    }
  };
  const onSubmit = (data: FieldValues) => {
    console.log(data);
    handleLogIn();
  };

  if (isAuth) {
    return <Navigate to={"/"} />;
  }

  return (
    <Animation>
      <div className="log-in center">
        <FormProvider {...methods}>
          <FormAnimation fn={handleSubmit(onSubmit)} cls="center">
            <h2 className="underline header ">Log in</h2>
            <Input
              placeholder={"email"}
              err={errors.email?.message?.toString()}
              defaultVal={
                new URLSearchParams(window.location.search).get("email") || ""
              }
            />
            <Input
              placeholder={"password"}
              err={errors.password?.message?.toString()}
              type={"password"}
            />

            <OpacityBtn
              cls="btn main w-80"
              parCls="w-100"
              fn={() => null}
              btn="log In"
              type="submit"
            />

            <div className="redirect">
              <span> don&#39;t have an account</span>
              <NavLink to="/signup">sign up</NavLink>
            </div>

            <div className="or center">
              <span>or</span>
            </div>
            <LogInWithGoogle />
          </FormAnimation>
        </FormProvider>
      </div>
    </Animation>
  );
};

export default Login;
