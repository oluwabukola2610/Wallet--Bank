import axios from "axios";
import { useState } from "react";

const useHandledashbord = () => {
  const [userInfo, setUserInfo] = useState({});
  const handleDashboard = () => {
    const id = JSON.parse(localStorage.getItem("userId"));
    axios
      .post(
        "https://bank-app-backend-server.onrender.com/api/v1/auth/user-data",
        { id }
      )
      .then((response) => {
        const userInfo = response.data.walletdata;
        setUserInfo(userInfo);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };
  const [myWallet, setmyWallet] = useState({});
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
        setmyWallet(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [transactions, setTransactions] = useState([]);

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
    userInfo,
    setuserWallet,
    fetchUserTransactions,
    transactions,
    myWallet,
    formatTimestamp,
  };
};

export default useHandledashbord;
