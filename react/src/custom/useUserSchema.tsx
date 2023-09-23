import * as yup from "yup";
const useUserSchema = () => {
  const schema: { [key: string]: any } = {
    name: yup.object().shape({
      name: yup.string().min(6).max(20).required("insert a name"),
    }),
    email: yup.object().shape({
      email: yup
        .string()
        .email()
        .matches(
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
        .required("insert a vaild email"),
    }),
    password: yup.object().shape({
      old: yup
        .string()
        .min(6)
        .max(20)
        .matches(
          /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          "password must contain at least 1 number and 1 special character"
        ),
      new: yup
        .string()
        .min(6)
        .max(20)
        .matches(
          /\w+\d+[^a-zA-Z0-9]+/,
          "insert 1 number,1 letter and 1 character"
        ),
      confirm: yup
        .string()
        .oneOf([yup.ref("new")], "doesn't match your password")
        .required(),
    }),
    phone: yup.object().shape({
      phone: yup.string().min(10).required(),
    }),
    country: yup.object().shape({
      phone: yup.mixed().notRequired(),
    }),
  };
  return schema;
};

export default useUserSchema;
