import logo from "../../assets/logo/Union-preview.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useContext } from "react";
import { BankContext } from "../../context/BankContextProvider";
import useResetPass from "../../Hook/useResetPass";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const ResetPass = () => {
  const { user, handleInput } = useContext(BankContext);
  const {
    handleResetPass,
    hsndleRestInput,
    confirmPass,
    passwordType,
    togglePassword,
  } = useResetPass();
  return (
    <div className="max-w-[1640px] mx-auto py-5 px-6 md:px-20 bg-bgGray h-screen max-h-full">
      <nav className="py-3">
        <img src={logo} alt="Logo" className="" />
      </nav>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        newestOnTop={false}
        autoClose={1000}
        rtl={false}
        draggable
        style={{
          top: "10%",
          transform: "translateY(-50%)",
          width: "fit-content",
        }}
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
              className="block mb-2 text-sm font-medium text-grayText"
            >
              New Password
            </label>
            <div className="mb-4 py-2 flex items-center justify-between  border border-gray-300 rounded-md ">
              <input
                type={passwordType}
                name="password"
                id="password"
                placeholder="••••••••"
                onChange={handleInput}
                value={user.password}
                className="w-full px-4  text-gray-800 placeholder:text-gray-500 text-sm  focus:outline-none"
              />
              <div onClick={togglePassword} className=" text-grayText px-4">
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
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-grayText"
            >
              Confirm Password
            </label>
            <div className="mb-4 py-2 flex items-center justify-between  border border-gray-300 rounded-md ">
              <input
                type={passwordType}
                name="confirmPass"
                id="confirmPass"
                placeholder="••••••••"
                onChange={hsndleRestInput}
                value={confirmPass}
                className="w-full px-4  text-gray-800 placeholder:text-gray-500 text-sm  focus:outline-none"
              />
              <div onClick={togglePassword} className=" text-grayText px-4">
                {passwordType === "password" ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </div>
            </div>
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
