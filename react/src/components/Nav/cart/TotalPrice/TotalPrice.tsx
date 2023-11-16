import { AnimatePresence } from "framer-motion";
import FadeElement from "@/components/widgets/animation/FadeElement";
import Header from "@/components/widgets/shared/Header";
import TotaPriceData from "./TotaPriceData";

const TotalPrice = () => {
  return (
    <AnimatePresence>
      <FadeElement
        className="totel-price center col "
        delay={1.5}
        key="cart-total-price"
      >
        <Header head={"order summary"} />
        <TotaPriceData />
      </FadeElement>
    </AnimatePresence>
  );
};

export default TotalPrice;
