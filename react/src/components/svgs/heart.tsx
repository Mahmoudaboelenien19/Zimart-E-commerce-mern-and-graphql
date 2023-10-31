import { AiFillHeart } from "react-icons/ai";
import Title from "../widgets/Title";

interface Props {
  fn: () => void;
  isFavoraited: boolean;
}
const HeartSvg = ({ fn, isFavoraited }: Props) => {
  return (
    <Title
      title={
        isFavoraited ? "remove from your wishlist" : "add to your wishlist"
      }
    >
      <AiFillHeart
        onClick={fn}
        size={14}
        color={isFavoraited ? "var(--gmail)" : "var(--third-light)"}
        className="heart"
      />
    </Title>
  );
};

export default HeartSvg;
