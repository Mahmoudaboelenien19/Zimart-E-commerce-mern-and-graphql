import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { mergeRefs } from "react-merge-refs";
import { MdOutlineClear } from "react-icons/md";
import FadeElement from "@/components/widgets/animation/FadeElement";
import { productListContext } from "@/context/FilterData";
import { viewContext } from "@/context/gridView";
import { useAppSelector } from "@/custom/reduxTypes";
import useClickOutside from "@/custom/useClickOutside";
import useIsMobile from "@/custom/useIsMobile";
import Title from "@/components/widgets/Title";
import { useDebounce } from "use-debounce";
import useParams from "@/custom/useParams";
import SearchResults from "./SearchResults";
import { seachVariant } from "@/variants/globals";

const Search = () => {
  const { setProducts } = useContext(productListContext);
  const { search, deleteParam, setParam } = useParams();
  const { isMidScreen } = useIsMobile();
  const { Allproducts } = useAppSelector((st) => st.Allproducts);
  const { setShowSearch, showSearch } = useContext(viewContext);

  const [isActive, setIsActive] = useState(-1);
  const [showRes, setShowRes] = useState(false);
  const initialRender = useRef(true);
  const [inpVal, setInpVal] = useState("");
  const [value] = useDebounce(inpVal, 500);
  const [ref, animateFn] = useAnimate();

  const inpRef = useRef<HTMLInputElement>(null);
  const formRef = useClickOutside<HTMLFormElement>(() => {
    setShowRes(false);

    if (isMidScreen) {
      setShowSearch(false);
    }
    setIsActive(-1);
  }, showRes || showSearch);
  const handleInputValue = (val: string) => {
    if (inpRef?.current) {
      inpRef.current.value = val;
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowRes(true);
    setIsActive(-1);
    setInpVal(e.target.value);
  };

  useEffect(() => {
    if (initialRender.current && search) {
      initialRender.current = false;
      return;
    }
    initialRender.current = false;

    if (inpVal) {
      deleteParam("page");
      setParam("search", value);
    } else {
      deleteParam("search");
    }
  }, [value, inpVal]);

  useEffect(() => {
    animateFn(
      ref.current,
      { opacity: [0, 0.2, 0.4, 0.6, 0.8, 1] },
      { delay: 0.6 }
    );

    if (isMidScreen) {
      setShowSearch(false);
    } else {
      setShowSearch(true);
    }
  }, [isMidScreen]);

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
        className="center search"
        ref={mergeRefs([formRef, ref])}
      >
        <button
          className="btn-search center"
          onClick={() => {
            if (!showSearch) {
              setShowSearch(true);
            }
          }}
        >
          <AiOutlineSearch className="search-icon" />
        </button>

        <AnimatePresence>
          <motion.input
            value={search}
            key={"search-input"}
            ref={inpRef}
            placeholder="Search By Title or category"
            type="text"
            onChange={handleInputChange}
            animate={{ display: showSearch ? "block" : "none" }}
          />
        </AnimatePresence>

        <AnimatePresence>
          {search !== "" && (
            <Title title="empty search bar" abs={true}>
              <FadeElement cls="search-close">
                <MdOutlineClear
                  onClick={() => {
                    setProducts(Allproducts);
                    deleteParam("search");
                    handleInputValue("");
                  }}
                />
              </FadeElement>
            </Title>
          )}
        </AnimatePresence>

        {search !== "" && showRes && (
          <SearchResults
            isActive={isActive}
            setIsActive={setIsActive}
            handleInputValue={handleInputValue}
          />
        )}
      </motion.form>
    </AnimatePresence>
  );
};

export default Search;
