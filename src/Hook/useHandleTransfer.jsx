import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../api/Api";

const useHandleTransfer = () => {

  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);
    if (
      !transferInput.accountNum ||
      !transferInput.amount ||
      !transferInput.pin ||
      !selectedCurrency
    ) {
      toast.warning("Please enter all required fields");
      setIsLoading(false);
      return;
    }

    // Validate account number
    if (!/^\d{10}$/.test(transferInput.accountNum)) {
      toast.warning("Account number should be 10 digits");
      setIsLoading(false);
      return;
    }

    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData._id;

    const userTransferData = {
      amount: transferInput.amount,
      receiverId: transferInput.accountNum,
      pin: transferInput.pin,
      walletType: selectedCurrency,
    };

    axios
      .post(`${api}/wallet/transfer/${userId}`, userTransferData)
      .then((response) => {
        toast.success(response.data.message);
        window.location.reload(); // Reload the page
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast.warning(error.response.data.error);
        } else {
          console.log(error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    handleCurrencyChange,
    handleInput,
    transferInput,
    selectedCurrency,
    handleTransferForm,
    isLoading,
  };
};

export default useHandleTransfer;
