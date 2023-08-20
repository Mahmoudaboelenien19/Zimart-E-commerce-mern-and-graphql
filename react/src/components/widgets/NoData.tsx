import React, { useTransition, useEffect, useState } from "react";
import FadeElement from "./animation/FadeElement";
import { ChildrenInterFace } from "../../interfaces/general";
import { AnimatePresence } from "framer-motion";
import GridLoader from "./loaders/GridLoader";

interface Props extends ChildrenInterFace {
  length: boolean;
  message: string;
  cls?: string;
}
const NoData = ({ length, children, message, cls }: Props) => {
  const [isPending, startTransition] = useTransition();

  const [hasLen, setHasLen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 500);
  }, []);

  useEffect(() => {
    if (length) {
      startTransition(() => {
        setHasLen(true);
      });
    } else {
      startTransition(() => {
        setHasLen(false);
      });
    }
  }, [length]);

  return (
    <AnimatePresence mode="wait">
      {isPending ? (
        <GridLoader cls={`${cls} center` || ""} />
      ) : (
        <>
          {hasLen ? (
            children
          ) : (
            <>
              <FadeElement cls={`shadow no-data ${cls}`} key={message}>
                {show && message}
              </FadeElement>
            </>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default NoData;
