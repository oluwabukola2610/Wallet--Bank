/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../api/Api";

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
  const [myWallet, setMyWallet] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [notifications, setNotifications] = useState([]);
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
      .post(`${api}/auth/register`, user)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Registration successful, check your email for otp");
          localStorage.setItem("email", JSON.stringify(user.email));
          localStorage.setItem("token", response.data.usertoken);
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
      .post(`${api}/auth/login`, logindata)
      .then((response) => {
        if (response.status === 201) {
          toast.success("Login Successful!");
          setTimeout(() => {
            navigate("/wallet");
          }, 1000);
          const tokenData = response.data.data;
          localStorage.setItem("token", tokenData);
          localStorage.setItem(
            "userData",
            JSON.stringify(response.data.userdata)
          );
        }
      })
      .catch((error) => {
        toast.warning(error.response.data.error);
      })
      .finally(() => {
        setUser({
          email: "",
          password: "",
        });
        setIsLoading(false);
      });
  };

  const handleForgetPass = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!user.email) {
      toast.error("Please enter your email");
      return;
    }
    setIsLoading(true);
    const email = user.email;
    axios
      .post(
        "https://bank-app-backend-server.onrender.com/api/v1/auth/forgot_pass",
        {email}
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
        toast.error(error.response.data.error);
      })
      .finally(() => {
        setIsLoading(false);
        setUser({
          email: "",
        });
      });
  };

  const setuserWallet = () => {
    const walletType = "naira&usd";
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData._id;
    const dashboardData = { walletType, userId };
    axios
      .post(`${api}/wallet/create`, dashboardData)
      .then((response) => {
        setMyWallet(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchUserTransactions = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData._id;
    try {
      const response = await fetch(`${api}/trans/transdata?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        const filteredTransactions = data.data.filter(
          (transaction) => transaction.userId === userId
        );
        setTransactions(filteredTransactions);
        console.log(filteredTransactions);
      }
    } catch (error) {
      console.log("Internal Server Error: " + error);
    }
  };
  useEffect(() => {
    JSON.parse(localStorage.getItem("userData"));
  }, []);
  const formatDatestamp = (timestamp) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(timestamp).toLocaleString(undefined, options);
  };
  const handleNotification = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData._id;
    axios
      .get(`${api}/wallet/notifications?userId=${userId}`)
      .then((response) => {
        if (response.status === 200) {
          setNotifications(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  const contextValue = {
    user,
    setUser,
    isLoading,
    handleInput,
    handleRegister,
    handleLogin,
    handleForgetPass,
    setuserWallet,
    fetchUserTransactions,
    myWallet,
    transactions,
    formatDatestamp,
    notifications,
    handleNotification,
  };

  return (
    <BankContext.Provider value={contextValue}>{children}</BankContext.Provider>
  );
};

export default BankContextProvider;
