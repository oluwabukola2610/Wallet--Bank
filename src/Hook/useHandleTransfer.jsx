import axios from "axios";
import { useState } from "react";

const useHandleTransfer = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("");

  const [transferInput, setTransferInput] = useState({
    amount: "",
    accountNum: "",
    pin: "",
  });
  const [fundsInput, setFundsInput] = useState("");
  const handleInput = (event) => {
    const { name, value } = event.target;
    setTransferInput((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleFundsForm = (event) => {
    event.preventDefault();
    console.log(fundsInput, selectedCurrency);
    // Perform further actions with the selected values
    const userFundsData = { fundsInput, selectedCurrency };
    axios
      .post(
        "https://bank-app-backend-server.onrender.com/api/v1/wallet/fund",
        userFundsData
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleTransferForm = (event) => {
    event.preventDefault();
    console.log(transferInput, selectedCurrency);
    // Perform further actions with the selected values
  };

  return {
    handleCurrencyChange,
    handleInput,
    transferInput,
    selectedCurrency,
    setFundsInput,
    fundsInput,
    handleFundsForm,
    handleTransferForm,
  };
};

export default useHandleTransfer;
