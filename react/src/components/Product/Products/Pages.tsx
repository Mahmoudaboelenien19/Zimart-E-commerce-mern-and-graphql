import React from "react";
import { BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { Link as ScrollLink } from "react-scroll";
import clsx from "clsx";
import FadeElement from "@/components/widgets/animation/FadeElement";
import useParams from "@/custom/useParams";
import { AnimatePresence, motion } from "framer-motion";
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
    <FadeElement delay={1} cls="">
      {numOfPages > 1 && (
        <div className="pages-par center">
          <ScrollLink
            smooth
            to={to && page >= 2 ? to : "#"}
            className={clsx(
              "page center",
              page > 1 ? "wheat" : "wheat-lighter"
            )}
            delay={1400}
            onClick={() => {
              if (page >= 2) {
                setParam("page", `${page >= 2 && page - 1}`);
              }
            }}
          >
            <BiLeftArrowAlt />
          </ScrollLink>
          <AnimatePresence initial={false}>
            <div className="center-pages-par">
              {Array.from({ length: numOfPages })?.map((_, index) => {
                {
                  return (
                    <motion.span
                      key={index}
                      initial={{
                        scale: page !== index + 1 ? 1.3 : 1,
                        boxShadow: "0 0 0 000000 ",
                      }}
                      animate={{
                        scale: page === index + 1 ? 1.3 : 1,
                        boxShadow:
                          page === index + 1
                            ? "0.3px 0.3px 0.2px 000000"
                            : "0 0 0 000000 ",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ScrollLink
                        className={clsx("page center bg-green ")}
                        smooth
                        delay={1400}
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
                    </motion.span>
                  );
                }
              })}
            </div>
          </AnimatePresence>
          <ScrollLink
            className={clsx(
              "page center",
              page < numOfPages ? "wheat" : "wheat-lighter"
            )}
            smooth
            delay={1400}
            to={to && numOfPages > page ? to : ""}
            onClick={() =>
              setParam("page", `${numOfPages === page ? page : page + 1}`)
            }
          >
            <BiRightArrowAlt />
          </ScrollLink>
        </div>
      )}
    </FadeElement>
  );
};
export default Pages;
