import { useMutation } from "@apollo/client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Search_Mutaion } from "../../../graphql/mutations/product";
import { useNavigate } from "react-router-dom";
import { productListContext } from "../../../context/FilterData";
//@ts-ignore
import useKeypress from "react-use-keypress";
import useIndex from "../../../custom/useIndex";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import useClickOutside from "../../../custom/useClickOutside";
import { useAppSelector } from "../../../custom/reduxTypes";
import useIsMobile from "../../../custom/useIsMobile";
import { viewContext } from "../../../context/gridView";
import { mergeRefs } from "react-merge-refs";
import { MdOutlineClear } from "react-icons/md";
import FadeElement from "../../widgets/animation/FadeElement";
import Title from "../../widgets/Title";

const Search = () => {
  const { isMobile } = useIsMobile();

  const { Allproducts } = useAppSelector((st) => st.Allproducts);
  const { setShowSearch, showSearch } = useContext(viewContext);

  const [isActive, setIsActive] = useState(-1);
  const [showRes, setShowRes] = useState(false);
  const [ref, animateFn] = useAnimate();

  const inpRef = useRef<HTMLInputElement>(null);
  const handleInputValue = (val: string) => {
    if (inpRef?.current) {
      inpRef.current.value = val;
    }
  };
  const formRef = useClickOutside<HTMLFormElement>(() => {
    setShowRes(false);

    if (isMobile) {
      setShowSearch(false);
    }
    setIsActive(-1);
  }, showRes || showSearch);
  const {
    setProducts,
    startTransition,
    productSearchWord,
    setroductSearchWord,
    products,
  } = useContext(productListContext);

  const [fnSearch, { data }] = useMutation(Search_Mutaion);

  useEffect(() => {
    setroductSearchWord("");
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setroductSearchWord(e.target.value);
    setShowRes(true);
    setIsActive(-1);

    if (e.target.value != "") {
      fnSearch({
        variables: {
          word: e.target.value,
        },
      }).then(({ data }) =>
        startTransition(() => setProducts(data.searchProducts))
      );
    }
  };

  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inpRef.current && inpRef.current.value != "")
      if (isActive >= 0) {
        navigate(`/${products[isActive]._id}`);
      } else {
        fnSearch({
          variables: {
            word: productSearchWord,
          },
        }).then(({ data }) =>
          startTransition(() => {
            setProducts(data.searchProducts);
          })
        );
        if (inpRef?.current) {
          inpRef.current.value = "";
        }
      }
  };

  const [convertNegativeToZero] = useIndex();
  useKeypress(["ArrowUp", "ArrowDown", "Escape"], (e: React.KeyboardEvent) => {
    const len =
      data?.searchProducts.length >= 5 ? 5 : data?.searchProducts.length;
    if (e.key === "ArrowDown") {
      setIsActive((cur) => convertNegativeToZero(cur + 1, len));
    } else if (e.key === "Escape") {
      setIsActive(-1);

      handleInputValue(productSearchWord);
    } else {
      setIsActive((cur) => convertNegativeToZero(cur - 1, len));
    }
  });
  useEffect(() => {
    if (isActive !== -1) {
      const title = data.searchProducts[isActive].title;
      handleInputValue(title);
    }
  }, [isActive]);

  const seachVariant = {
    hide: {
      borderRadius: "50%",
      height: 30,
      width: 30,
      transition: { duration: 0.2 },
    },
    show: {
      borderRadius: "2%",
      width: "100%",
      transition: { delay: 0.2, duration: 1 },
    },
    main: {
      width: "100%",
      borderRadius: "1%",
    },
  };

  useEffect(() => {
    animateFn(
      ref.current,
      { opacity: [0, 0.2, 0.4, 0.6, 0.8, 1] },
      { delay: 0.6 }
    );

    if (isMobile) {
      setShowSearch(false);
    } else {
      setShowSearch(true);
    }
  }, [isMobile]);
  return (
    <AnimatePresence initial={false}>
      <motion.form
        variants={seachVariant}
        initial={"start"}
        animate={
          showSearch && isMobile
            ? "show"
            : !showSearch && isMobile
            ? "hide"
            : "main"
        }
        className="center search"
        onSubmit={handleSubmit}
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
            key={"search-input"}
            ref={inpRef}
            placeholder="Search By Title or category"
            type="text"
            onChange={handleInputChange}
            // variants={isMobile ? mobileSeachVariant : {}}
            animate={{ display: showSearch ? "block" : "none" }}
            transition={{ delay: isMobile ? 0.3 : 0 }}
          />
        </AnimatePresence>

        <AnimatePresence>
          {productSearchWord !== "" && (
            <Title title="empty search bar" abs={true}>
              <FadeElement cls="search-close">
                <MdOutlineClear
                  onClick={() => {
                    setProducts(Allproducts);

                    setroductSearchWord("");
                    handleInputValue("");
                  }}
                />
              </FadeElement>
            </Title>
          )}
        </AnimatePresence>

        {productSearchWord !== "" && (
          <>
            {showRes && (
              <ul className="dropdown-search col center start">
                {data?.searchProducts.length >= 1 ? (
                  <>
                    {data?.searchProducts
                      .slice(0, 5)
                      .map(
                        (
                          {
                            _id,
                            title,
                          }: { _id: string; title: string; category: string },
                          i: number
                        ) => {
                          return (
                            <>
                              <motion.li
                                onHoverStart={() => {
                                  setIsActive(i);
                                }}
                                className={`search-res  center between ${
                                  i === isActive ? "active" : ""
                                }`}
                                key={_id}
                                onClick={() => {
                                  handleInputValue(title);

                                  navigate(`/${_id}`);
                                }}
                              >
                                {title}
                              </motion.li>
                              <div
                                className="hr "
                                style={{
                                  height: 0.5,
                                  background: "var(--main)",
                                  margin: "0 auto",
                                  display:
                                    i === data?.searchProducts.length - 1 ||
                                    i === 4
                                      ? "none"
                                      : "block",
                                }}
                              >
                                {" "}
                              </div>
                            </>
                          );
                        }
                      )}
                  </>
                ) : (
                  <li className="search-res center">No Results</li>
                )}
              </ul>
            )}
          </>
        )}
      </motion.form>
    </AnimatePresence>
  );
};

export default Search;
