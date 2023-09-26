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
    const userId = JSON.parse(localStorage.getItem("userId"));
    const userEmail = JSON.parse(window.localStorage.getItem("email"));

    const userFundsData = {
      amount: fundsInput,
      walletType: selectedCurrency,
      userId,
      userEmail,
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
