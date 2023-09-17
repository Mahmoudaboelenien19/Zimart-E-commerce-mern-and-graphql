import React from "react";
import { BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { Link as ScrollLink } from "react-scroll";
import clsx from "clsx";
import FadeElement from "@/components/widgets/animation/FadeElement";
import useParams from "@/custom/useParams";
interface Props {
  numOfPages: number;
  page: number;
  to?: string;
}
const Pages = ({ numOfPages, page, to }: Props) => {
  const { setParam } = useParams();
  return (
    <>
      {numOfPages > 1 && (
        <FadeElement cls="" delay={1.5}>
          <div className="pages-par center">
            <ScrollLink
              smooth
              to={to || ""}
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

            <div className="center-pages-par">
              {Array.from({ length: numOfPages })?.map((_, index) => {
                {
                  return (
                    <ScrollLink
                      key={index}
                      className={clsx(
                        "page center bg-green ",
                        page === index + 1 && "page-active"
                      )}
                      smooth
                      delay={1400}
                      to="products"
                      onClick={() => {
                        setParam("page", `${index + 1}`);
                      }}
                    >
                      {" "}
                      {index + 1}
                    </ScrollLink>
                  );
                }
              })}
            </div>

            <ScrollLink
              className={clsx(
                "page center",
                page < numOfPages ? "wheat" : "wheat-lighter"
              )}
              smooth
              delay={1400}
              to="products"
              onClick={() => setParam("page", `${page + 1}`)}
            >
              <BiRightArrowAlt />
            </ScrollLink>
          </div>
        </FadeElement>
      )}
    </>
  );
};
export default Pages;
