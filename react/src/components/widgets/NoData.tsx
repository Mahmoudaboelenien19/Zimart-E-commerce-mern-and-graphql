import { AnimatePresence } from "framer-motion";

import FadeElement from "./animation/FadeElement";

interface Props {
  message: string;
  className: string;
}

const NoData = ({ message, className }: Props) => (
  <AnimatePresence>
    <FadeElement
      className={`shadow no-data ${className}`}
      key={message}
      delay={0.2}
      endOpacity={0.7}
    >
      {message}
    </FadeElement>
  </AnimatePresence>
);

export default NoData;
