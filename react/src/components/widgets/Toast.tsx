import React from "react";
import { Toaster } from "react-hot-toast";

const Toast = () => (
  <Toaster
    position="bottom-left"
    reverseOrder={false}
    containerClassName=""
    toastOptions={{
      style: {
        background: "var(--main)",
        color: "var(--third)",
        width: 300,
        whiteSpace: "nowrap",
        textTransform: "capitalize",
      },
      success: {
        duration: 3000,
      },
    }}
  />
);

export default Toast;
