import { BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { Link as ScrollLink } from "react-scroll";
import clsx from "clsx";
import FadeElement from "@/components/widgets/animation/FadeElement";
import useParams from "@/custom/helpers/useParams";
import { AnimatePresence } from "framer-motion";
import { Fragment } from "react";
interface Props {
  total: number;
  page: number;
  to?: string;
  limit?: number;
}
const Pages = ({ total, page, to, limit = 12 }: Props) => {
  const { setParam } = useParams();
  const numOfPages = Math.ceil(total / limit);
  return (
    <FadeElement delay={1} className="pages-par center w-100">
      {numOfPages > 1 && (
        <Fragment>
          <ScrollLink
            smooth
            to={to && page >= 2 ? to : "#"}
            className={clsx("page center active ", !(page > 1) && "disabled")}
            onClick={() => {
              if (page >= 2) {
                setParam("page", `${page >= 2 && page - 1}`);
              }
            }}
          >
            <BiLeftArrowAlt />
          </ScrollLink>
          <AnimatePresence initial={false}>
            <div className="pages center ">
              {Array.from({ length: numOfPages })?.map((_, index) => {
                {
                  return (
                    <span key={index}>
                      <ScrollLink
                        className={clsx(
                          "page center",
                          page === index + 1 && "active"
                        )}
                        smooth
                        to={to && page !== index + 1 ? to : "#"}
                        onClick={() => {
                          if (page !== index + 1) {
                            setParam("page", `${index + 1}`);
                          }
                        }}
                      >
                        {" "}
                        {index + 1}
                      </ScrollLink>
                    </span>
                  );
                }
              })}
            </div>
          </AnimatePresence>
          <ScrollLink
            className={clsx(
              "page center active ",
              !(page < numOfPages) && "disabled"
            )}
            smooth
            to={to && numOfPages > page ? to : "#"}
            onClick={() =>
              setParam("page", `${numOfPages === page ? page : page + 1}`)
            }
          >
            <BiRightArrowAlt />
          </ScrollLink>
        </Fragment>
      )}
    </FadeElement>
  );
};
export default Pages;
