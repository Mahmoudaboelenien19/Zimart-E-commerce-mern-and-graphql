import "./blogs.scss";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import Blog from "./MainBlog";
import { useAppSelector, useAppDispatch } from "@/custom/helpers/reduxTypes";
import { getAllBlogs } from "@/graphql/blog";
import { Blog as BlogType } from "@/types/blog";
import { addToBlogsRedux } from "@/redux/BlogsSlice";
import Container from "../widgets/shared/Container";
import useTitle from "@/custom/helpers/useTitle";

export const Component = () => {
  useTitle("Blogs");
  const { blogs } = useAppSelector((st) => st.blogs);
  const { data } = useQuery(getAllBlogs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data?.blogs && !blogs.length) {
      dispatch(addToBlogsRedux(data.blogs));
    }
  }, [data]);

  return (
    <Container className={"blogs  main-txt"}>
      {data?.blogs?.map((blog: BlogType, i: number) => {
        return <Blog key={i} i={i} {...blog} />;
      })}
    </Container>
  );
};
