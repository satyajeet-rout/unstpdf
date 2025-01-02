import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";



function Layout() {
  


  


  return (
    <div className="flex">
      <div className="fixed">
<Sidebar/>
      </div>
     
        <div className="overflow-y-scroll w-full ml-[250px]">
          <Outlet />
        </div>
    </div>
  );
}

export default Layout;
