import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";



function Layout() {
  


  


  return (
    <div className="flex">
     <Sidebar/>
        <div className="overflow-y-scroll w-full">
          <Outlet />
        </div>
    </div>
  );
}

export default Layout;
