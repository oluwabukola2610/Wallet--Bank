import {  useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
    const userId = JSON.parse(localStorage.getItem("userId"));
    const pin = { code };
    console.log(pin);
    const pindata = { pin: code, id: userId };
    console.log(pindata); // Make an API call to validate the OTP
    axios
      .post(
        `https://bank-app-backend-server.onrender.com/api/v1/trans/create_pin/${userId}`,
        pindata
      )
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
          toast.warning("Invalid transaction pin");
        } else {
          console.error(error);
          toast.warning("An error occurred. Please try again later.");
        }
      });
  };


 

  return { code, setCode, handleResetPin };
};

export default useResetPin;