import { useState, InputHTMLAttributes, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import clsx from "clsx";
import InpErr from "./InpErr";
import { IconType } from "react-icons/lib";
const placeholderVariant = {
  start: (bool: boolean) => ({ top: bool ? "50%" : "0" }),
  end: (bool: boolean) => ({ top: bool ? "0" : "50%" }),
};

type Props = {
  Icon?: IconType;
} & InputHTMLAttributes<HTMLInputElement>;
const Input = ({
  Icon,
  name = "",
  type,
  defaultValue,
  placeholder,

  ...props
}: Props) => {
  const [isFocus, setIsFocus] = useState(Boolean(defaultValue));
  const [isPassIconCLicked, setIsPassIconCLicked] = useState(false);
  const {
    watch,
    register,
    setFocus,
    setValue,
    formState: { errors, submitCount, isSubmitSuccessful },
  } = useFormContext();

  const field = name || placeholder || "";
  const inpVal = watch(field);

  const handlePass = () => {
    if (type === "password") {
      setIsPassIconCLicked(!isPassIconCLicked);
    }
  };

  const err = errors ? errors[field]?.message?.toString() : "";
  useEffect(() => {
    if (defaultValue && !submitCount) {
      setValue(name, defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      setIsFocus(false);
    }
  }, [isSubmitSuccessful]);
  return (
    <div className=" center w-100  gap col">
      <div className=" relative inp-parent w-100 ">
        <input
          {...props}
          type={type === "password" && isPassIconCLicked ? "text" : type}
          onFocus={() => setIsFocus(true)}
          {...register(field, {
            onBlur() {
              setIsFocus(false);
            },
          })}
          step={type === "number" ? (field === "stock" ? "1" : ".01") : "any"}
        />
        {Icon && (
          <Icon
            className={clsx("inp-icon", isFocus && "inp-icon-focus")}
            onClick={handlePass}
          />
        )}

        <motion.span
          variants={placeholderVariant}
          initial="start"
          animate="end"
          custom={inpVal || isFocus}
          className={clsx(
            "placeholder",
            inpVal || isFocus ? "placeholder-top" : "placeholder-center"
          )}
          onClick={() => setFocus(field)}
        >
          {placeholder}
        </motion.span>
      </div>
      <InpErr err={err} />
    </div>
  );
};

export default Input;
