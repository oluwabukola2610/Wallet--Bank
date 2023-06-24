import { useState } from "react";

const useHandleTransfer = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("");

  const [transferInput, setTransferInput] = useState({
    amount: "",
    accountNum: "",
    pin: "",
  });
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
    handleTransferForm,
  };
};

export default useHandleTransfer;
