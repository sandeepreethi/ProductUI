import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
  const release = () => {
    debugger;
    window.sessionStorage.removeItem("UserData");
  };
export default release;
