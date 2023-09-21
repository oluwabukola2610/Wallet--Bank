import logo from "../../assets/logo/Union-preview.png";
import box from "../../assets/Group.png";
import { Link } from "react-router-dom";

const Checkinbox = () => {


  return (
    <div className="max-w-[1640px] mx-auto py-5 px-6 md:px-20 bg-bgGray h-screen max-h-full">
      <Link to="/" className="py-3">
        <img src={logo} alt="Logo" className="" />
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 lg:gap-x-10 mt-10 md:mt-20 lg:mt-28 ">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold md:text-4xl md:font-extrabold">
            Reset Password{" "}
          </h1>
          <p className="text-grayText font-light text-lg py-4">
            we have sent a reset link to your registered email address.{" "}
          </p>
        </div>
        <div className="p-6 w-full space-y-2 lg:max-w-md shadow-md rounded-md border bg-white/80 flex flex-col justify-center items-center">
         <img src={box} alt="" />
         <h2 className="font-bold text-lg">Check Your Inbox</h2>
         <p className="text-grayText text-md">Password reset link has been sent to your inbox</p>
        </div>
      </div>
    </div>
  );
};

export default Checkinbox;
