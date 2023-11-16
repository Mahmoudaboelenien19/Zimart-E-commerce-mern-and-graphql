import { BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import MainBtn from "../widgets/buttons/MainBtn";
import useModifyUrl from "@/custom/helpers/useModifyUrl";

interface Props {
  head: string;
  intro: string;
  image: string;
  _id: string;
}
const SuggestedBlog = ({ head, intro, image, _id }: Props) => {
  const { getlink } = useModifyUrl();
  return (
    <div key={_id} className="suggested-blog">
      <div key={"img-par"} className={"suggested-blog-img"}>
        <img
          src={getlink(image, 600)}
          alt={head}
          style={{ viewTransitionName: `blog-${_id}` }}
        />
      </div>

      <h4 className="blog-head">
        {head.split(" ").slice(0, 7).join(" ").slice(0, 30)} ...
      </h4>
      <p>{intro.split(" ").slice(0, 20).join(" ")} ...</p>
      <Link
        to={`/blogs/${_id}`}
        unstable_viewTransition
        state={{ showWithoutdelay: true }}
      >
        <MainBtn
          Icon={BiRightArrowAlt}
          btn="see more"
          className="btn  center gap cancel-outline"
          pos="right"
        />
      </Link>
    </div>
  );
};

export default SuggestedBlog;
