import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import Blog from "./MainBlog";

import Animation from "../widgets/animation/Animation";
import { useAppSelector, useAppDispatch } from "@/custom/reduxTypes";
import { getAllBlogs } from "@/graphql/blog";
import { BlogInterface } from "@/interfaces/blog";
import { addToBlogsRedux } from "@/redux/BlogsSlice";

export const Component = () => {
  useEffect(() => {
    document.title = "Blogs";
  }, []);
  const { blogs } = useAppSelector((st) => st.blogs);
  const { data } = useQuery(getAllBlogs);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (data?.blogs && !blogs.length) {
      dispatch(addToBlogsRedux(data.blogs));
    }
  }, [data]);
  return (
    <Animation>
      <div className="blogs container">
        <>
          {data?.blogs?.map((blog: BlogInterface, i: number) => {
            return <Blog key={i} i={i} {...blog} />;
          })}
        </>
      </div>
    </Animation>
  );
};
