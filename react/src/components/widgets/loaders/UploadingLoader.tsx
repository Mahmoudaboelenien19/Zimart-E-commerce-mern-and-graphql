import FadeElement from "../animation/FadeElement";
import GridLoader from "./GridLoader";

const UploadingLoader = ({ bool }: { bool: boolean }) => {
  return (
    <>
      {bool && (
        <FadeElement className="updating">
          <GridLoader className="loading center" />
        </FadeElement>
      )}
    </>
  );
};

export default UploadingLoader;
