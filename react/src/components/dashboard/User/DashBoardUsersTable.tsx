import TrUser from "./TrUser";
import { UserInterface } from "@/interfaces/user.interface";
import { useAppSelector } from "@/custom/reduxTypes";

const DashBoardUsersTable = () => {
  const { user } = useAppSelector((st) => st.user);
  return (
    <table className="dash-table ">
      <thead>
        <tr>
          <th> username</th>
          <th>email</th>
          <th> createdAt </th>
          <th> last in </th>
          <th style={{ width: 150 }}> order state </th>
        </tr>
      </thead>
      <tbody>
        {user?.map((user: UserInterface, i: number) => {
          return <TrUser index={i} {...user} key={i} />;
        })}
      </tbody>
    </table>
  );
};

export default DashBoardUsersTable;
