import React, { Fragment, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SmallLoader from "@/components/widgets/loaders/SmallLoader";
import { productListContext } from "@/context/FilterData";
import useInnitialRender from "@/custom/useInnitialRender";

interface Props {
  handleInputValue: (val: string) => void;
  isActive: number;
  setIsActive: React.Dispatch<React.SetStateAction<number>>;
}
const SearchResults = ({ setIsActive, isActive }: Props) => {
  const { products, isPending, delayedPending } =
    useContext(productListContext);
  const navigate = useNavigate();
  const { isInitialRender } = useInnitialRender();
  return (
    <>
      {!isPending &&
      !delayedPending &&
      products.length >= 1 &&
      !isInitialRender ? (
        <ul className="dropdown-search col center start">
          <>
            {products
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
                            i === products.length - 1 || i === 4
                              ? "none"
                              : "block",
                        }}
                      ></div>
                    </Fragment>
                  );
                }
              )}
          </>
        </ul>
      ) : (
        <div className="pending-search search-res center">
          {isPending || delayedPending || isInitialRender ? (
            <SmallLoader />
          ) : (
            <span>No Results</span>
          )}
        </div>
      )}
    </>
  );
};

export default SearchResults;
