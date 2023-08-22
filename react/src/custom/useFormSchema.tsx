import * as yup from "yup";
const schema = yup.object().shape({
  name: yup.string().min(6).max(20),
  email: yup.string().email("insert a vaild email").required(),
  password: yup
    .string()
    .min(6)
    .max(20)

    .matches(
      /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "password must contain at least 1 number , 1 special character and 1 letter"
    ),
  confirm: yup
    .string()
    .oneOf([yup.ref("password")], "doesn't match your password")
    .required(),
  phone: yup.string().min(10),
});

const useFormSchema = () => {
  return { schema };
};

export default useFormSchema;
