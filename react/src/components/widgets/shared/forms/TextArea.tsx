import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

type Props = {
  placeholder: string;
  defaultValue?: string;
  className?: string;
};
const TextArea = ({ placeholder, defaultValue, className }: Props) => {
  const { register, setValue } = useFormContext();

  useEffect(() => {
    if (defaultValue) {
      setValue(placeholder, defaultValue);
    }
  }, [defaultValue]);

  return <textarea className={className} {...register(placeholder)} />;
};

export default TextArea;
