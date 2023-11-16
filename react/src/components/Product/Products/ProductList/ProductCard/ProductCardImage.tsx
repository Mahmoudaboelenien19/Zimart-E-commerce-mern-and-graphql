import useModifyUrl from "@/custom/helpers/useModifyUrl";
import useParams from "@/custom/helpers/useParams";
import clsx from "clsx";
import Skeleton from "react-loading-skeleton";
import { unstable_useViewTransitionState } from "react-router-dom";
type Props = {
  _id: string;
  path: string;
  isSLide: boolean;
};
const ProductCardImage = ({ _id, path, isSLide }: Props) => {
  const { getlink } = useModifyUrl();
  const vt = unstable_useViewTransitionState(`/product/${_id}`);
  const { getParam } = useParams();

  const view = getParam("view") || "grid";

  return (
    <>
      {" "}
      {_id ? (
        <picture
          className={clsx("img-par center", view === "grid" ? "grid" : "list")}
        >
          <img
            style={{
              viewTransitionName: vt && !isSLide ? `view-${_id}` : "",
            }}
            width={300}
            src={getlink(path, 300)}
          />
        </picture>
      ) : (
        <Skeleton
          circle
          width={200}
          height={200}
          containerClassName={clsx(
            "img-par center",
            view === "grid" ? "grid" : "list"
          )}
        />
      )}
    </>
  );
};

export default ProductCardImage;
