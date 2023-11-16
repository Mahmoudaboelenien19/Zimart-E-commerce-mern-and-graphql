import { User } from "@/types/user";
import TrUser from "./TrUser";
import { useAppSelector } from "@/custom/helpers/reduxTypes";

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
        {user?.map((user: User, i: number) => {
          return <TrUser index={i} {...user} key={i} />;
        })}
      </tbody>
    </table>
  );
};

export default DashBoardUsersTable;
