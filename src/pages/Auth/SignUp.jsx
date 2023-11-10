import { Link } from "react-router-dom";
import logo from "../../assets/logo/Union-preview.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useContext, useState } from "react";
import {  ToastContainer, Zoom } from "react-toastify";
import { BankContext } from "../../context/BankContextProvider";
import ReactLoading from "react-loading";

const SignUp = () => {
  const { handleRegister, handleInput, user, isLoading } =
    useContext(BankContext);
  const [passwordType, setPasswordType] = useState("password");
  const [showEmailMessage, setShowEmailMessage] = useState(false);
  const togglePassword = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };

  return (
    <div className="max-w-[1640px] mx-auto py-5 px-6 md:px-20 bg-bgGray h-screen overflow-y-auto">
      <Link to="/" className="py-3">
        <img src={logo} alt="Logo" className="" />
      </Link>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        transition={Zoom}
        limit={1}
        closeButton={false}
        newestOnTop={false}
        autoClose={1000}
        rtl={false}
        draggable
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 lg:gap-x-10 mt-8 md:mt-16 ">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold md:text-4xl md:font-extrabold">
            Create Your Account
          </h1>
          <p className="text-grayText font-light text-xl py-4">
            Let’s get you started
          </p>
        </div>
        <form
          onSubmit={handleRegister}
          className="p-6 w-full lg:max-w-md shadow-sm rounded-md border border-gray-300 bg-white/80"
        >
          <div className="flex">
            <div className="w-1/2 mr-2">
              <label
                htmlFor="firstName"
                className="block mb-1 text-sm font-medium text-grayText"
              >
                First Name
              </label>
              <input
                type="text"
                value={user.firstName}
                id="firstName"
                placeholder="First Name"
                onChange={handleInput}
                name="firstName"
                className="w-full px-3 py-2 border border-gray-300 text-gray-800  placeholder:text-gray-400 text-sm rounded-md focus:outline-none"
              />
            </div>
            <div className="w-1/2 ml-2 mb-2">
              <label
                htmlFor="lastName"
                className="block mb-1 text-sm font-medium text-grayText"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                value={user.lastName}
                onChange={handleInput}
                name="lastName"
                className="w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder:text-gray-400 text-sm rounded-md focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-grayText"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={user.email}
              name="email"
              onChange={handleInput}
              onFocus={() => setShowEmailMessage(true)}
              onBlur={() => setShowEmailMessage(false)}
              className="w-full mb-3 px-3 py-2 border border-gray-300 text-gray-800 placeholder:text-gray-400 text-sm rounded-md focus:outline-none"
            />
            {showEmailMessage && (
              <p className="text-sm text-red-400 mb-2">
                Enter a valid email address
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block mb-1 text-sm font-medium text-grayText"
            >
              Phone Number
            </label>
            <input
              type="number"
              id="phoneNumber"
              placeholder="Phone Number"
              value={user.phone}
              name="phone"
              onChange={handleInput}
              className="w-full mb-4 px-3 py-2 border border-gray-300 text-gray-800 placeholder:text-gray-400 text-sm rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-grayText"
            >
              Password
            </label>
            <div className="mb-4 py-2 flex items-center justify-between border border-gray-300 rounded-md">
              <input
                type={passwordType}
                value={user.password}
                name="password"
                id="password"
                placeholder="••••••••"
                onChange={handleInput}
                className="w-full px-4 text-gray-800 placeholder:text-gray-400 text-sm focus:outline-none bg-transparent"
              />
              <div onClick={togglePassword} className="text-grayText px-4">
                {passwordType === "password" ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmpassword"
              className="block mb-1 text-sm font-medium text-grayText"
            >
           Confirm Password
            </label>
            <div className="mb-4 py-2 flex items-center justify-between border border-gray-300 rounded-md">
              <input
                type={passwordType}
                value={user.confirmPass}
                name="confirmPass"
                id="confirmpassword"
                placeholder="••••••••"
                onChange={handleInput}
                className="w-full px-4 text-gray-800 placeholder:text-gray-400 text-sm focus:outline-none bg-transparent"
              />
              <div onClick={togglePassword} className="text-grayText px-4">
                {passwordType === "password" ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </div>
            </div>
          </div>
          <button
            disabled={isLoading}
            className="w-full bg-primary text-white rounded-lg py-2 px-4 hover:bg-primary-dark"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <ReactLoading type="spin" height={"28px"} width={"28px"} />
              </div>
            ) : (
              "Create Account"
            )}
          </button>
          <p className="pt-4 text-sm text-grayText">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-bold">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
