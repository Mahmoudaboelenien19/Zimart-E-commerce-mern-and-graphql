import "./_loading.scss";
import { motion } from "framer-motion";
import { ReactSVG } from "react-svg";

const Loading = () => {
  return (
    <div className="loading center">
      <motion.div
        className="loading-logo"
        initial={{ scale: 0.8, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.2, ease: "easeInOut" }}
      >
        <ReactSVG
          src={
            "https://res.cloudinary.com/domobky11/image/upload/v1700364978/logo_vn5mvy.svg"
          }
        />
      </motion.div>
    </div>
  );
};

export default Loading;
