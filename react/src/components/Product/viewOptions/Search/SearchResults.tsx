import { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/custom/helpers/reduxTypes";
import FetchLoading from "@/components/widgets/loaders/FetchLoading";
import useIndex from "@/custom/helpers/useIndex";
//@ts-ignore
import useKeypress from "react-use-keypress";
import useParams from "@/custom/helpers/useParams";
import useIsMobile from "@/custom/helpers/useIsMobile";
interface Props {
  isPending: boolean;
  handleInputValue: (val: string) => void;
}
const SearchResults = ({ handleInputValue, isPending }: Props) => {
  const { Allproducts } = useAppSelector((st) => st.Allproducts);
  const [isActive, setIsActive] = useState(-1);
  const { getParam } = useParams();
  const search = getParam("search") || "";
  useEffect(() => {
    if (isActive !== -1) {
      const title = Allproducts[isActive]?.title || "";
      handleInputValue(title);
    }
  }, [isActive]);
  console.log({ isPending });
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
  const navigate = useNavigate();
  const { isMidScreen } = useIsMobile();
  return (
    <motion.div
      layout
      className="search-drop-par"
      animate={{
        opacity: isMidScreen ? [0, 1] : 1,
      }}
      transition={{
        delay: isMidScreen ? 0.4 : 0,
        ease: "easeInOut",
        duration: 0,
      }}
    >
      {isPending ? (
        <motion.div layout className="pending-search search-res center">
          <FetchLoading />
        </motion.div>
      ) : (
        <>
          {/* i add   Allproducts[0]?._id  as i when i change page i add 12 empty object to reduc to make  the skelton loading but for search results it's shown alittle bit till loading starts so 
        i add  Allproducts[0]?._id   to disable the ul 
        */}
          {Allproducts.length && Allproducts[0]?._id ? (
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
                          layout
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
                        />
                      </Fragment>
                    );
                  }
                )}
              </>
            </ul>
          ) : (
            <div className="pending-search search-res center">
              <span>No Results</span>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default SearchResults;
