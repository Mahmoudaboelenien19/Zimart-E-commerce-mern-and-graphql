import React, { useEffect, useRef } from "react";
import { motion, stagger, useInView } from "framer-motion";
import { BlogInterface } from "../../interfaces/blog";
import MainBtn from "../widgets/buttons/MainBtn";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BiRightArrowAlt } from "react-icons/bi";
import { useAnimate } from "framer-motion";

interface Props extends BlogInterface {
  i: number;
}
const Blog = ({
  head,
  intro,
  end,
  image,
  _id,
  i,
  content: [{ title, paragraph }],
}: Props) => {
  const navigate = useNavigate();
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, { once: true, amount: 0.5 });
  const isReversed = i === 0 || i % 2 === 0;

  useEffect(() => {
    if (inView) {
      animate(
        ".main-img-blog , img",
        { x: isReversed ? [-200, 0] : [200, 0], opacity: [0, 1] },
        { duration: 0.3, opacity: { delay: 0.1, duration: 0.3 } }
      )
        .then(() =>
          animate(
            ".blog-background",
            { opacity: [0, 0.4] },
            { duration: 0.3, opacity: { delay: 0.5, duration: 0.3 } }
          )
        )
        .then(() =>
          animate(".main-blog-content", { opacity: [0, 1] }, { duration: 0.3 })
        );
    }
  }, [inView]);
  return (
    <div
      ref={scope}
      className={`main-blog ${isReversed ? "" : "blog-reversed"}`}
    >
      <div className="main-img-blog">
        <LazyLoadImage effect="blur" src={image} alt={head} />{" "}
        <div className="blog-background"></div>
      </div>

      <div className="main-blog-content">
        <h3 className="blog-head">{head}</h3>
        <p>{intro.split(" ").slice(0, 50).join(" ")} ...</p>
        <MainBtn
          Icon={BiRightArrowAlt}
          btn="see more"
          cls="btn main center gap blog-btn"
          fn={() => navigate(`/blogs/${_id}`)}
          pos="right"
        />
      </div>
    </div>
  );
};

export default Blog;
