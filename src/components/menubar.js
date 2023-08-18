import { Route, Routes } from "react-router-dom";
import Layout from "./layout";
import NoPage from "./nopage";
import Azure from "./azure";
import Dashboard from "./dashboard";


function MenuBar  ()  {
    
    return (<div>
     <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="azure" element={<Azure />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
    </div>
        )
  };
  
  export default MenuBar;

