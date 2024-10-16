import UserTable from "./UserTable";
import "../styles/GeneralStyles.css";

const Users = () => {
  return (
    <div className="view">
      <div className="header"></div>
      <div>
        <UserTable />
      </div>
    </div>
  );
};

export default Users;
