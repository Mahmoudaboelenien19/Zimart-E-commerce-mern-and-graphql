import InpErr from "@/components/widgets/shared/forms/InpErr";
import Select from "@/components/widgets/shared/select/Select";
import { isAuthContext } from "@/context/isAuth";
import { useContext, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  defaultValue?: string;
  name: string;
};
const DashboardSelect = ({ name, defaultValue }: Props) => {
  const [value, setter] = useState<string>("");
  const { isAdmin } = useContext(isAuthContext);
  const {
    register,
    setValue,
    formState: { errors, submitCount, isValid, isDirty },
  } = useFormContext();

  useEffect(() => {
    if (!submitCount) {
      setValue(name, defaultValue);
      setter(defaultValue || "");
    }
    if (isValid && isAdmin && isDirty) {
      setter("");
    }
  }, [submitCount]);

  useEffect(() => {
    if (value) {
      setValue(name, value, {
        shouldDirty: value !== defaultValue ? true : false,
      });
    }
  }, [value]);

  const err = errors ? errors[name]?.message?.toString() : "";
  const ar =
    name === "category"
      ? ["phone", "laptops", "fashion"]
      : ["new", "sale", "trending", "exclusive", "limited"];
  return (
    <div className=" center w-100  gap col">
      <select {...register(name)} />
      <Select
        setter={setter}
        val={value || ""}
        ar={ar}
        noVal={
          name === "category"
            ? "Select Product Category"
            : "Select Product State"
        }
      />
      {err && !value && <InpErr err={err} />}
    </div>
  );
};

export default DashboardSelect;
