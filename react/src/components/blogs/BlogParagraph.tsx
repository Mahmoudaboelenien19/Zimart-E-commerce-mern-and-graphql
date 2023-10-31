import { BlogPragraph } from "@/interfaces/blog";
import InViewAnimation from "../widgets/animation/InViewAnimation";

interface Props extends BlogPragraph {
  i: number;
}
const BlogParagraph = ({ i, title, paragraph }: Props) => {
  return (
    <InViewAnimation className="blog-pargraph">
      <h3 className="blog-head">
        {i + 1} - {title}
      </h3>
      <p>{paragraph}</p>
    </InViewAnimation>
  );
};

export default BlogParagraph;
