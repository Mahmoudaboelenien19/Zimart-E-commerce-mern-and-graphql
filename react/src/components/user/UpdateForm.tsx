import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Input from "../widgets/shared/forms/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import useUserSchema from "@/custom/helpers/useUserSchema";
import { useMutation } from "@apollo/client";
import MainBtn from "../widgets/buttons/MainBtn";
import { UPDATE_USER_DATA, Update_Pass } from "@/graphql/mutations/user";
import toast from "react-hot-toast";
import UpdateCountry from "./UpdateCountry";
import Password from "./Password";
import { useAppDispatch, useAppSelector } from "@/custom/helpers/reduxTypes";
import { updateName, updateUserData } from "@/redux/userDataSlice";

type Props = {
  detail: string;
  value: string;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
};
const UpdateForm = ({ detail, value, setter }: Props) => {
  const { userId } = useAppSelector((st) => st.isAuth);
  const schema = useUserSchema();
  const methods = useForm({ resolver: yupResolver(schema[detail]) });
  const {
    handleSubmit,
    formState: { isDirty },
  } = methods;
  const [fn] = useMutation(UPDATE_USER_DATA);
  const [updatePass] = useMutation(Update_Pass);
  const dispatch = useAppDispatch();
  const OnSubmit = async (data: FieldValues) => {
    if (isDirty) {
      if (detail !== "password") {
        const detailvalue = data[detail];
        const res = fn({
          variables: {
            input: {
              _id: userId,
              target: detail,
              value: detailvalue,
            },
          },
        });
        if (detail != "email") {
          toast.promise(res, {
            loading: <div>updating... !</div>,
            success: (res) => {
              setter(false);
              dispatch(updateUserData({ [detail]: detailvalue }));
              // dispatch(updateName(detailvalue));

              return res.data.updateUserData.msg;
            },
            error: (err) => {
              console.log(err);
              return "err";
            },
          });
        } else {
          const p = await res;
          const { msg, status } = await p.data.updateUserData;
          if (status === 200) {
            toast.success(msg);
            dispatch(updateUserData({ email: detailvalue }));
            setter(false);
          } else {
            toast.error(msg);
          }
        }
      } else {
        const { new: newPass, old } = data;
        const res = await updatePass({
          variables: { _id: userId, newPassword: newPass, oldPassword: old },
        });
        if (res.data?.updatePassword.status === 200) {
          setter(false);
          toast.success(res?.data?.updatePassword.msg);
        } else {
          toast.error(res.data?.updatePassword.msg);
        }
      }
    } else {
      toast.error("no Data is changed");
    }
  };

  const closePopup = () => setter(false);
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(OnSubmit)}
        className="main update-user-form  w-100"
      >
        <h2 className="header">update {detail}</h2>
        {detail !== "country" && detail != "password" && (
          <Input
            name={detail}
            type={detail === "phone" ? "number" : "text"}
            placeholder={detail}
            defaultValue={value}
          />
        )}
        {detail === "password" && <Password />}
        {detail === "country" && <UpdateCountry value={value} />}
        <div className="btns center">
          <MainBtn btn="update" type="submit" className="btn main" />
          <MainBtn
            btn="cancel"
            type="button"
            className="btn cancel-outline"
            onClick={closePopup}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default UpdateForm;
