import React, { useEffect, useState } from "react";
import FadeElement from "./animation/FadeElement";
import { ChildrenInterFace } from "../../interfaces/general";
import { AnimatePresence } from "framer-motion";
import GridLoader from "./loaders/GridLoader";

interface Props extends ChildrenInterFace {
  length: boolean;
  message: string;
  cls?: string;
  loading?: boolean;
}
const NoData = ({ length, children, message, cls, loading = false }: Props) => {
  const [isPending, setIsPending] = useState(true);
  const [hasLen, setHasLen] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (length) {
        setHasLen(true);
        setIsPending(false);
      } else {
        setHasLen(false);
        setShow(true);
        setIsPending(false);
      }
    }
  }, [length, loading]);

  return (
    <AnimatePresence mode="wait">
      {isPending || loading ? (
        <GridLoader cls={`${cls} center` || ""} />
      ) : (
        <>
          {hasLen ? (
            children
          ) : (
            <>
              <FadeElement cls={`shadow no-data ${cls}`} key={message}>
                {!loading && show && message}
              </FadeElement>
            </>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default NoData;
