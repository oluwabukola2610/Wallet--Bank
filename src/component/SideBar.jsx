import { NavLink } from "react-router-dom";
import logo from "../assets/logo/Union-preview.png";
import { useEffect, useState } from "react";
import { SidebarData } from "../utils/Data";

function SideBar() {
  const [Image, SelectedImage] = useState(null);
  const storedUserData = JSON.parse(localStorage.getItem("keyuserinfo"));

  useEffect(() => {
    if (storedUserData) {
      SelectedImage(storedUserData.userImage);
    }
  }, [storedUserData]);

  
 
  const { firstName, lastName, email } = storedUserData;

  return (
    <div className="drawer-side bg-transparent">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <aside className="flex flex-col h-screen p-4 bg-blue-900 shadow-xl">
        <img className="w-8 h-8 sm:h-7" src={logo} alt="" />
        <div className=" flex-col items-center mt-6 -mx-2  flex mb-6">
          <img
            className="object-cover w-24 h-24 mx-2 rounded-full"
            src={
              Image
                ? Image
                : "https://media.istockphoto.com/id/1433039224/photo/blue-user-3d-icon-person-profile-concept-isolated-on-white-background-with-social-member.jpg?s=612x612&w=0&k=20&c=nrJ6RZ8Ft4vHECnRjBGBK_9XJ7f_lsi3dJjj_uAlkT8="
            }
            alt="avatar"
          />
          <h4 className="mx-2 mt-2 font-medium text-gray-200">
            {firstName} {lastName}
          </h4>
          <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
            {email}
          </p>
        </div>

        <nav className="flex  items-center  flex-col justify-between flex-1 lg:mt-6 ">
          {SidebarData.map((data, index) => (
            <NavLink
              key={index}
              to={data.path}
              className={({ isActive }) =>
                !isActive
                  ? " font-bold flex text-md items-center text-gray-400"
                  : "text-gray-300 hover:text-white text-md flex items-center"
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
