import { Toaster } from "react-hot-toast";
import FetchLoading from "../widgets/loaders/FetchLoading";

const Toast = () => (
  <Toaster
    position="bottom-left"
    reverseOrder={false}
    containerClassName="toast custom-toast"
    toastOptions={{
      loading: {
        icon: <FetchLoading clr="grey" width="24" />,
      },
      style: {
        background: "var(--secondary)",
        color: "var(--third)",
        width: 300,
        whiteSpace: "nowrap",
        textTransform: "capitalize",
        textAlign: "left",
      },
      success: {
        duration: 3000,
      },
    }}
  />
);

export default Toast;
