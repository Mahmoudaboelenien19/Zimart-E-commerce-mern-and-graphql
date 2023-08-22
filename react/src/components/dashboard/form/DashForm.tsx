import React, { Fragment, useState } from "react";
import { FieldValues, FormProvider, useForm, Field } from "react-hook-form";
import Input from "../../widgets/forms/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import InpErr from "../../widgets/forms/InpErr";
import { ProductInterface } from "../../../interfaces/product";
import CustomFIleInput from "./CustomFIleInput";

import { motion, AnimatePresence } from "framer-motion";
import { opacityVariant } from "../../../variants/globals";
import MainBtn from "../../widgets/buttons/MainBtn";
import DashMain from "../DashMain";
import FormAnimation from "../../widgets/forms/FormAnimation";
import UploadingLoader from "../../widgets/loaders/UploadingLoader";
import Select from "./Select";
interface keyedProduct extends ProductInterface {
  [key: string]: any;
}

interface Props {
  fn: (variables: any) => any;
  id?: string;
  type?: string;
  obj?: keyedProduct;
  head: string;
  btn: string;
}

const DashForm = ({ type, fn, id, obj, head, btn }: Props) => {
  const [isPending, setIsPending] = useState(false);
  const [isSubmited, setIsSubmitted] = useState(false);
  const [stateValue, setStateValue] = useState(obj?.state || "");
  const [AllDone, setAllDone] = useState(false);
  const [categoryValue, setCategoryValue] = useState(obj?.category || "");

  const date = () => new Date();

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
  const schema = yup.object().shape({
    title: yup.string().min(12).max(30).required(),
    stock: yup.number().integer().min(1).max(100).required(),
    price: yup.number().min(1).max(1000).required(),
    description: yup.string().trim().min(50).required(),
    images: type === "update" ? notRequired : fileSchema,
  });

  const methods = useForm({ resolver: yupResolver(schema), defaultValues: {} });
  const {
    handleSubmit,
    resetField,
    register,

    formState: { errors },
  } = methods;

  const inpArr = [
    { type: "text", placeholder: "title" },

    { type: "number", placeholder: "stock" },

    { type: "number", placeholder: "price" },
  ];

  const resetFn = () => {
    setIsSubmitted(false);

    setCategoryValue("");
    setStateValue("");
    setIsPending(false);
    [
      ...inpArr,
      { placeholder: "description" },
      { placeholder: "images" },
    ].forEach(({ placeholder }) => resetField(placeholder as any));
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      if (stateValue && categoryValue) {
        setIsPending(true);

        const obj = {
          ...data,
          stock: Number(data.stock),
          price: Number(data.price),
          state: stateValue,
          category: categoryValue,
        };

        if (type === "update") {
          const { data: res } = await fn({
            variables: {
              input: {
                ...obj,
                _id: id,
              },
            },
          });
          toast.success(res.updateProduct.msg);

          resetFn();
        } else {
          const addObj = { ...obj, createdAt: date() };

          const { data } = await fn({
            variables: { input: addObj },
          });
          if (data.addNewProduct.status) {
            resetFn();
          }
        }
      }
    } catch (err: unknown) {
      if ((err as Error).message === "Not Authorised!") {
        setIsPending(false);

        toast.error("you aren't an admin");
      }
    }
  };

  return (
    <DashMain>
      <FormProvider {...methods}>
        <FormAnimation
          fn={handleSubmit(onSubmit)}
          cls="update-product-form center  col box-shadow"
        >
          <h2
            className="underline header "
            style={{ color: "var(--white)", margin: "10px auto" }}
          >
            {head}
          </h2>
          {inpArr.map(({ placeholder, type: inptype }, i) => {
            return (
              <Fragment key={`${type + placeholder}-${i}`}>
                <Input
                  placeholder={placeholder}
                  defaultVal={obj?.category ? obj[placeholder] : ""}
                  type={inptype}
                  err={(errors as { [key: string]: { message: string } })[
                    placeholder
                  ]?.message.toString()}
                  inptype="input"
                />
                {placeholder === "title" && type !== "update" && (
                  <CustomFIleInput err="" key="custom-input" />
                )}
                {placeholder === "price" && (
                  <Fragment key={"state&&title" + type}>
                    <Select
                      setter={setStateValue}
                      val={stateValue}
                      ar={["new", "sale", "trending", "exclusive", "limited"]}
                      noVal="Select Product State"
                      isSubmited={isSubmited}
                    />
                    <Select
                      isSubmited={isSubmited}
                      setter={setCategoryValue}
                      val={categoryValue}
                      ar={["phone", "laptops", "fashion"]}
                      noVal="Select Product Category"
                    />
                  </Fragment>
                )}

                <Fragment key="state-add-file"></Fragment>
              </Fragment>
            );
          })}
          <div className="inp-parent">
            <InpErr
              key={"description"}
              err={errors.description?.message?.toString()}
            />
            <textarea
              {...register("description")}
              className="update-product  inp relative"
              defaultValue={obj?.category ? obj.description : ""}
            />
          </div>

          <MainBtn
            btn={btn}
            cls="main btn center gap w-100"
            fn={() => setIsSubmitted(true)}
            parCls="w-80"
            type="submit"
          />
        </FormAnimation>
        <AnimatePresence>
          <motion.span
            variants={opacityVariant}
            transition={{ duration: 0.4 }}
            initial="start"
            animate="end"
            exit="exit"
            key={"prograssbar"}
          ></motion.span>
        </AnimatePresence>
      </FormProvider>
      <UploadingLoader bool={isPending} />
    </DashMain>
  );
};

export default DashForm;
