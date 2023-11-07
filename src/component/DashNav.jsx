import { useContext } from "react";
import { RiMenuFoldLine } from "react-icons/ri";
import { BankContext } from "../context/BankContextProvider";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
const DashNav = () => {
  const { notifications } = useContext(BankContext);
  const userData = JSON.parse(localStorage.getItem("userData"));

  const { firstName, lastName } = userData || {};
  const userInitials =
    firstName && lastName ? `${firstName[0]}${lastName[0]}` : "";
  const navigate = useNavigate();
  const location = useLocation();
  const hasNotifications = notifications.length > 0;

  // Define a flag to determine whether to display the red notification number
  const displayRedNotification =
    hasNotifications && location.pathname !== "/notification";

  return (
    <nav className="flex justify-between items-center p-2 w-full">
      <label htmlFor="my-drawer-2">
        <RiMenuFoldLine
          size="25"
          className="flex lg:hidden text-gray-800 ml-8"
        />
      </label>
      <div className="flex items-center space-x-3 px-3">
        {displayRedNotification ? (
          <button
            onClick={() => navigate("/notification")}
            className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full"
          >
            <span className="sr-only">Notifications</span>
            <span className="absolute top-0 right-0 h-4 w-4 mt-1  bg-white text-red-500 rounded-full text-xs flex items-center justify-center">
              {notifications.length}
            </span>
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
        ) : (
          <button className="relative p-2 text-gray-400 hover.bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
            <span className="sr-only">Notifications</span>
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
        )}

        <div className="avatar online placeholder">
          <div className="bg-blue-500 text-neutral-content rounded-full w-8">
            <span className="text-xs">{userInitials}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashNav;
