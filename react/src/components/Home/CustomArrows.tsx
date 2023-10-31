import { GrPrevious, GrNext } from "react-icons/gr";
import FadeElement from "../widgets/animation/FadeElement";
const CustomArrows = () => {
  return (
    <FadeElement delay={0.8} style={{ position: "static" }}>
      <div className="next-slide center custom-arrow">
        <GrPrevious size={14} />
      </div>
      <div className="prev-slide center custom-arrow">
        <GrNext size={14} />
      </div>
    </FadeElement>
  );
};

export default CustomArrows;
