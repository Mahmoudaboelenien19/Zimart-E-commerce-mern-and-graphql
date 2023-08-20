import React, { useEffect } from "react";
import Input from "../widgets/forms/Input";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { motion, useAnimate, useInView } from "framer-motion";
const NewsLetter = () => {
  const schema = yup.object().shape({
    email: yup.string().email("enter a vaild email").required(),
  });
  const methods = useForm({ resolver: yupResolver(schema) });
  const {
    handleSubmit,
    resetField,
    formState: { errors, isValid },
  } = methods;
  const OnSubmit = async (data: FieldValues) => {
    if (isValid) {
      resetField("email");
      toast.success("you successfully subscribed to newsletter ");
    }
  };
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, { once: true });
  useEffect(() => {
    if (inView) {
      animate(
        ".news-content",
        { opacity: [0, 0.2, 0.4, 0.6, 0.8, 1], x: [-200, 0] },
        { duration: 0.4 }
      ).then(() => {
        animate(
          "form",
          { opacity: [0, 0.2, 0.4, 0.6, 0.8, 1], x: [200, 0] },
          { duration: 0.4 }
        );
      });
    }
  }, [inView]);
  return (
    <motion.div
      style={{ opacity: 0 }}
      whileInView={{ opacity: [0, 0.2, 0.4, 0.6, 1] }}
      className="newsletter"
      ref={scope}
    >
      <div className="news-content">
        <h2>sign up for newsletter</h2>
        <span>
          get e-mail about latest news and
          <span className="news-spaecial"> special offers</span>
        </span>
      </div>
      <FormProvider {...methods}>
        <form action="" onSubmit={handleSubmit(OnSubmit)}>
          <Input placeholder="email" err={errors?.email?.message?.toString()} />
          <button type="submit">sign up</button>
        </form>
      </FormProvider>
    </motion.div>
  );
};

export default NewsLetter;
