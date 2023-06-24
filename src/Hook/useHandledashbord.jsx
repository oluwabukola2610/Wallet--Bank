import axios from "axios";
import { useState } from "react";

const useHandledashbord = () => {
  const handleDashboard = () => {
    const token = window.localStorage.getItem("token");
    const usertoken = { token };

    axios
      .post(
        "https://bank-app-backend-server.onrender.com/api/v1/auth/dashboard",
        usertoken
      )
      .then((response) => {
        const userData = response.data.myuserdata;
        localStorage.setItem("keyuserinfo", JSON.stringify(userData));
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };
  const [userData, setUserData] = useState({});

  const setuserWallet = () => {
    const walletType = "naira&usd";
    const getUserId = JSON.parse(localStorage.getItem("keyuserinfo"));
    const userId = getUserId._id;
    const dashboardData = { walletType, userId };
    axios
      .post(
        "https://bank-app-backend-server.onrender.com/api/v1/wallet/create",
        dashboardData
      )
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [transactions, setTransactions] = useState([]);

  const fetchUserTransactions = async () => {
    const getUserId = JSON.parse(localStorage.getItem("keyuserinfo"));
    const userId = getUserId._id;
  
    try {
      const response = await fetch(`https://bank-app-backend-server.onrender.com/api/v1/trans/transdata?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const filteredTransactions = data.data.filter((transaction) => transaction.userId === userId);
        setTransactions(filteredTransactions);
        console.log(filteredTransactions);
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
  return {
    handleDashboard,
    setuserWallet,
    fetchUserTransactions,
    transactions,
    userData,
    formatTimestamp  };
};

export default useHandledashbord;
