import React, { useRef, useState } from "react";
import InpErr from "../../widgets/InpErr";
import { useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariant } from "../../../variants/globals";

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
    <div className="inp-parent custom-file">
      <InpErr key={"description"} err={err} />
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
      <AnimatePresence>
        <motion.div
          key={"number of files"}
          variants={opacityVariant}
          transition={{ duration: 0.4, delay: 0.4 }}
          initial="start"
          animate="end"
          exit="exit"
          className="span-file"
        >
          {watchfiles?.length >= 1 ? (
            watchfiles?.length + " file selected"
          ) : (
            <span style={{ color: "var(--wheat)" }}>upload 4 images</span>
          )}
        </motion.div>
      </AnimatePresence>
      <InpErr err={errors.images?.message?.toString()} />
    </div>
  );
};

export default CustomFIleInput;
