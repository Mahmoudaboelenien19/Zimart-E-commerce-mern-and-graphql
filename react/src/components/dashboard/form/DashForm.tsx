import React, { Fragment, useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Input from "../../widgets/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-hot-toast";
import InpErr from "../../widgets/InpErr";
import { ProductInterface } from "../../../interfaces/product";
import CustomFIleInput from "./CustomFIleInput";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, AnimatePresence } from "framer-motion";
import { opacityVariant } from "../../../variants/globals";
import OpacityBtn from "../../widgets/OpacityBtn";
import DashMain from "../DashMain";
import {
  addToProductRedux,
  updateProductRedux,
} from "../../../redux/productSlice";
import { useAppDispatch } from "../../../custom/reduxTypes";
import FormAnimation from "../../widgets/FormAnimation";
import { uploadImagesRoute } from "../../../assets/routes.js";

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
  const dispatch = useAppDispatch();

  const date = () => new Date();
  const [percentage, setPercentage] = useState(-1);
  useEffect(() => {
    if (percentage >= 100) {
      setTimeout(() => {
        setPercentage(-1);
      }, 2000);
    }
  }, [percentage]);

  useEffect(() => {
    let interval: number;
    if (percentage < 100 && percentage != -1) {
      interval = setInterval(() => {
        setPercentage((cur) => cur + 10);
      }, 400);
    }
    return () => clearInterval(interval);
  }, [percentage]);

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
    state: yup.string().min(3).max(10).required(),
    category: yup.string().min(3).max(10).required(),
    title: yup.string().min(12).max(30).required(),
    stock: yup.number().min(1).max(100).required(),
    price: yup.number().min(1).max(1000).required(),
    description: yup.string().trim().min(50).required(),
    images: type === "update" ? notRequired : fileSchema,
  });
  const methods = useForm({ resolver: yupResolver(schema) });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const inpArr = [
    { type: "text", placeholder: "title" },
    { type: "text", placeholder: "category" },
    { type: "number", placeholder: "stock" },
    { type: "text", placeholder: "state" },
    { type: "number", placeholder: "price" },
  ];

  const onSubmit = async (data: FieldValues) => {
    const obj = {
      ...data,
      stock: Number(data.stock),
      price: Number(data.price),
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
      dispatch(
        updateProductRedux({
          _id: id,
          obj: {
            ...data,
            stock: Number(data.stock),
            price: Number(data.price),
            description: data.description,
          },
        })
      );
    } else {
      const addObj = { ...obj, createdAt: date() };
      const { data: res } = await fn({
        variables: {
          createInput: { ...addObj, images: null },
        },
      });
      if (res?.addProduct?._id) {
        setPercentage(0);
        const formData = new FormData();
        for (const file of data.images) {
          formData.append("images", file);
        }
        const { data: addedDocument } = await axios.patch(
          uploadImagesRoute(res.addProduct._id),
          formData,
          {
            onUploadProgress: (data: any) => {
              console.log(data);
            },
          }
        );
        dispatch(addToProductRedux(addedDocument.data));
        toast.success(addedDocument.msg);
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
                  err={(errors as { [key: string]: any })[
                    placeholder
                  ]?.message.toString()}
                  inptype="input"
                />
                {placeholder === "title" && type !== "update" && (
                  <CustomFIleInput err="" key="custom-input" />
                )}
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

          <OpacityBtn
            btn={btn}
            cls="main btn center gap w-100"
            fn={() => null}
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
          >
            {percentage > -1 && (
              <CircularProgressbar
                text={String(percentage)}
                value={percentage}
                className="progressbar"
              />
            )}
          </motion.span>
        </AnimatePresence>
      </FormProvider>
    </DashMain>
  );
};

export default DashForm;
