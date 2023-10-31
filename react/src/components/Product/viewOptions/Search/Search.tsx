import { startTransition, useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { mergeRefs } from "react-merge-refs";
import { MdOutlineClear } from "react-icons/md";
import FadeElement from "@/components/widgets/animation/FadeElement";
import useClickOutside from "@/custom/useClickOutside";
import useIsMobile from "@/custom/useIsMobile";
import Title from "@/components/widgets/Title";
import { useDebounce } from "use-debounce";
import useParams from "@/custom/useParams";
import SearchResults from "./SearchResults";
import { seachVariant } from "@/lib/variants/globals";
import { Search_Mutaion } from "@/graphql/mutations/product";
import { useMutation } from "@apollo/client";
import useIndex from "@/custom/useIndex";
//@ts-ignore
import useKeypress from "react-use-keypress";
import { useAppDispatch, useAppSelector } from "@/custom/reduxTypes";
import {
  addToProductRedux,
  changeTotalProductsCount,
  skeltonProductSlice,
} from "@/redux/productSlice";

type Props = {
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
};
const Search = ({ showSearch, setShowSearch }: Props) => {
  const dispatch = useAppDispatch();
  const { Allproducts } = useAppSelector((st) => st.Allproducts);
  const [isActive, setIsActive] = useState(-1);
  const [showRes, setShowRes] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { search, deleteParam, setParam, getParam } = useParams();
  const [inpVal, setInpVal] = useState(search || "");
  const { isMidScreen, isMobile } = useIsMobile();
  const [fnSearch] = useMutation(Search_Mutaion);
  const [ref, animateFn] = useAnimate();
  const [value] = useDebounce(inpVal, 1000);
  const page = getParam("page") || 1;
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
    startTransition(() => {
      setInpVal(e.target.value);
      setShowRes(true);
      setIsActive(-1);
      setParam("search", e.target.value);
      deleteParam("page");
    });

    if (e.target.value === "") {
      deleteParam("search");
    }
  };

  useEffect(() => {
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

  useEffect(() => {
    if (isActive !== -1) {
      const title = Allproducts[isActive]?.title || "";
      handleInputValue(title);
    }
  }, [isActive]);

  const [convertNegativeToZero] = useIndex();

  useKeypress(["ArrowUp", "ArrowDown", "Escape"], (e: React.KeyboardEvent) => {
    const len = Allproducts.length >= 5 ? 5 : Allproducts.length;
    if (e.key === "ArrowDown") {
      setIsActive((cur) => convertNegativeToZero(cur + 1, len));
    } else if (e.key === "Escape") {
      setIsActive(-1);
      handleInputValue(search);
    } else {
      setIsActive((cur) => convertNegativeToZero(cur - 1, len));
    }
  });

  useEffect(() => {
    if (value != "") {
      dispatch(skeltonProductSlice());
      setIsPending(true);
      deleteParam("isFilterApplied");
      deleteParam("catFilter");
      deleteParam("sort");
      fnSearch({
        variables: {
          word: value,
          skip: Number(page) >= 2 ? 12 * (Number(page) - 1) : 0,
          limit: 12,
        },
      }).then(({ data }) => {
        const pro = data?.searchProducts;
        dispatch(addToProductRedux(pro?.products || []));
        dispatch(changeTotalProductsCount(pro?.totalProducts || 0));
        setIsPending(false);
      });
    }
  }, [page, value]);

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
        className={"center search  "}
        ref={mergeRefs([formRef, ref])}
      >
        <button
          className={"btn-search center"}
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
            key={"search-input"}
            ref={inpRef}
            defaultValue={inpVal}
            placeholder="Search By Title or category"
            type="text"
            onChange={handleInputChange}
            animate={{ display: showSearch ? "block" : "none" }}
          />
        </AnimatePresence>

        <AnimatePresence>
          {search !== "" && showSearch && (
            <Title title="empty search bar" abs={true}>
              <FadeElement className="search-close">
                <MdOutlineClear
                  onClick={() => {
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
            isPending={isPending}
            showSearch={showSearch}
          />
        )}
      </motion.form>
    </AnimatePresence>
  );
};

export default Search;
