import { RiMenuFoldLine } from "react-icons/ri";
const DashNav = () => {
  return (
    <nav className="flex justify-between items-center p-2 w-full ">
      <label htmlFor="my-drawer-2">
        <RiMenuFoldLine
          size="25"
          className="flex lg:hidden text-gray-800 ml-8"
        />
      </label>
      <div className="flex items-center space-x-3 px-3">
        <button className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
          <span className="sr-only">Notifications</span>
          <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-green-500 rounded-full"></span>
          <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-green-700 rounded-full animate-ping"></span>
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
        <div className=" bg-green-800 p-2 text-white text-sm rounded-full font-semibold">
          Online
        </div>{" "}
      </div>
    </nav>
  );
};

export default DashNav;
