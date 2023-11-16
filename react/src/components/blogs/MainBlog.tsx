import MainBtn from "../widgets/buttons/MainBtn";
import {
  Link,
  unstable_useViewTransitionState,
  useLocation,
} from "react-router-dom";

import { BiRightArrowAlt } from "react-icons/bi";
import { Blog as BlogType } from "@/types/blog";
import useModifyUrl from "@/custom/helpers/useModifyUrl";

type Props = {
  i: number;
} & BlogType;
const Blog = ({ head, intro, image, _id, i }: Props) => {
  const { getlink } = useModifyUrl();
  const { pathname } = useLocation();
  const vt = unstable_useViewTransitionState(pathname);

  return (
    <div className={"main-blog-container  border"}>
      <div className={"main-blog"}>
        <picture
          className="w-100 img-par"
          style={{
            viewTransitionName: vt ? `blog-${_id}` : "",
            contain: "layout",
          }}
        >
          <img src={getlink(image, 600)} alt={head} />
        </picture>

        <div className="main-blog-content w-100">
          <h2 className=" header">{head}</h2>
          <p>{intro}</p>
          <Link
            to={`/blogs/${_id}`}
            unstable_viewTransition
            className="blog-btn"
          >
            <MainBtn
              Icon={BiRightArrowAlt}
              btn="see more"
              className="btn cancel-outline center gap "
              pos="right"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Blog;
