/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const BankContext = createContext();

const BankContextProvider = ({ children }) => {
  
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleRegister = (event) => {
    event.preventDefault();

    // Validate form fields
    if (!user.firstName || !user.lastName || !user.email || !user.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    axios
      .post(
        "https://bank-app-backend-server.onrender.com/api/v1/auth/register",
        user
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success("Registration successful, check your email for otp");
          window.localStorage.setItem("email", JSON.stringify(user.email));
          setTimeout(() => {
            navigate("/signup-Otp");
          }, 2000);
        }
        // setuser to empty string
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast.warning("Email is already being used");
        } else {
          toast.warning("An error occurred. Please try again later.");
        }
      })
      .finally(() => {
        setIsLoading(false); // Set isLoading back to false when the API request is complete
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // Validate form fields
    if (!user.email || !user.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    const logindata = { email: user.email, password: user.password };

    axios
      .post(
        "https://bank-app-backend-server.onrender.com/api/v1/auth/login",
        logindata
      )
      .then((response) => {
        if (response.status === 201) {
          toast.success("Login Successful!");
          setTimeout(() => {
            navigate("/wallet");
          }, 2000);
          const tokenData = response.data.data;
          window.localStorage.setItem("token", tokenData);
          window.localStorage.setItem("isLoggedIn", true);
        } else {
          toast.error("Incorrect password");
        }
        setUser({
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        toast.warning(error.response.data.error)
      })
      .finally(() => {
        setIsLoading(false); // Set isLoading back to false when the API request is complete
      });
  };




  const contextValue = {
    handleRegister,
    handleInput,
    user,
    handleLogin,
    setUser,
    isLoading,
  };

  return (
    <BankContext.Provider value={contextValue}>{children}</BankContext.Provider>
  );
};

export default BankContextProvider;
