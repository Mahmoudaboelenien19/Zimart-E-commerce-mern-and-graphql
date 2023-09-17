import useIndex from "@/custom/useIndex";
import React, { Fragment, useContext, useEffect } from "react";
//@ts-ignore
import useKeypress from "react-use-keypress";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search_Mutaion } from "@/graphql/mutations/product";
import { useMutation } from "@apollo/client";
import { productListContext } from "@/context/FilterData";
import useParams from "@/custom/useParams";
import { useAppSelector } from "@/custom/reduxTypes";
import SmallLoader from "@/components/widgets/loaders/SmallLoader";

interface Props {
  handleInputValue: (val: string) => void;
  isActive: number;
  setIsActive: React.Dispatch<React.SetStateAction<number>>;
}
const SearchResults = ({ handleInputValue, setIsActive, isActive }: Props) => {
  const { search } = useParams();
  const { startTransition, setProducts } = useContext(productListContext);
  const [fnSearch, { data, loading }] = useMutation(Search_Mutaion);
  const { Allproducts } = useAppSelector((st) => st.Allproducts);
  useEffect(() => {
    if (isActive !== -1) {
      const title = data?.searchProducts[isActive].title;
      handleInputValue(title);
    }
  }, [isActive]);

  useEffect(() => {
    if (search != "") {
      fnSearch({
        variables: {
          word: search,
        },
      }).then(({ data }) =>
        startTransition(() => setProducts(data?.searchProducts))
      );
    } else {
      setProducts(Allproducts);
      handleInputValue("");
    }
  }, [search]);

  const [convertNegativeToZero] = useIndex();
  const navigate = useNavigate();
  useKeypress(["ArrowUp", "ArrowDown", "Escape"], (e: React.KeyboardEvent) => {
    const len =
      data?.searchProducts.length >= 5 ? 5 : data?.searchProducts.length;
    if (e.key === "ArrowDown") {
      setIsActive((cur) => convertNegativeToZero(cur + 1, len));
    } else if (e.key === "Escape") {
      setIsActive(-1);
      handleInputValue(search);
    } else {
      setIsActive((cur) => convertNegativeToZero(cur - 1, len));
    }
  });

  return (
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
                  <Fragment key={title}>
                    <motion.li
                      onHoverStart={() => {
                        setIsActive(i);
                      }}
                      className={`search-res  center between ${
                        i === isActive ? "active" : ""
                      }`}
                      onClick={() => {
                        navigate(`/${_id}`);
                      }}
                    >
                      {title}
                    </motion.li>
                    <div
                      className="hr "
                      style={{
                        height: 0.5,
                        background: "var(--wheat-lighter)",
                        margin: "0 auto",
                        display:
                          i === data?.searchProducts.length - 1 || i === 4
                            ? "none"
                            : "block",
                      }}
                    ></div>
                  </Fragment>
                );
              }
            )}
        </>
      ) : (
        <li className="search-res center">
          {!loading && data ? <span>No Results</span> : <SmallLoader />}
        </li>
      )}
    </ul>
  );
};

export default SearchResults;
