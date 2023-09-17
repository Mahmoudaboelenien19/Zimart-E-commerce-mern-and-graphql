import React, { useEffect } from "react";

import SuggestedBlog from "./SuggestedBlog";
import { stagger, useAnimate, useInView } from "framer-motion";

import { useLazyQuery } from "@apollo/client";
import { useAppSelector, useAppDispatch } from "@/custom/reduxTypes";
import { getAllBlogs } from "@/graphql/blog";
import { addToBlogsRedux } from "@/redux/BlogsSlice";

const SuggestedBlogs = ({ id }: { id: string }) => {
  const { blogs } = useAppSelector((st) => st.blogs);

  const [scope, animate] = useAnimate();
  const inView = useInView(scope, { once: true });

  const [getAllQueries] = useLazyQuery(getAllBlogs);
  const dispatch = useAppDispatch();

  //this is because if user goes direct to blog route when blogs at redux empty
  useEffect(() => {
    if (!blogs?.length) {
      getAllQueries().then(({ data }) => {
        dispatch(addToBlogsRedux(data?.blogs));
      });
    }
  }, []);

  useEffect(() => {
    if (inView && blogs.length >= 1) {
      animate(
        " .suggested-blog",
        { opacity: [0, 0.5, 1], x: [200, 0] },
        { delay: stagger(1, { startDelay: 2 }), duration: 0.5 }
      );
    }
  }, [inView, blogs]);
  return (
    <div className="suggested-blogs" ref={scope}>
      {blogs
        ?.filter((ob) => ob._id != id)
        .slice(0, 2)
        .map((ob, i) => {
          return <SuggestedBlog key={i} {...ob} />;
        })}
    </div>
  );
};

export default SuggestedBlogs;
