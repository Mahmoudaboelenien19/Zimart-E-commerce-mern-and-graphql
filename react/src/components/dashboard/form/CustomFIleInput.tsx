import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import InpErr from "@/components/widgets/shared/forms/InpErr";
import { opacityVariant } from "@/lib/variants/globals";
import FadeElement from "@/components/widgets/animation/FadeElement";

interface Props {
  err: string;
}
const CustomFIleInput = ({ err }: Props) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const watchfiles = watch("images", []);

  return (
    <div className=" center w-100  gap col">
      <div className="inp-parent custom-file w-100">
        <input
          {...(register("images"),
          {
            ref: fileRef,
            onChange(e) {
              setValue("images", e.target.files, { shouldValidate: true });
            },
          })}
          type="file"
          className=" inp relative
        update-product
        "
          multiple
        />
        <button
          type="button"
          className="main btn btn-file"
          onClick={() => {
            if (fileRef?.current) {
              fileRef?.current.click();
            }
          }}
        >
          upload
        </button>
        <AnimatePresence mode="wait">
          <FadeElement
            duration={0.3}
            className="custom-file-value"
            key={"custom-file" + watchfiles?.length}
          >
            {watchfiles?.length >= 1
              ? `${watchfiles?.length} file selected`
              : "upload 4 images"}
          </FadeElement>
        </AnimatePresence>
      </div>
      <InpErr err={errors.images?.message?.toString()} />
    </div>
  );
};

export default CustomFIleInput;
