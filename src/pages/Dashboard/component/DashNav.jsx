import { IoMdNotificationsOutline } from "react-icons/io";

const DashNav = () => {
  const currentUser = JSON.parse(localStorage.getItem("keyuserinfo"));
  const { firstName, lastName } = currentUser;
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <nav className="flex items-center justify-end space-x-4">
      <IoMdNotificationsOutline size={25} />
      <p className="capitalize">
        {firstName} {lastName}
      </p>
      <span className="p-1 rounded-full bg-gray-300 text-sm">{initials}</span>
    </nav>
  );
};

export default DashNav;
