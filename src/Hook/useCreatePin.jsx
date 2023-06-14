import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useCreatePin = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  
  const handleCreatePin = (e) => {
    e.preventDefault();
    // Validate the OTP code
    if (!code || code.length !== 4) {
      toast.warning("please enter your pin");
      return;
    }
    const userId = window.location.pathname.split('/').pop(); // Extract the user ID from the URL
    console.log(userId);
    console.log(code);
    const pin = {code};
    console.log(pin);
    const pindata = { pin: code, id: userId };
    console.log(pindata); // Make an API call to validate the OTP
    axios.post(
      `https://bank-app-backend-server.onrender.com/api/v1/trans/create_pin/${userId}`,
      pindata
    ).then((response) => {
        if (response.status === 200) {
          toast.success("Transaction pin created succesfully");
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
      })
  };

  return { code, setCode, handleCreatePin };
};

export default useCreatePin;
