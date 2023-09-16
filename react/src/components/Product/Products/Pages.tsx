import React from "react";
import { BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";

import FadeElement from "../../widgets/animation/FadeElement";
import { Link } from "react-router-dom";
import clsx from "clsx";
interface Props {
  numOfPages: number;
  page: number;
  pathname: string;
}
const Pages = ({ numOfPages, page, pathname }: Props) => (
  <>
    {numOfPages > 1 && (
      <FadeElement cls="" delay={1.5}>
        <div className="pages-par center">
          <Link
            className={clsx(
              "page center",
              page > 1 ? "wheat" : "wheat-lighter"
            )}
            to={{
              pathname,
              search: `${page >= 2 ? `?page=${page - 1}` : pathname}`,
            }}
            key={"prev-page"}
          >
            <BiLeftArrowAlt />
          </Link>

          <div className="center-pages-par">
            {Array.from({ length: numOfPages })?.map((_, index) => {
              {
                return (
                  <Link
                    className={clsx(
                      "page center bg-green ",
                      page === index + 1 && "page-active"
                    )}
                    key={index}
                    to={{
                      pathname,
                      search: `?page=${index + 1}`,
                    }}
                  >
                    {index + 1}
                  </Link>
                );
              }
            })}
          </div>

          <Link
            className={clsx(
              "page center",
              page < numOfPages ? "wheat" : "wheat-lighter"
            )}
            to={{
              pathname,
              search: `?page=${page + 1}`,
            }}
          >
            <BiRightArrowAlt />
          </Link>
        </div>
      </FadeElement>
    )}
  </>
);

export default Pages;
