import * as yup from "yup";
export const signUpSchema = yup.object().shape({
  name: yup.string().min(6).max(20),
  email: yup
    .string()
    .email("enter a valid E-mail")
    .matches(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "enter a valid E-mail"
    )
    .required(),
  password: yup
    .string()
    .min(6)
    .max(20)
    .matches(
      /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "add at least 1 number , 1 special character and 1 letter"
    ),
  confirm: yup
    .string()
    .oneOf([yup.ref("password")], "doesn't match your password")
    .required(),
  phone: yup.string().min(10),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Insert a valid email")
    .matches(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "enter a valid E-mail"
    )
    .required("Insert your E-mail"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "add at least 1 number , 1 special character and 1 letter"
    )
    .required("enter your password"),
});

const fileSchema = yup
  .mixed()
  .test("fileList", "you must upload 4 png images", (value) => {
    return (
      value instanceof FileList &&
      value.length === 4 &&
      Array.from(value).every((file) => file.type === "image/png")
    );
  });

const notRequired = yup.mixed().notRequired();
export const DashFormSchema = (type: string) =>
  yup.object().shape({
    title: yup.string().min(12).max(30).required("title is required"),
    stock: yup
      .number()
      .typeError("add a valid number")
      .integer()
      .min(0)
      .max(100)
      .required("stock is required"),
    category: yup.string().required("select a category"),
    state: yup.string().required("select a state"),
    price: yup
      .number()
      .nonNullable()
      .typeError("add a valid number")
      .min(10, "price is at least 10$")
      .max(10000, "you shouldn't exceed 1000$")
      .required("price is required"),
    description: yup
      .string()
      .trim()
      .min(50, "add a description of 50 letters at least")
      .required("add a description"),
    images: type === "update" ? notRequired : fileSchema,
  });
