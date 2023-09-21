import { MdAccountBalance } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import {AiOutlineAccountBook} from "react-icons/ai"
export const SidebarData = [
  {
    title: "Dashboard",
    path: "/wallet",
    icon: <MdAccountBalance className="font-semibold" size={20}/>,
  },

  {
    title: "Transaction",
    path: "/transactions",
    icon: (
    <AiOutlineAccountBook  className="font-semibold text-gray-300" size={20} />
    ),
  },

  {
    title: "Notification",
    path: "/notification",
    icon: <IoMdNotifications  className="font-semibold" size={20}/>,
  },
  {
    title: "Profile",
    path: "/user-profile",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },

  {
    title: "Log Out",
    path: "/login",
    icon: (
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
    ),
  },
];
