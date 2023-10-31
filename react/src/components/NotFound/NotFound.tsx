import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import FadeElement from "../widgets/animation/FadeElement";
import "./error.scss";
const NotFound = () => {
  const navigate = useNavigate();
  const backToHome = () => {
    navigate("/");
  };
  return (
    <div className="error center">
      <FadeElement className="center   col ">
        <h1>page Not Found</h1>
        <p>
          looks like you&apos;re followed a broken link o entered a url that
          dosen&apos;t exist on this site
        </p>
        <button className="btn center gap " onClick={backToHome}>
          <HiOutlineArrowNarrowLeft />

          <span>Back to Our Site</span>
        </button>
      </FadeElement>
    </div>
  );
};

export default NotFound;
