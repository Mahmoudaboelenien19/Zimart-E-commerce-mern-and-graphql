import React from "react";
import { AnimatePresence } from "framer-motion";
import FadeWithY from "./animation/FadeWithY";

interface Props {
  message: string;
  cls: string;
}
console.log("no data ");
const NoData = ({ message, cls }: Props) => (
  <AnimatePresence>
    <FadeWithY cls={`shadow no-data ${cls}`} key={message} delay={1}>
      {message}
    </FadeWithY>
  </AnimatePresence>
);

export default NoData;
