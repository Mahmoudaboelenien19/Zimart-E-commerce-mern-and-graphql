import InpErr from "@/components/widgets/shared/forms/InpErr";
import Select from "@/components/widgets/shared/select/Select";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  defaultValue?: string;
  name: string;
  isPromiseSucess: boolean;
};
const DashboardSelect = ({ isPromiseSucess, name, defaultValue }: Props) => {
  const [value, setter] = useState<string>("");
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      setValue(name, defaultValue);
      setter(defaultValue || "");
      initialRender.current = false;
    }
  }, []);

  useEffect(() => {
    if (isPromiseSucess) {
      setter("");
    }
  }, [isPromiseSucess]);

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
        dropdownClassName="main-clr"
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
