import "./blogs.scss";
import { useQuery } from "@apollo/client";
import React, { useContext, useEffect } from "react";
import Blog from "./MainBlog";
import { useAppSelector, useAppDispatch } from "@/custom/reduxTypes";
import { getAllBlogs } from "@/graphql/blog";
import { BlogInterface } from "@/interfaces/blog";
import { addToBlogsRedux } from "@/redux/BlogsSlice";
import { themeContext } from "@/context/ThemContext";
import clsx from "clsx";

export const Component = () => {
  const { theme } = useContext(themeContext);
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
    <div className=" container w-100 h-100">
      <div className={clsx("blogs  main-txt", theme)}>
        {data?.blogs?.map((blog: BlogInterface, i: number) => {
          return <Blog key={i} i={i} {...blog} />;
        })}
      </div>
    </div>
  );
};
