import { useEffect, useState } from "react";
import CRUD from "./crud";
import Login from "./login";
import NoPage from "./nopage";

const Dashboard = () => {
    debugger;
  const [authenticated, setauthenticated] = useState(null);
  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("UserData");
debugger;
    if (loggedInUser ) {
      setauthenticated(loggedInUser);
      
    }
  }, []);

  
  if (!authenticated) {
  <Login/>

  } else {
    return (
      <div>
        <CRUD/>
      </div>
    );
  }
};

export default Dashboard;