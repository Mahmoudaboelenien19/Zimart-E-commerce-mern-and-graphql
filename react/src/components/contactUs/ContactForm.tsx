import React from "react";
import FormAnimation from "../widgets/FormAnimation";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Input from "../widgets/Input";
import MainBtn from "../widgets/MainBtn";
import { IoSend } from "react-icons/io5";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";

const ContactForm = () => {
  const schema = yup.object().shape({
    name: yup.string().min(5).max(20).required(),
    subject: yup.string().min(5).max(20).required(),
    message: yup.string().min(20).max(1000).required(),
    email: yup.string().email("insert a valid email").required(),
  });
  const methods = useForm({ resolver: yupResolver(schema) });
  const {
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = methods;

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    if (isValid) {
      toast.success("message is successfully sent ");
      reset();
    }
  };
  return (
    <FormProvider {...methods}>
      <FormAnimation cls="center  col gap" fn={handleSubmit(onSubmit)}>
        <h2 className="underline header">Contact us</h2>
        <Input placeholder={"name"} err={errors.name?.message?.toString()} />
        <Input placeholder={"email"} err={errors.email?.message?.toString()} />
        <Input
          placeholder={"subject"}
          err={errors.subject?.message?.toString()}
        />
        <Input
          placeholder={"message"}
          err={errors.message?.message?.toString()}
          inptype="textarea"
        />
        <MainBtn
          type="submit"
          cls="btn main gap center w-100"
          parCls="w-80"
          fn={() => null}
          btn="send"
          Icon={IoSend}
          pos="right"
        />
      </FormAnimation>
    </FormProvider>
  );
};

export default ContactForm;
