import Container from "../widgets/shared/Container";
import UserImage from "./UserImage";
import UserInfo from "./UserInfo";
import "./user.scss";
export const Component = () => {
  return (
    <Container className="user-page">
      <UserImage />
      <UserInfo />
    </Container>
  );
};
