import { Link } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
const HomeLink = () => {
  return (
    <Link to="/" className="center gap home-link">
      <BiLeftArrowAlt color="var(--third-light)" />
      <span> Home</span>
    </Link>
  );
};

export default HomeLink;
