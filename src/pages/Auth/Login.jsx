import { Link } from "react-router-dom";
import logo from "../../assets/logo/Union-preview.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useContext, useState } from "react";
import ReactLoading from "react-loading";
import { BankContext } from "../../context/BankContextProvider";
import { ToastContainer } from "react-toastify";
const Login = () => {
  const [passwordType, setPasswordType] = useState("password");
  const { handleLogin, user, handleInput, isLoading } = useContext(BankContext);
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <div className="max-w-[1640px] mx-auto py-5 px-6 md:px-20 bg-bgGray h-screen max-h-full">
      <Link to="/" className="py-3">
        <img src={logo} alt="Logo" className="" />
      </Link>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 lg:gap-x-10 mt-8 md:mt-20 lg:mt-16 ">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold md:text-4xl md:font-extrabold">
            Log In
          </h1>
          <p className="text-grayText font-light text-xl py-4">
            Great to have you back{" "}
          </p>
        </div>
        <form
          onSubmit={handleLogin}
          className="p-6  w-full lg:max-w-md shadow-md rounded-md border border-gray-300  bg-white/80"
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-grayText"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleInput}
              className="w-full mb-4 px-3 py-2 border border-gray-300 text-gray-800 placeholder:text-gray-500 text-sm rounded-md focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-grayText"
            >
              Password
            </label>
            <div className="mb-4 py-2 flex items-center justify-between  border border-gray-300 rounded-md ">
              <input
                type={passwordType}
                name="password"
                id="password"
                placeholder="••••••••"
                value={user.password}
                onChange={handleInput}
                className="w-full px-4  text-gray-800 placeholder:text-gray-300 text-sm  focus:outline-none"
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
          <div className="mb-4">
            <Link to="/forgot-password" className="text-primary text-sm ">
              Forgot Password?
            </Link>
          </div>
          <button
            disabled={isLoading}
            className="relative w-full bg-primary text-white rounded-lg py-2 px-4 hover:bg-primary-dark"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <ReactLoading type="spin" height={"28px"} width={"28px"} />
              </div>
            ) : (
              "Login"
            )}
          </button>
          <p className="py-4 text-sm text-grayText">
            Don’t have an account? {""}
            <Link to="/signup" className="text-primary font-bold">
              Register now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
