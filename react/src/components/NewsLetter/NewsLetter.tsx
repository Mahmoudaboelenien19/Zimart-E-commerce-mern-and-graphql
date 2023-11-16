import { useRef } from "react";
import Input from "../widgets/shared/forms/Input";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import { motion, useInView } from "framer-motion";
import "./_news-leter.scss";
import Form from "../widgets/shared/forms/Form";
import MainBtn from "../widgets/buttons/MainBtn";
const schema = yup.object().shape({
  email: yup.string().email("enter a vaild email").required(),
});
const NewsLetter = () => {
  const methods = useForm({ resolver: yupResolver(schema) });
  const {
    handleSubmit,
    resetField,
    formState: { isValid },
  } = methods;
  const OnSubmit = async (data: FieldValues) => {
    if (isValid) {
      resetField("email");
      toast.success("you successfully subscribed to newsletter ");
    }
  };

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false });

  return (
    <div className="newsletter center" ref={ref}>
      {inView && (
        <div className="newletter-container ">
          <motion.div
            className="news-content "
            animate={{
              opacity: [0, 0.2, 0.4, 0.6, 0.8, 1],
              x: [-200, 0],

              transition: { duration: 0.4, delay: 0.2 },
            }}
          >
            <h2>sign up for newsletter</h2>
            <span>
              get e-mail about latest news and
              <span className="news-spaecial"> special offers</span>
            </span>
          </motion.div>
          <FormProvider {...methods}>
            <Form
              delay={0.5}
              onSubmit={handleSubmit(OnSubmit)}
              className=" main center "
            >
              <Input placeholder="email" />
              <div className="center news-letter-btn-par ">
                <MainBtn btn="subscribe" className="btn main " type="submit" />
              </div>
            </Form>
          </FormProvider>
        </div>
      )}
    </div>
  );
};

export default NewsLetter;
