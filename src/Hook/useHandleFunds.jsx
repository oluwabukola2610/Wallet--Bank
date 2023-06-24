import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
const useHandleFunds = () => {
  const [fundsInput, setFundsInput] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleFundsForm = (event) => {
    event.preventDefault();
    // Perform further actions with the selected values
    const getUserId = JSON.parse(localStorage.getItem("keyuserinfo"));
    const userId = getUserId._id;
    const userFundsData = {
      amount: fundsInput,
      walletType: selectedCurrency,
      userId,
    };
    setIsLoading(true);
    if (!fundsInput || !selectedCurrency) {
      toast.warning("please enter amount to fund wallet");
      setIsLoading(false);
      return;
    }
    axios
      .post(
        "https://bank-app-backend-server.onrender.com/api/v1/wallet/fund",
        userFundsData
      )
      .then((response) => {
        const { message } = response.data;

        if (message === "Wallet funding pending") {
          toast.info(message);
        } else if (message === "Wallet funding failed") {
          toast.error(message);
        } else {
          toast.success(message);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return {
    selectedCurrency,
    setFundsInput,
    fundsInput,
    isLoading,
    handleFundsForm,
    handleCurrencyChange,
  };
};

export default useHandleFunds;
