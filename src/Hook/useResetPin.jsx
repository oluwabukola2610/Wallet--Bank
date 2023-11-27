import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../api/Api";

const useResetPin = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleResetPin = (e) => {
    e.preventDefault();
    // Validate the OTP code
    if (!code || code.length !== 4) {
      toast.warning("please enter your pin");
      return;
    }
    const pindata = { pin: code};
    axios
      .post(`${api}/trans/create_pin`, pindata, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Transaction pin updated succesfully");
          setTimeout(() => {
            navigate("/wallet");
          }, 2000);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          toast.error("Invalid transaction pin");
        } else {
          console.error(error);
          toast.error("An error occurred. Please try again later.");
        }
      });
  };

  return { code, setCode, handleResetPin };
};

export default useResetPin;
