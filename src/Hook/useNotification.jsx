// import { useState } from "react";
import axios from "axios";
// import { toast } from "react-toastify";

const useNotification = () => {
  const handleNotification = () => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    axios
      .get(
        "https://bank-app-backend-server.onrender.com/api/v1/wallet/notifications",{userId}
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    handleNotification,
  };
};

export default useNotification;
