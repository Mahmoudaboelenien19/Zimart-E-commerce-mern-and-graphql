import { useEffect } from "react";
import SuggestedBlog from "./SuggestedBlog";
import { stagger, useAnimate, useInView } from "framer-motion";
import { useLazyQuery } from "@apollo/client";
import { useAppSelector, useAppDispatch } from "@/custom/helpers/reduxTypes";
import { getAllBlogs } from "@/graphql/blog";
import { addToBlogsRedux } from "@/redux/BlogsSlice";

const SuggestedBlogs = ({ id }: { id: string }) => {
  const { blogs } = useAppSelector((st) => st.blogs);
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, { once: true });

  const [getAllblogs] = useLazyQuery(getAllBlogs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!blogs?.length) {
      getAllblogs().then(({ data }) => {
        dispatch(addToBlogsRedux(data?.blogs));
      });
    }
  }, []);

  useEffect(() => {
    if (inView && blogs.length >= 1) {
      animate(
        " .suggested-blog",
        { opacity: [0, 0.5, 1], x: [100, 0] },
        { delay: stagger(1, { startDelay: 0.5 }), duration: 0.2 }
      );
    }
  }, [inView, blogs]);

  return (
    <div className="suggested-blogs" ref={scope}>
      {blogs
        ?.filter((ob) => ob._id != id)
        .slice(0, 2)
        .map((ob, i) => {
          return <SuggestedBlog key={ob._id} {...ob} />;
        })}
    </div>
  );
};

export default SuggestedBlogs;
