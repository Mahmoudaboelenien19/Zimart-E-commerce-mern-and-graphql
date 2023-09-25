import React from "react";
import { AnimatePresence } from "framer-motion";

import FadeElement from "./animation/FadeElement";

interface Props {
  message: string;
  cls: string;
}

const NoData = ({ message, cls }: Props) => (
  <AnimatePresence>
    <FadeElement cls={`shadow no-data ${cls}`} key={message} delay={0.2}>
      {message}
    </FadeElement>
  </AnimatePresence>
);

export default NoData;
