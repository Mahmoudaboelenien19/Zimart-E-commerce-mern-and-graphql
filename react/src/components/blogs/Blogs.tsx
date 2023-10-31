import "./blogs.scss";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import Blog from "./MainBlog";
import { useAppSelector, useAppDispatch } from "@/custom/reduxTypes";
import { getAllBlogs } from "@/graphql/blog";
import { BlogInterface } from "@/interfaces/blog";
import { addToBlogsRedux } from "@/redux/BlogsSlice";

import clsx from "clsx";
import Container from "../widgets/shared/Container";

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
    <Container className={clsx("blogs  main-txt")}>
      {data?.blogs?.map((blog: BlogInterface, i: number) => {
        return <Blog key={i} i={i} {...blog} />;
      })}
    </Container>
  );
};
