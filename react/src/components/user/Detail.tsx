import React, { useState, useContext, useEffect } from "react";
import MainBtn from "../widgets/buttons/MainBtn";
import { GrUpdate } from "react-icons/gr";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Input from "../widgets/forms/Input";
import SlideButton from "../widgets/buttons/SlideButton";
import UpdateCountry from "./UpdateCountry";
import { yupResolver } from "@hookform/resolvers/yup";
import { userDataInterface } from "./UserInfo";
import { toast } from "react-hot-toast";
import { AiFillWarning } from "react-icons/ai";
import useUserSchema from "@/custom/useUserSchema";
import { isAuthContext } from "@/context/isAuth";
interface Props {
  value: string;
  detail: string;
  fn: (variables: any) => any;
  placeholder?: string;
  setUpdateUserData: React.Dispatch<React.SetStateAction<userDataInterface>>;
  userdata: userDataInterface;
}

const Detail = ({
  detail,
  value,
  fn,
  placeholder,
  setUpdateUserData,
  userdata,
}: Props) => {
  const { userId, isAdmin } = useContext(isAuthContext);
  const [UpdatedCountry, setUpdatedCountry] = useState("");
  const [Status, setStatus] = useState<number>(0);
  const [bool, setter] = useState(false);
  useEffect(() => {
    if (userdata?.country && UpdatedCountry === "") {
      setUpdatedCountry(userdata.country);
    }
  }, [userdata?.country]);
  const schema = useUserSchema();
  const methods = useForm({ resolver: yupResolver(schema[detail]) });
  const {
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = methods;
  const { [detail]: detailvalue } = getValues();

  const update = async () => {
    const { data: res } = await fn({
      variables: {
        _id: userId,
        [detail]: detail === "country" ? UpdatedCountry : detailvalue,
      },
    });

    if (detail === "email") {
      if (res?.updateEmail?.status === 200) {
        setStatus(200);
      } else {
        toast.error(res?.updateEmail.msg);
        setStatus(404);
      }
    }

    if (detail === "phone") {
      if (res?.updateUserPhone?.status === 200) {
        setStatus(200);
      } else {
        toast.error(res?.updateUserPhone.msg);
        setStatus(404);
      }
    }

    if (detail === "name") {
      if (res?.updateUserName?.status === 200) {
        setStatus(200);
      } else {
        toast.error(res?.updateUserName.msg);
        setStatus(404);
      }
    }

    if (detail === "country") {
      if (res?.updateUserCountry?.status === 200) {
        setStatus(200);
      } else {
        toast.error(res?.updateUserCountry.msg);
        setStatus(404);
      }
    }

    setUpdateUserData((cur: userDataInterface) => ({
      ...cur,
      [detail]: detailvalue,
      country: UpdatedCountry,
    }));
  };
  const OnSubmit = async (data: FieldValues) => {
    console.log("");
  };

  return (
    <FormProvider {...methods}>
      <form action="" onSubmit={handleSubmit(OnSubmit)}>
        <div className="user-detail-par center">
          <span className="user-detail detail">{detail} :</span>
          <span
            className="user-value value"
            style={{
              textTransform: detail === "country" ? "capitalize" : "none",
            }}
          >
            {value}
          </span>

          <MainBtn
            key={detail}
            btn="update"
            cls="btn update-user center gap"
            fn={() => {
              if (!isAdmin) {
                setter(true);
                setStatus(0);
              } else {
                toast("admins can't change their data ", {
                  icon: <AiFillWarning fontSize={18} color="var(--star)" />,
                });
              }
            }}
            Icon={GrUpdate}
          />

          <SlideButton
            bool={bool}
            key={`${detail}-btn`}
            sethide={setter}
            doneMsg={`your ${detail} is updated`}
            fn={update}
            isVaild={detail !== "detail" ? isValid : true}
            Status={Status}
            head={`update your ${detail}`}
          >
            {detail !== "country" && (
              <>
                <Input
                  type={detail === "phone" ? "number" : "text"}
                  placeholder={placeholder || detail}
                  defaultVal={value}
                  err={(errors as { [key: string]: any })[
                    detail
                  ]?.message?.toString()}
                />
              </>
            )}
            {detail === "country" && (
              <UpdateCountry
                country={UpdatedCountry}
                setCountry={setUpdatedCountry}
              />
            )}
          </SlideButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default Detail;
