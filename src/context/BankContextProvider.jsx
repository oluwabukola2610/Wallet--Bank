/* eslint-disable react/prop-types */
import axios from "axios";
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
    confirmPass: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [myWallet, setMyWallet] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [profile, setProfile] = useState([]);
  const handleInput = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{6,}$/;

  const handleRegister = (event) => {
    event.preventDefault();
    // Validate form fields
    if (
      !user.firstName ||
      !user.lastName ||
      !user.email ||
      !user.password ||
      !user.confirmPass
    ) {
      toast.warn("Please fill in all fields");
      return;
    }
    // Check if the password meets the regex requirements
    if (!passwordRegex.test(user.password)) {
      toast.warn("Password must meet the requirements");
      return;
    }

    // Check if the password and confirm password match
    if (user.password !== user.confirmPass) {
      toast.warn("Passwords do not match");
      return;
    }
    setIsLoading(true);
    axios
      .post(`${api}/auth/register`, user)
      .then((response) => {
        if (response.status === 200) {
          sessionStorage.setItem("email", response.data.userEmail);
          toast.success("Registration successful, check your email for otp");
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
          toast.error("Email is already being used");
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      })
      .finally(() => {
        setIsLoading(false); // Set isLoading back to false when the API request is complete
      });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (!user.email || !user.password) {
      toast.warning("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    const logindata = { email: user.email, password: user.password };

    axios
      .post(`${api}/auth/login`, logindata, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Login Successful!");
          setTimeout(() => {
            navigate("/wallet");
          }, 1000);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      })
      .finally(() => {
        setUser({
          email: "",
          password: "",
        });
        setIsLoading(false);
      });
  };

  const handlogout = () => {
    axios
      .delete(`${api}/auth/logout`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleForgetPass = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!user.email) {
      toast.info("Please enter your email");
      return;
    }
    setIsLoading(true);
    const email = user.email;
    axios
      .post(`${api}/auth/forgot_pass`, { email })
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
  const handleResetPass = (event) => {
    event.preventDefault();
    // Validate form fields
    if (!user.confirmPass || !user.password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Check if the password meets the regex requirements
    if (!passwordRegex.test(user.password)) {
      toast.warn("Password must meet the requirements");
      return;
    }

    // Check if the password and confirm password match
    if (user.password !== user.confirmPass) {
      toast.warn("Passwords do not match");
      return;
    }

    const userId = window.location.pathname.split("/")[2]; // Extract the user ID from the URL
    const userToken = window.location.pathname.split("/")[3]; // Extract the token from the URL
    const newpassData = {
      password: user.password,
      id: userId,
      token: userToken,
    };
    // Make the API request to reset the password
    axios
      .post(`${api}/auth/pass_reset/${userId}/${userToken}`, newpassData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Password reset successful");
          navigate("/login");
          // Perform any necessary actions after successful password reset
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred. Please try again later.");
      });
  };

  const setuserWallet = () => {
    const walletType = "naira&usd";
    const dashboardData = { walletType };
    axios
      .post(`${api}/wallet/create`, dashboardData, {
        withCredentials: true,
      })
      .then((response) => {
        setMyWallet(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchUserTransactions = async () => {
    try {
      const response = await fetch(`${api}/trans/transdata`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        const filteredTransactions = data.data;
        setTransactions(filteredTransactions);
      }
    } catch (error) {
      console.log("Internal Server Error: " + error);
    }
  };
  const formatDatestamp = (timestamp) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(timestamp).toLocaleString(undefined, options);
  };
  const handleNotification = () => {
    axios
      .get(`${api}/wallet/notifications`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          setNotifications(response.data.data);
        }
      })
      .catch((error) => {
        toast.error(error);
        console.log(error);
      });
  };
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
  };

  const unreadNotificationCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${api}/user/data`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        const userData = response.data.userData;
        setProfile(userData);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      handlogout();
    }
  };
  const [cardData, setCardData] = useState({});
  const [isCardGenerated, setIsCardGenerated] = useState(false);
  const generateCard = () => {
    setIsLoading(true);
    axios
      .post(`${api}/card/create`, null, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const deleteCAard = () => {
    setIsLoading(true);
    axios
      .post(`${api}/card/delete?cardId=${cardData.cardId}`, null, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.data.message);
          setCardData({});
          setIsCardGenerated(false);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const fetchCard = () => {
    axios
      .get(`${api}/card/usercards`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          setCardData(response.data.data[0]);
          setIsCardGenerated(true);
        }
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };
  const fetchData = async () => {
    await Promise.all([
      fetchUserData(),
      fetchUserTransactions(),
      handleNotification(),
      setuserWallet(),
      fetchCard(),
    ]);
  };

  const contextValue = {
    user,
    setUser,
    isLoading,
    handleInput,
    handleRegister,
    handleLogin,
    handleForgetPass,
    handleResetPass,
    setuserWallet,
    profile,
    fetchUserTransactions,
    myWallet,
    transactions,
    formatDatestamp,
    notifications,
    unreadNotificationCount,
    markAllAsRead,
    generateCard,
    fetchData,
    fetchUserData,
    cardData,
    isCardGenerated,
    deleteCAard,
    handlogout,
    passwordRegex,
  };

  return (
    <BankContext.Provider value={contextValue}>{children}</BankContext.Provider>
  );
};

export default BankContextProvider;
