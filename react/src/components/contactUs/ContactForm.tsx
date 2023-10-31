import Form from "../widgets/shared/forms/Form";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Input from "../widgets/shared/forms/Input";
import MainBtn from "../widgets/buttons/MainBtn";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import TextArea from "../widgets/shared/forms/TextArea";
import InpErr from "../widgets/shared/forms/InpErr";

const schema = yup.object().shape({
  name: yup.string().min(5).max(20).required(),
  subject: yup.string().min(5).max(20).required(),
  email: yup.string().email("insert a valid email").required(),
  message: yup.string().min(20).max(1000).required(),
});

const ContactForm = () => {
  const methods = useForm({ resolver: yupResolver(schema) });
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = (data: FieldValues) => {
    toast.success("message is successfully sent ");
    reset();
  };
  return (
    <FormProvider {...methods}>
      <Form
        initialTranslate={0}
        className="center main col gap abs-err"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Contact us</h2>
        {/* <p>have a question or just want to get in touch ? Let&apos;s chat</p> */}
        <Input placeholder={"name"} />
        <Input placeholder={"email"} />
        <Input placeholder={"subject"} />

        <div className=" center w-100  gap col">
          <div className="inp-parent textarea-par w-100">
            <TextArea
              placeholder={"message"}
              className="update-product  inp relative "
            />
          </div>
          <InpErr
            key={"description"}
            err={errors.message?.message?.toString()}
          />
        </div>
        <div>
          <MainBtn
            type="submit"
            className="btn main gap center w-100"
            btn="send"
            pos="right"
            opacity={0}
          />
        </div>
      </Form>
    </FormProvider>
  );
};

export default ContactForm;
