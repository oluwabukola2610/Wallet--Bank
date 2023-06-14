import { useState } from "react";

const useHandleTransfer = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("");

  const [handleTransact, setHandleTransact] = useState({
    amount: "",
    accountNum: "",
    pin: "",
  });
  const handleInput = (event) => {
    const { name, value } = event.target;
    setHandleTransact((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleFundsForm = (event) => {
    event.preventDefault();
    console.log(handleTransact, selectedCurrency);
    // Perform further actions with the selected values
  };
  const handleTransferForm = (event) => {
    event.preventDefault();
    console.log(handleTransact, selectedCurrency);
    // Perform further actions with the selected values
  };

  return {
    handleCurrencyChange,
    handleInput,
    handleTransact,
    selectedCurrency,
    handleFundsForm,
    handleTransferForm
  };
};

export default useHandleTransfer;
