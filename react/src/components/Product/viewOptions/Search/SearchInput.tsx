import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineClear } from "react-icons/md";
import FadeElement from "@/components/widgets/animation/FadeElement";
import Title from "@/components/widgets/Title";
import useParams from "@/custom/helpers/useParams";
import SearchResults from "./SearchResults";
import useIsMobile from "@/custom/helpers/useIsMobile";
import useSearch from "./useSearch";

type Props = {
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
};
const SearchInput = ({ showSearch, setShowSearch }: Props) => {
  const { search = "", deleteParam } = useParams();
  const [inpVal, setinpVal] = useState(search);
  const { loading, showRes, setShowRes } = useSearch(inpVal);

  const inpRef = useRef<HTMLInputElement>(null);

  const handleInputValue = (val: string) => {
    if (inpRef?.current) {
      inpRef.current.value = val;
    }
  };
  const initialRender = useRef(true);
  useEffect(() => {
    if (search && initialRender.current) {
      handleInputValue(search);
    }
    initialRender.current = false;
    if (!search) {
      handleInputValue("");
    }
  }, [search]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinpVal(e.target.value);

    if (e.target.value === "") {
      deleteParam("search");
    }
  };

  const { isMidScreen } = useIsMobile();
  useEffect(() => {
    if (showSearch && isMidScreen) {
      inpRef.current?.focus();
    }
  }, [showSearch]);
  return (
    <>
      <input
        key={"search-input"}
        ref={inpRef}
        placeholder="Search By Title or category"
        type="text"
        onChange={handleInputChange}
        onBlur={() => {
          setShowRes(false);

          if (isMidScreen && inpVal === "") {
            setShowSearch(false);
          }
        }}
        onFocus={() => setShowRes(true)}
      />
      <motion.span
        animate={{
          opacity: isMidScreen && showSearch ? [0, 1] : 1,
          transition: { delay: 0.4, duration: 0.1 },
        }}
      >
        <AnimatePresence>
          {search !== "" && showSearch && (
            <FadeElement className="search-close" key="clar-search">
              <Title title="empty search bar" abs={true}>
                <MdOutlineClear
                  onClick={() => {
                    deleteParam("search");
                    handleInputValue("");
                    setinpVal("");
                  }}
                />
              </Title>
            </FadeElement>
          )}
        </AnimatePresence>
      </motion.span>

      {((search && showRes && showSearch) || loading) && (
        <SearchResults
          isPending={loading}
          handleInputValue={handleInputValue}
        />
      )}
    </>
  );
};

export default SearchInput;
