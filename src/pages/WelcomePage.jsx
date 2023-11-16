import { Link } from "react-router-dom"; // If you are using React Router
import wallet from "../assets/E-Wallet-bro.png";
const WelcomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <div className="blur h-[30rem] w-[15rem] left-0"></div>
      {/* <nav className="p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">
            <span className="text-yellow-400">YourApp</span> Wallet
          </div>
          <Link
            to="/get-started"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </nav> */}

      {/* Main Content */}
      <div className="flex-grow flex-col container md:mx-auto flex md:flex-row items-center justify-between p-8 space-y-8 md:space-y-0">
        <div className="w-full md:w-[40%] flex flex-col items-center">
          <h1 className="text-2xl md:text-4xl font-extrabold mb-4">Welcome to Wallet</h1>
          <p className="text-gray-600 mb-6">
            A secure and convenient way to manage your finances. Experience
            seamless transactions and financial freedom.
          </p>
          <Link
            to="/signup"
            className="bg-blue-500 text-white py-2 px-4  hover:bg-blue-600 transition duration-300 rounded-md"
          >
           Sign up for free
          </Link>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img src={wallet} alt="Wallet" className="rounded-lg shadow-md" />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
