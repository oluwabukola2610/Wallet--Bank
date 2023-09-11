import { Outlet } from "react-router-dom";
import SideBar from "../component/SideBar";
import DashNav from "../component/DashNav";

const DashAside = () => {
  return (
    <div className="drawer lg:drawer-open max-w-[1640px]">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content w-full">
        <DashNav />
        {/* Page content here */}
        <Outlet />
      </div>
      {/* Sidebar content here */}
      <SideBar />
    </div>
  );
};

export default DashAside;
