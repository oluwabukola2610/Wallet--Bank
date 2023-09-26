import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SidebarData } from "../utils/Data";
import Avatar from "react-avatar";

function SideBar() {
  const [Image, SelectedImage] = useState(null);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      SelectedImage(userData.userImage);
    }
  }, [userData]);

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

          {/* Log Out button */}
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="text-gray-400 text-md flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            <span className="mx-4 font-medium">Log Out</span>
          </button>
        </nav>
      </aside>
    </div>
  );
}

export default SideBar;
