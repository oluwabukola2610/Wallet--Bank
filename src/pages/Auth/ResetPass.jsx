import logo from "../../assets/logo/Union-preview.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useContext, useState } from "react";
import { BankContext } from "../../context/BankContextProvider";
import { ToastContainer, Zoom } from "react-toastify";
import { Link } from "react-router-dom";
const ResetPass = () => {
  const { user, handleInput, passwordRegex,handleResetPass } = useContext(BankContext);
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 lg:gap-x-10 mt-10 md:mt-20 lg:mt-28 ">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold md:text-4xl md:font-extrabold">
            Reset Password{" "}
          </h1>
          <p className="text-grayText font-light text-xl py-4">
            Create a unique password to keep your account protected{" "}
          </p>
        </div>
        <form
          onSubmit={handleResetPass}
          className="p-6  w-full lg:max-w-md shadow-md rounded-md border border-gray-300  bg-white/80"
        >
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-grayText"
            >
              New Password
            </label>
            <div className="mb-4 py-2 flex items-center justify-between border border-gray-300 rounded-md">
              <input
                type={passwordType}
                value={user.password}
                name="password"
                id="password"
                placeholder="••••••••"
                onChange={handleInput}
                className="w-full px-4 py-2 text-gray-800 placeholder:text-gray-400 text-sm focus:outline-none bg-inherit"
              />
              <div onClick={togglePassword} className="text-grayText px-4">
                {passwordType === "password" ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </div>
            </div>
            {user.password.length > 0 && !passwordRegex.test(user.password) && (
              <p className="text-sm text-red-400 mb-2">
                Password must contain at least one uppercase letter, one
                lowercase letter, one digit, one symbol, and be at least 6
                characters long
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPass"
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
                className="w-full px-4 text-gray-800 placeholder:text-gray-400 text-sm focus:outline-none bg-inherit"
              />
              <div onClick={togglePassword} className="text-grayText px-4">
                {passwordType === "password" ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </div>
            </div>
            {user.confirmPass.length > 0 &&
              user.password !== user.confirmPass && (
                <p className="text-sm text-red-400 mb-2">
                  Passwords do not match
                </p>
              )}
          </div>
          <button className="w-full bg-primary text-white rounded-lg py-2 px-4 hover:bg-primary-dark">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPass;
