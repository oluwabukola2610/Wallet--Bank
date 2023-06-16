import { IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const DashNav = () => {
  const navigate = useNavigate();

  const NaviageTo = () => {
    const currentUser = JSON.parse(localStorage.getItem("keyuserinfo"));
    if (currentUser) {
      console.log(currentUser);
      const userId = currentUser._id;
      navigate(`/create-pin/${userId}`);
    }
  };
  return (
    <nav className="flex items-center justify-between ">
      <button
        onClick={NaviageTo}
        className=" font-semibold rounded-lg py-1 px-2 bg-primary text-white"
      >
        Create pin
      </button>
      <div className="flex items-center space-x-4">
        <IoMdNotificationsOutline size={25} className="mr-12" />
        <p>Omo Bola</p>
        <span className="p-1 rounded-full bg-gray-300 text-sm">OB</span>
      </div>
    </nav>
  );
};

export default DashNav;
