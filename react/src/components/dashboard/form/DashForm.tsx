import { Fragment, useContext } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import CustomFIleInput from "./CustomFIleInput";
import DashMain from "../DashMain";
import MainBtn from "@/components/widgets/buttons/MainBtn";
import Form from "@/components/widgets/shared/forms/Form";
import InpErr from "@/components/widgets/shared/forms/InpErr";
import Input from "@/components/widgets/shared/forms/Input";
import { ProductInterface } from "@/interfaces/product";
import { DashFormSchema } from "@/lib/formschemas/form schemas";
import DashboardSelect from "./DashboardSelect";
import TextArea from "@/components/widgets/shared/forms/TextArea";
import { isAuthContext } from "@/context/isAuth";
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
  const date = () => new Date();
  const methods = useForm({
    resolver: yupResolver(DashFormSchema(type || "")),
    defaultValues: {},
  });
  const {
    handleSubmit,
    reset,

    formState: { errors, isDirty },
  } = methods;

  console.log({ isDirty });
  const inpArr = [
    { type: "text", placeholder: "title" },
    { type: "number", placeholder: "stock" },
    { type: "number", placeholder: "price" },
  ];

  const onSubmit = async (data: FieldValues) => {
    try {
      const obj = {
        ...data,
        stock: Number(data.stock),
        price: Number(data.price),
      };

      if (type === "update") {
        if (isDirty) {
          const res: Promise<{ data: { updateProduct: { msg: string } } }> = fn(
            {
              variables: {
                input: {
                  ...obj,
                  _id: id,
                },
              },
            }
          );
          toast.promise(res, {
            loading: <div>updating... !</div>,

            success: (res) => {
              reset();
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
        const addObj = { ...obj, createdAt: date() };

        const res: Promise<{ data: { addNewProduct: { msg: string } } }> = fn({
          variables: { input: addObj },
        });
        console.log(data);
        toast.promise(res, {
          loading: <div>updating... !</div>,

          success: (res) => {
            reset();
            return res.data.addNewProduct.msg;
          },
          error: (err) => {
            return err;
          },
        });
        // if (data.addNewProduct.status) {

        // }
      }
    } catch (err: unknown) {
      if ((err as Error).message === "Not Authorised!") {
        toast.error("you aren't an admin");
      }
    }
  };

  return (
    <DashMain key="dash-form">
      <FormProvider {...methods}>
        <Form
          initialTranslate={-50}
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
                  <CustomFIleInput err="" key="custom-input" />
                )}
                {placeholder === "price" && (
                  <Fragment key={"state&&title" + type}>
                    <DashboardSelect
                      name={"state"}
                      defaultValue={obj?.state || ""}
                    />

                    <DashboardSelect
                      name={"category"}
                      defaultValue={obj?.category || ""}
                    />
                  </Fragment>
                )}
              </Fragment>
            );
          })}
          <div className=" center w-100  gap col">
            <div className="inp-parent textarea-par w-100">
              <TextArea
                placeholder={"description"}
                className="update-product  inp relative "
                defaultValue={obj?.category ? obj.description : ""}
              />
            </div>
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
      {/* <UploadingLoader bool={isSubmitting && isAdmin} /> */}
    </DashMain>
  );
};

export default DashForm;
