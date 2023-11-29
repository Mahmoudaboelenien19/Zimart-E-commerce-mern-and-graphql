import { Fragment, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import CustomFIleInput from "./CustomFIleInput";
import MainBtn from "@/components/widgets/buttons/MainBtn";
import Form from "@/components/widgets/shared/forms/Form";
import InpErr from "@/components/widgets/shared/forms/InpErr";
import Input from "@/components/widgets/shared/forms/Input";
import { Product } from "@/types/product";
import { DashFormSchema } from "@/lib/formschemas/form schemas";
import DashboardSelect from "./DashboardSelect";
import TextArea from "@/components/widgets/shared/forms/TextArea";
import { useAppSelector } from "@/custom/helpers/reduxTypes";
interface keyedProduct extends Product {
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
  //i used external state for sucess peomise not react hook form isSuccessffelSubmited or isSubmitting cuz they'ren't enough for custom select box
  const [isPromiseSucess, setisPromiseSucess] = useState(false);
  const { role } = useAppSelector((st) => st.userData);
  const methods = useForm({
    resolver: yupResolver(DashFormSchema(type || "")),
    defaultValues: {},
  });
  const {
    handleSubmit,
    reset,

    formState: { errors, isDirty },
  } = methods;

  const inpArr = [
    { type: "text", placeholder: "title" },
    { type: "number", placeholder: "stock" },
    { type: "number", placeholder: "price" },
  ];

  const onSubmit = async (data: FieldValues) => {
    if (role === "admin") {
      try {
        const obj = {
          ...data,
          stock: Number(data.stock),
          price: Number(data.price),
        };

        if (type === "update") {
          if (isDirty) {
            setisPromiseSucess(false);
            const res: Promise<{ data: { updateProduct: { msg: string } } }> =
              fn({
                variables: {
                  input: {
                    ...obj,
                    _id: id,
                  },
                },
              });
            toast.promise(res, {
              loading: <div>updating... !</div>,

              success: (res) => {
                reset();
                setisPromiseSucess(true);

                return res.data.updateProduct.msg;
              },
              error: (err) => {
                return err;
              },
            });
          } else {
            toast.error("no data changed");
          }
        } else {
          setisPromiseSucess(false);

          const res: Promise<{ data: { addNewProduct: { msg: string } } }> = fn(
            {
              variables: { input: obj },
            }
          );

          toast.promise(res, {
            loading: <div>uploading... !</div>,

            success: (res) => {
              reset();
              setisPromiseSucess(true);

              return res.data.addNewProduct.msg;
            },
            error: (err) => {
              return err;
            },
          });
        }
      } catch (err: unknown) {
        if ((err as Error).message === "Not Authorised!") {
          toast.error("you aren't an admin");
        }
      }
    } else {
      toast.error("your must be an admin ");
    }
  };

  return (
    <FormProvider {...methods}>
      <Form
        initialTranslate={0}
        onSubmit={handleSubmit(onSubmit)}
        className=" main "
      >
        <h2>{head}</h2>
        {inpArr.map(({ placeholder, type: inptype }, i) => {
          return (
            <Fragment key={`${type + placeholder}-${i}`}>
              <Input
                placeholder={placeholder}
                defaultValue={obj?.category ? obj[placeholder] : ""}
                type={inptype}
                name={placeholder}
              />
              {placeholder === "title" && type !== "update" && (
                <CustomFIleInput />
              )}
              {placeholder === "price" && (
                <Fragment key={"state&&title" + type}>
                  <DashboardSelect
                    name={"state"}
                    defaultValue={obj?.state || ""}
                    isPromiseSucess={isPromiseSucess}
                  />

                  <DashboardSelect
                    name={"category"}
                    defaultValue={obj?.category || ""}
                    isPromiseSucess={isPromiseSucess}
                  />
                </Fragment>
              )}
            </Fragment>
          );
        })}

        <div className="inp-parent textarea-par w-100    center  gap col">
          <TextArea
            placeholder={"description"}
            className="  inp relative "
            defaultValue={obj?.category ? obj.description : ""}
          />
          <InpErr
            key={"description"}
            err={errors.description?.message?.toString()}
          />
        </div>

        <div>
          <MainBtn
            btn={btn}
            className="main btn center gap w-100"
            type="submit"
          />
        </div>
      </Form>
    </FormProvider>
  );
};

export default DashForm;
