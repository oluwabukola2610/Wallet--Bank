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
  const userFundsData = {
    amount: fundsInput,
    walletType: selectedCurrency,
  };
  const fundWithFlutterwave = () => {
    axios
      .post(`${api}/wallet/fund-flutterwave`, userFundsData, {
        withCredentials: true,
      })
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
      .post(`${api}/wallet/fund-paystack`, userFundsData, {
        withCredentials: true,
      })
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
      amount
    };
    axios
      .post(`${api}/wallet/fund-stripe`, dollarData, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 205) {
          toast.success(response.data.message);
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
