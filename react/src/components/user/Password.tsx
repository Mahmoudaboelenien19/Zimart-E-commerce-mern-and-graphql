import React, { useState, useContext, useEffect } from "react";
import OpacityBtn from "../widgets/OpacityBtn";
import { GrUpdate } from "react-icons/gr";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Input from "../widgets/Input";
import { isAuthContext } from "../../context/isAuth";
import SlideButton from "../widgets/SlideButton";
import { AnimatePresence } from "framer-motion";
import { useMutation } from "@apollo/client";
import { Update_Pass } from "../../graphql/mutations/user";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";

const Password = () => {
  const { userId } = useContext(isAuthContext);

  const schema = yup.object().shape({
    old: yup
      .string()
      .min(6)
      .max(20)

      .matches(
        /\w+\d+[^a-zA-Z0-9]+/,
        "insert 1 number,1 letter and 1 character"
      )
      .required(),
    new: yup
      .string()
      .min(6)
      .max(20)
      .required()
      .matches(
        /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        "password must contain at least 1 number and 1 character"
      )
      .required(),
    confirm: yup
      .string()
      .oneOf([yup.ref("new")], "doesn't match your password")
      .required(),
  });

  const [showPass, setShowPass] = useState(false);

  const methods = useForm({ resolver: yupResolver(schema) });
  const {
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = methods;
  const { old, new: newPass } = getValues();

  const OnSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const [Status, setStatus] = useState<number>(0);

  const [updatePass] = useMutation(Update_Pass, {
    variables: { _id: userId, newPassword: newPass, oldPassword: old },
  });

  const passwordFn = async () => {
    const { data } = await updatePass();
    if (data?.updatePassword.status === 200) {
      setStatus(200);
    } else {
      setStatus(404);

      toast.error(data?.updatePassword.msg);
    }
  };
  return (
    <FormProvider {...methods}>
      <form action="" onSubmit={handleSubmit(OnSubmit)}>
        <div className="user-detail-par center">
          <span className="user-detail detail">Password :</span>

          <span className="user-value value"> **********</span>

          <OpacityBtn
            key={"password"}
            btn="update"
            cls="btn update-user center gap"
            fn={() => {
              setShowPass(true);
              setStatus(0);
            }}
            Icon={GrUpdate}
          />
          <AnimatePresence>
            {showPass && (
              <SlideButton
                key={`password-btn`}
                height={280}
                sethide={setShowPass}
                cls="update-user-slide password"
                doneMsg={`your password is updated`}
                fn={passwordFn}
                head={`update your password`}
                isVaild={isValid}
                Status={Status}
              >
                <Input
                  placeholder={"old"}
                  err={errors?.old?.message?.toString()}
                  type="password"
                />
                <Input
                  placeholder={"new"}
                  err={errors?.new?.message?.toString()}
                  type="password"
                />
                <Input
                  placeholder={"confirm"}
                  err={errors?.confirm?.message?.toString()}
                  type="password"
                />
              </SlideButton>
            )}
          </AnimatePresence>
        </div>
      </form>
    </FormProvider>
  );
};

export default Password;
