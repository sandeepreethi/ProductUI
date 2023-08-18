import { useEffect, useState } from "react";
import CRUD from "./crud";
import Login from "./login";
import MenuBar from "./menubar";

const Dashboard = () => {
  debugger;
  const [authenticated, setauthenticated] = useState(null);
  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("UserData");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);

  if (!authenticated) {
    <Login />;
  } else {
    return (
      <div>
        <MenuBar />
        <CRUD />
      </div>
    );
  }
};

export default Dashboard;
