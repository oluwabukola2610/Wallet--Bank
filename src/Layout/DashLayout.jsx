import { Outlet } from "react-router-dom";
import SideBar from "../component/SideBar";
import DashNav from "../component/DashNav";

const DashLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <DashNav />
        {/* Page content here */}
        <Outlet />
      </div>
      {/* Sidebar content here */}
      <SideBar />
    </div>
  );
};

export default DashLayout;
