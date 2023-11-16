type Props = {
  head: string;
};
const Header = ({ head }: Props) => {
  return <h2 className="header">{head}</h2>;
};

export default Header;
