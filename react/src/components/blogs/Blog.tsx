import "./blogs.scss";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import BlogParagraph from "./BlogParagraph";
import SuggestedBlogs from "./SuggestedBlogs";
import { motion } from "framer-motion";
import { getSingleBlog } from "@/graphql/blog";
import { BlogPragraph } from "@/interfaces/blog";
import useModifyUrl from "@/custom/useModifyUrl";
import FadeElement from "../widgets/animation/FadeElement";
import useTitle from "@/custom/useTitle";
import Container from "../widgets/shared/Container";
import Transition from "../widgets/animation/transition/Transition";
export const Component = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(getSingleBlog, {
    variables: { id },
  });

  useTitle(data?.blog.head, loading);
  if (data?.blog) {
    const { head, intro, end, image, content } = data.blog;
    const { getlink } = useModifyUrl();
    return (
      <Container className={"blog main-txt"}>
        <Transition />
        <div className="blog-details">
          <h2>{head}</h2>
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
      </Container>
    );
  } else {
    return <> no data</>;
  }
};
