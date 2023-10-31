import "./blogs.scss";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import Blog from "./MainBlog";
import { useAppSelector, useAppDispatch } from "@/custom/reduxTypes";
import { getAllBlogs } from "@/graphql/blog";
import { BlogInterface } from "@/interfaces/blog";
import { addToBlogsRedux } from "@/redux/BlogsSlice";
import Container from "../widgets/shared/Container";
import useTitle from "@/custom/useTitle";
import Transition from "../widgets/animation/transition/Transition";

export const Component = () => {
  useTitle("Blogs");
  const { blogs } = useAppSelector((st) => st.blogs);
  const { data } = useQuery(getAllBlogs);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data?.blogs && !blogs.length) {
      //this condition not to be added again
      dispatch(addToBlogsRedux(data.blogs));
    }
  }, [data]);

  return (
    <Container className={"blogs  main-txt"}>
      <Transition />
      {data?.blogs?.map((blog: BlogInterface, i: number) => {
        return <Blog key={i} i={i} {...blog} />;
      })}
    </Container>
  );
};
