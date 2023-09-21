import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { SidebarData } from "../utils/Data";
import { useContext } from "react";
import { BankContext } from "../context/BankContextProvider";
import Avatar from "react-avatar";

function SideBar() {
  const [Image, SelectedImage] = useState(null);
  const { userData, handleDashboard } = useContext(BankContext);

  useEffect(() => {
    if (userData) {
      SelectedImage(userData.userImage);
    }
  }, [userData, handleDashboard]);

  const { firstName, lastName } = userData || {};

  return (
    <div className="drawer-side bg-transparent">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <aside className="flex flex-col items-center w-[13rem] h-screen overflow-hidden  shadow-xl  bg-blue-800">
        <div className=" flex-col items-center mt-6  flex mb-6">
          {Image ? (
            <Avatar
              src={Image}
              name={`${firstName} ${lastName}`}
              size="150"
              round={true}
            />
          ) : (
            <Avatar
              style={{ backgroundColor: "white" }}
              name={`${firstName} ${lastName}`}
              size="150"
              round={true}
              className="text-xl !bg-primary"
            />
          )}
          <h4 className="p-4 font-bold font-serif text-gray-200">
            {firstName} {lastName}
          </h4>
        </div>

        <nav className="flex flex-col justify-between h-[50%] px-2  overflow-y-auto ">
          {SidebarData.map((data, index) => (
            <NavLink
              key={index}
              to={data.path}
              className={({ isActive }) =>
                !isActive
                  ? " font-bold flex text-md items-center text-gray-400"
                  : "text-gray-100 text-md flex items-center"
              }
            >
              {data.icon}

              <span className="mx-4 font-medium">{data.title}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </div>
  );
}

export default SideBar;