import { BallTriangle } from "react-loader-spinner";

interface Props {
  className: string;
}
const GridLoader = ({ className }: Props) => {
  return (
    <div className={`${className}`}>
      <BallTriangle
        height={30}
        width={30}
        radius={4}
        color="gray"
        ariaLabel="ball-triangle-loading"
      />
    </div>
  );
};

export default GridLoader;
