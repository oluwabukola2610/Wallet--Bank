import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo/Union-preview.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from "react-loading";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ForgetPass = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleForgetPass = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setIsLoading(true);
    const reg = { email };
    console.log(reg);
    axios
      .post(
        "https://bank-app-backend-server.onrender.com/api/v1/auth/forgot_pass",
        reg
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
        return;
      })
      .catch((error) => {
        console.log(error);
      });
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 lg:gap-x-10 mt-10 md:mt-16 lg:mt-28 ">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold md:text-4xl md:font-extrabold">
            Forgot Password{" "}
          </h1>
          <p className="text-grayText font-light text-xl py-4">
            Kindly enter your registered email to reset your passsword{" "}
          </p>
        </div>
        <form
          onSubmit={handleForgetPass}
          className="p-6 w-full lg:max-w-md shadow-md rounded-md border bg-white/80"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 px-3 py-2 border border-gray-300 text-gray-800 placeholder:text-gray-900 text-sm rounded-md focus:outline-none"
            />
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
              "Recover Password"
            )}
          </button>
          <p className="py-4  text-center text-sm text-grayText">
            <Link to="/login" className="text-primary font-bold">
              Return to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgetPass;
