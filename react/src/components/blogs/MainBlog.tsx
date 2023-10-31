import MainBtn from "../widgets/buttons/MainBtn";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BiRightArrowAlt } from "react-icons/bi";
import { BlogInterface } from "@/interfaces/blog";
import useModifyUrl from "@/custom/useModifyUrl";
import InViewAnimation from "../widgets/animation/InViewAnimation";

interface Props extends BlogInterface {
  i: number;
}
const Blog = ({ head, intro, image, _id, i }: Props) => {
  const navigate = useNavigate();

  const { getlink } = useModifyUrl();

  return (
    <InViewAnimation className={"main-blog-container "}>
      <div className={"main-blog"}>
        <LazyLoadImage
          effect="blur"
          wrapperClassName="w-100 img-par"
          src={getlink(image, 600)}
          alt={head}
        />

        <div className="main-blog-content w-100">
          <h2 className=" header">{head}</h2>
          <p>{intro}</p>
          <MainBtn
            Icon={BiRightArrowAlt}
            btn="see more"
            className="btn cancel-outline center gap blog-btn"
            onClick={() => navigate(`/blogs/${_id}`)}
            pos="right"
          />
        </div>
      </div>
    </InViewAnimation>
  );
};

export default Blog;
