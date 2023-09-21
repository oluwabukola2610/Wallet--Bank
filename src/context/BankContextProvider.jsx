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
  const [userData, setUserData] = useState({});
  const [myWallet, setMyWallet] = useState({});
  const [transactions, setTransactions] = useState([]);

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
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phone: "",
        });
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
          }, 1000);
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
        toast.warning(error.response.data.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDashboard = () => {
    const id = JSON.parse(localStorage.getItem("userId"));
    axios
      .post(
        "https://bank-app-backend-server.onrender.com/api/v1/auth/user-data",
        { id }
      )
      .then((response) => {
        const userInfo = response.data.walletdata;
        console.log(userInfo);
        setUserData(userInfo);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };
  const setuserWallet = () => {
    const walletType = "naira&usd";
    const userId = JSON.parse(localStorage.getItem("userId"));
    const dashboardData = { walletType, userId };
    axios
      .post(
        "https://bank-app-backend-server.onrender.com/api/v1/wallet/create",
        dashboardData
      )
      .then((response) => {
        setMyWallet(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchUserTransactions = async () => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    try {
      const response = await fetch(
        `https://bank-app-backend-server.onrender.com/api/v1/trans/transdata?userId=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        const filteredTransactions = data.data.filter(
          (transaction) => transaction.userId === userId
        );
        setTransactions(filteredTransactions);
      }
    } catch (error) {
      console.log("Internal Server Error: " + error);
    }
  };
  const formatTimestamp = (timestamp) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(timestamp).toLocaleString(undefined, options);
  };
  const contextValue = {
    user,
    setUser,
    isLoading,
    handleInput,
    handleRegister,
    handleLogin,
    handleDashboard,
    setuserWallet,
    fetchUserTransactions,
    userData,
    myWallet,
    transactions,
    formatTimestamp
  };

  return (
    <BankContext.Provider value={contextValue}>{children}</BankContext.Provider>
  );
};

export default BankContextProvider;
