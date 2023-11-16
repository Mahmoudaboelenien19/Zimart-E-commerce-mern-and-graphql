import { useLayoutEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { mergeRefs } from "react-merge-refs";
import useClickOutside from "@/custom/helpers/useClickOutside";
import useIsMobile from "@/custom/helpers/useIsMobile";

import { seachVariant } from "@/lib/variants/globals";

type Props = {
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};
const SearchWrapper = ({ showSearch, children, setShowSearch }: Props) => {
  const { isMidScreen, isMobile } = useIsMobile();
  const [ref, animateFn] = useAnimate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useLayoutEffect(() => {
    animateFn(
      ref.current,
      { opacity: [0, 0.2, 0.4, 0.6, 0.8, 1] },
      { delay: 0.6 }
    );

    if (isMidScreen || isMobile) {
      setShowSearch(false);
    } else {
      setShowSearch(true);
    }
  }, [isMidScreen, isMobile]);

  return (
    <AnimatePresence initial={false}>
      <motion.form
        onSubmit={handleSubmit}
        variants={seachVariant}
        initial={"start"}
        animate={
          showSearch && isMidScreen
            ? "show"
            : !showSearch && isMidScreen
            ? "hide"
            : "main"
        }
        className={"center search  relative"}
        ref={ref}
        onClick={() => {
          if (!showSearch) {
            setShowSearch(true);
          }
        }}
      >
        <AiOutlineSearch className="search-icon" />
        {children}
      </motion.form>
    </AnimatePresence>
  );
};

export default SearchWrapper;
