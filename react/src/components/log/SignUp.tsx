import React, { useState, useEffect } from "react";

import { motion } from "framer-motion";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { useMutation } from "@apollo/client";
import Input from "../widgets/Input";
import { ADD_USER } from "../../graphql/mutations/user";
import { NavLink, useNavigate } from "react-router-dom";
import OpacityBtn from "../widgets/OpacityBtn";
import { toast } from "react-hot-toast";
import { AiFillWarning } from "react-icons/ai";
import SelectCOuntry from "../user/SelectCOuntry";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormSchema from "../../custom/useFormSchema";
import Animation from "../widgets/Animation";
import LogInWithGoogle from "./LogInWithGoogle";
import FormAnimation from "../widgets/FormAnimation";
interface oAuthInterface {
  email: string;
  image: string;
  name: string;
}

const SignUp = () => {
  const { schema } = useFormSchema();
  const methods = useForm({ resolver: yupResolver(schema) });
  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods;
  const OnSubmit = (data: FieldValues) => {
    console.log(data);
    handleSignUp();
  };

  const [userObj, setUserObj] = useState({} as oAuthInterface);

  useEffect(() => {
    const url = window.location.href;
    const urlObj = new URL(url);
    const searchParams = new URLSearchParams(urlObj.search);
    const userString = searchParams.get("user");
    const userObj = userString
      ? JSON.parse(decodeURIComponent(userString))
      : null;
    setUserObj(userObj);
  }, []);

  const navigate = useNavigate();
  const [addUserFn] = useMutation(ADD_USER);
  const [country, setCountry] = useState("egypt");

  const handleSignUp = async () => {
    const { name, password, email } = getValues();

    const { data } = await addUserFn({
      variables: {
        input: {
          name,
          password,
          email,
          country,
          image: userObj?.image || "",
        },
      },
    });
    if (data.addUser.status === 200) {
      navigate("/login");
      toast.success(data.addUser.msg);
    } else {
      toast(data.addUser.msg, {
        icon: <AiFillWarning fontSize={18} color="var(--star)" />,
      });
    }
  };
  return (
    <Animation addIntialX={false}>
      <motion.div className="log-in center">
        <FormProvider {...methods}>
          <FormAnimation fn={handleSubmit(OnSubmit)} cls="center">
            <h2
              className="underline header white"
              style={{ color: "var(--white)" }}
            >
              {" "}
              sign Up
            </h2>
            <Input
              placeholder={"name"}
              err={errors?.name?.message?.toString()}
              defaultVal={userObj?.name || ""}
            />
            <Input
              placeholder={"email"}
              defaultVal={userObj?.email || ""}
              err={errors?.email?.message?.toString()}
            />{" "}
            <Input
              placeholder={"password"}
              err={errors?.password?.message?.toString()}
              type="password"
            />
            <Input
              placeholder={"confirm"}
              err={errors?.confirm?.message?.toString()}
              type="password"
            />
            <SelectCOuntry setCountry={setCountry} country={country} />
            <OpacityBtn btn="sign up" cls="btn main" fn={() => null} />
            <div className="redirect">
              <span> have an account</span>
              <NavLink to="/login">log in</NavLink>
            </div>
            <div className="or center">
              <span>or </span>
            </div>
            <LogInWithGoogle type="sign" />
          </FormAnimation>
        </FormProvider>
      </motion.div>
    </Animation>
  );
};

export default SignUp;
