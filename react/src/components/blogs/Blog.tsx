import "./blogs.scss";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BlogParagraph from "./BlogParagraph";
import SuggestedBlogs from "./SuggestedBlogs";
import { motion } from "framer-motion";
import { getSingleBlog } from "@/graphql/blog";
import { BlogPragraph } from "@/interfaces/blog";
import useModifyUrl from "@/custom/useModifyUrl";
import FadeElement from "../widgets/animation/FadeElement";
import clsx from "clsx";
export const Component = () => {
  const { id } = useParams();

  const { data, loading } = useQuery(getSingleBlog, {
    variables: { id },
  });

  useEffect(() => {
    document.title = data?.blog.head || "Zimart";
  }, [loading]);

  if (data?.blog) {
    const { head, intro, end, image, content } = data.blog;
    const { getlink } = useModifyUrl();
    return (
      <div className={clsx("blog main-txt")}>
        <div className="blog-details">
          <h1>{head}</h1>
          <motion.div className="blog-img">
            <LazyLoadImage
              effect="blur"
              wrapperClassName="w-100 h-100"
              src={getlink(image, 1000)}
              alt={head}
            />
          </motion.div>
          <FadeElement delay={0.3}>
            <p>{intro}</p>
            {content.map((obj: BlogPragraph, i: number) => {
              return <BlogParagraph key={i} i={i} {...obj} />;
            })}
          </FadeElement>

          <p>{end}</p>
        </div>
        <SuggestedBlogs id={id || ""} />
      </div>
    );
  } else {
    return <> no data</>;
  }
};
