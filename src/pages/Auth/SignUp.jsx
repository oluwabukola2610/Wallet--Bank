import { Link } from "react-router-dom";
import logo from "../../assets/logo/Union-preview.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useContext, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BankContext } from "../../context/BankContextProvider";
import ReactLoading from "react-loading";

const SignUp = () => {
  const { handleRegister, handleInput, user, isLoading } =
    useContext(BankContext);
  const [passwordType, setPasswordType] = useState("password");
  const [showEmailMessage, setShowEmailMessage] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const togglePassword = () => {
    setPasswordType((prevType) =>
      prevType === "password" ? "text" : "password"
    );
  };
  const checkPasswordStrength = (password) => {
    // Define your password strength criteria and update the password strength level accordingly
    let strength = 0;

    // Criteria: Contains both uppercase and lowercase letters
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
      strength++;
    }

    // Criteria: Contains at least one digit
    if (/[0-9]/.test(password)) {
      strength++;
    }

    // Criteria: Contains at least one special character
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      strength++;
    }

    setPasswordStrength(strength);
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    checkPasswordStrength(password);
    handleInput(event);
  };
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
                className="w-full px-3 py-2 border border-gray-300 text-gray-800  placeholder:text-gray-500 text-sm rounded-md focus:outline-none"
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
                className="w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder:text-gray-500 text-sm rounded-md focus:outline-none"
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
              className="w-full mb-3 px-3 py-2 border border-gray-300 text-gray-800 placeholder:text-gray-500 text-sm rounded-md focus:outline-none"
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
              type="tel"
              id="phoneNumber"
              placeholder="Phone Number"
              value={user.phone}
              name="phone"
              onChange={handleInput}
              className="w-full mb-4 px-3 py-2 border border-gray-300 text-gray-800 placeholder:text-gray-500 text-sm rounded-md focus:outline-none"
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
                onChange={handlePasswordChange} // Invoke handlePasswordChange instead of handleInput
                className="w-full px-4 text-gray-800 placeholder:text-gray-500 text-sm focus:outline-none"
              />
              <div onClick={togglePassword} className="text-grayText px-4">
                {passwordType === "password" ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </div>
            </div>
            {/* Password strength indicator */}
            <div className="flex justify-between mb-2">
              <div
                className={`w-1/4 h-2 rounded ${
                  passwordStrength >= 1 ? "bg-red-300" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`w-1/4 h-2 rounded ${
                  passwordStrength >= 2 ? "bg-yellow-500" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`w-1/4 h-2 rounded ${
                  passwordStrength >= 3 ? "bg-green-300" : "bg-gray-300"
                }`}
              ></div>
            </div>
          </div>
          <button
            disabled={isLoading}
            className=" w-full bg-primary text-white rounded-lg py-2 px-4 hover:bg-primary-dark"
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
