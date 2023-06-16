import { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

const DashNav = () => {
  const [initials, setInitials] = useState("");

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("keyuserinfo"));
    if (storedUserData) {
      const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
      setInitials(initials);
    }
  }, []);

  const storedUserData = JSON.parse(localStorage.getItem("keyuserinfo"));
  const { firstName, lastName } = storedUserData || {};

  return (
    <nav className="flex items-center justify-end space-x-4">
      <IoMdNotificationsOutline size={25} />
      {storedUserData && (
        <p className="capitalize">
          {firstName} {lastName}
        </p>
      )}
      {initials && (
        <span className="p-1 rounded-full bg-gray-300 text-sm">{initials}</span>
      )}
    </nav>
  );
};

export default DashNav;
