import React, { Fragment, useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SmallLoader from "@/components/widgets/loaders/SmallLoader";
import { productListContext } from "@/context/ProductsContext";
import FadeElement from "@/components/widgets/animation/FadeElement";

interface Props {
  isActive: number;
  setIsActive: React.Dispatch<React.SetStateAction<number>>;
  isPending: boolean;
  showSearch: boolean;
}
const SearchResults = ({
  setIsActive,
  isActive,
  isPending,
  showSearch,
}: Props) => {
  const { products } = useContext(productListContext);
  const navigate = useNavigate();
  return (
    <>
      {showSearch && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0 }}
        >
          {products.length >= 1 && !isPending ? (
            <ul className="dropdown-search col center start">
              <>
                {products
                  .slice(0, 5)
                  .map(
                    (
                      ob: { _id: string; title: string; category: string },
                      i: number
                    ) => {
                      return (
                        <Fragment key={ob?.title || i}>
                          <motion.li
                            onHoverStart={() => {
                              setIsActive(i);
                            }}
                            className={`search-res  center between ${
                              i === isActive ? "active" : ""
                            }`}
                            onClick={() => {
                              if (ob?._id) {
                                navigate(`/${ob?._id}`);
                              }
                            }}
                          >
                            {ob?.title}
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
              {isPending ? <SmallLoader /> : <span>No Results</span>}
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};

export default SearchResults;
