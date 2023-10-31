import { Fragment } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/custom/reduxTypes";
import FetchLoading from "@/components/widgets/loaders/FetchLoading";

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
  const { Allproducts } = useAppSelector((st) => st.Allproducts);

  const navigate = useNavigate();
  return (
    <>
      {showSearch && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0 }}
        >
          {Allproducts.length >= 1 && !isPending ? (
            <ul className="dropdown-search col center start">
              <>
                {Allproducts.slice(0, 5).map(
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
                              i === Allproducts.length - 1 || i === 4
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
              {isPending ? <FetchLoading /> : <span>No Results</span>}
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};

export default SearchResults;
