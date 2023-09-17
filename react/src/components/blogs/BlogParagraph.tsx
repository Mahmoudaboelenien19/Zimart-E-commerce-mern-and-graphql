import { BlogPragraph } from "@/interfaces/blog";
import React from "react";

interface Props extends BlogPragraph {
  i: number;
}
const BlogParagraph = ({ i, title, paragraph }: Props) => {
  return (
    <div className="blog-pargraph">
      <h4 className="blog-head">
        {i + 1} - {title}
      </h4>
      <p>{paragraph}</p>
    </div>
  );
};

export default BlogParagraph;
