import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import logo from "../../../assets/logo/Union.png";
import { FiLogOut } from "react-icons/fi";
import Transaction from "../Transaction";
import Dashboard from "../Dashboard";
import { AiOutlineHome, AiOutlineTransaction } from "react-icons/ai";
import { GiWallet } from "react-icons/gi";

function DashAside() {
  const navigate = useNavigate();
  const location = useLocation();

  const shouldRenderNavbar =
    location.pathname === "/wallet" || location.pathname === "/transactions";

  if (!shouldRenderNavbar) {
    return null;
  }
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };
  const currentUser = JSON.parse(localStorage.getItem("keyuserinfo"));

  const NaviageTo = () => {
    if (currentUser) {
      console.log(currentUser);
      const userId = currentUser._id;
      navigate(`/create-pin/${userId}`);
    }
  };

  return (
    <div className="max-w-[1640px] mx-auto flex flex-col lg:flex-row ">
      <aside className="bg-gray-800 flex flex-row justify-between lg:justify-start items-center lg:flex-col w-full lg:w-1/6 lg:max-h-full lg:h-screen px-4">
        <div className="lg:mt-5 flex items-center">
          <img src={logo} alt="" className="w-8 h-8" />
          <p className="text-gray-50 text-xl  ml-2 hidden md:flex">Wallet</p>
        </div>
        <nav className="flex flex-row lg:flex-col lg:space-x-0 space-x-3 lg:space-y-12  md:space-x-6 justify-center  items-center lg:items-start py-5  px-3 lg:mt-12 lg:py-0">
          <NavLink
            exact="true"
            to="/wallet"
            className={({ isActive }) =>
              !isActive
                ? " font-bold text-md flex  text-gray-400"
                : "text-gray-100 hover:text-white text-md flex items-center"
            }
          >
            <AiOutlineHome className=" mr-2" size={20} />
            <span className="hidden md:flex">Home</span>
          </NavLink>

          <NavLink
            exact={true.toString()}
            to="/transactions"
            className={({ isActive }) =>
              !isActive
                ? " font-bold flex text-md items-center text-gray-400"
                : "text-gray-100 hover:text-white text-md flex items-center"
            }
          >
            <AiOutlineTransaction className="mr-3" size={20} />
            <span className="hidden md:flex"> Transactions</span>
          </NavLink>
          <div className="flex items-center">
            <GiWallet
              className="md:flex items-center md:mr-3 text-white hidden"
              size={20}
            />
            <p className="text-gray-400 text-md cursor-pointer"
              onClick={NaviageTo}
            >
              Create pin
            </p>
          </div>

          <div className="flex items-center">
            <FiLogOut
              className="md:flex items-center mr-3 text-white hidden"
              size={20}
            />
            <button
              onClick={handleLogOut}
              className=" border-[1.5px] border-gray-300 text-gray-300 rounded-lg py-1 px-2 text-md "
            >
              Log Out
            </button>
          </div>
        </nav>
      </aside>
      <div className="flex-1">
        {/* Render the component based on the route */}
        <Routes>
          <Route path="/wallet" element={<Dashboard />} />
          <Route path="/transactions" element={<Transaction />} />
        </Routes>
      </div>
    </div>
  );
}

export default DashAside;
