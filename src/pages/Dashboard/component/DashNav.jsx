import { IoMdNotificationsOutline } from "react-icons/io";

const DashNav = () => {
  return (
    <nav className="flex items-center justify-end space-x-8 ">
      <IoMdNotificationsOutline size={25} />
      <div className="flex items-center space-x-4">
        <p>Omo Bola</p>
        <span className="p-1 rounded-full bg-gray-300 text-sm">OB</span>
      </div>
    </nav>
  );
};

export default DashNav;
