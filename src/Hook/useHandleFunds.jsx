import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../api/Api";
const useHandleFunds = () => {
  const [fundsInput, setFundsInput] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData._id;
  const email = userData.email;
  const userFundsData = {
    amount: fundsInput,
    walletType: selectedCurrency,
    userId,
    email,
  };
  const fundWithFlutterwave = () => {
    axios
      .post(`${api}/wallet/fund-flutterwave`, userFundsData)
      .then((response) => {
        if (response.status === 200) {
          const authorizationUrl = response.data.data;
          toast.success("Proceed To Flutterwave");
          window.location.href = authorizationUrl;
        }
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  const fundWithPaystack = () => {
    axios
      .post(`${api}/wallet/fund-paystack`, userFundsData)
      .then((response) => {
        if (response.status === 205) {
          toast.success(response.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else if (response.status === 200) {
          const authorizationUrl = response.data.authorizationUrl;
          toast.success("Proceed To Paystack");
          window.location.href = authorizationUrl;
        }
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };
  const fundWithStripe = () => {
    const amount = parseFloat(fundsInput);
    const dollarData = {
      amount,
      email,
    };
    axios
      .post(`${api}/wallet/fund-stripe`, dollarData)
      .then((response) => {
        if (response.status === 205) {
          toast.success(response.data.message);
          console.log(response);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else if (response.status === 200) {
          const authorizationUrl = response.data.data;
          toast.success("Proceed To stripe");
          window.location.href = authorizationUrl;
        }
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };
  return {
    selectedCurrency,
    setFundsInput,
    fundsInput,
    handleCurrencyChange,
    fundWithFlutterwave,
    fundWithPaystack,
    fundWithStripe,
  };
};

export default useHandleFunds;
