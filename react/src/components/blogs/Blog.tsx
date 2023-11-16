import "./blogs.scss";
import { useLazyQuery } from "@apollo/client";
import {
  unstable_useViewTransitionState,
  useLocation,
  useParams,
} from "react-router-dom";
import BlogParagraph from "./BlogParagraph";
import SuggestedBlogs from "./SuggestedBlogs";
import { motion } from "framer-motion";
import { getSingleBlog } from "@/graphql/blog";
import { BlogPragraph } from "@/types/blog";
import FadeElement from "../widgets/animation/FadeElement";
import useTitle from "@/custom/helpers/useTitle";
import useModifyUrl from "@/custom/helpers/useModifyUrl";
import { useAppSelector } from "@/custom/helpers/reduxTypes";
import { useEffect } from "react";
import useInnitialRender from "@/custom/helpers/useInnitialRender";
export const Component = () => {
  const { id } = useParams();
  const { blogs } = useAppSelector((st) => st.blogs);
  const [fn, { data }] = useLazyQuery(getSingleBlog, {
    variables: { id },
  });
  const index = blogs.findIndex((blog) => id === blog._id);

  useEffect(() => {
    if (index === -1) {
      fn();
    }
  }, [id]);
  const { head, intro, end, image, content } = blogs[index] || data?.blog || {};
  useTitle(head, head);
  const { getlink } = useModifyUrl();
  const { pathname, state } = useLocation();
  const vt = unstable_useViewTransitionState(pathname);
  const { isInitialRender } = useInnitialRender(200, false);
  return (
    <div className={"blog main-txt"}>
      {head && (
        <>
          <div className="blog-details">
            <h2>{head}</h2>
            <motion.div className="blog-img ">
              <picture
                className="w-100 h-100 "
                style={{
                  viewTransitionName: vt ? `blog-${id}` : "",
                  contain: "layout",
                }}
              >
                <img src={getlink(image, 600)} alt={head} />
              </picture>
            </motion.div>
            <FadeElement delay={0.3}>
              <p>{intro}</p>
              {content.map((obj: BlogPragraph, i: number) => {
                return <BlogParagraph key={i} i={i} {...obj} />;
              })}
            </FadeElement>

            <p>{end}</p>
          </div>
          {/* this check case i need to delay suggestedblogs component if i came from blogs
          but i click on suggested blog i need no delay
          */}
          {(isInitialRender || state?.showWithoutdelay) && (
            <SuggestedBlogs id={id || ""} />
          )}
        </>
      )}
    </div>
  );
};
