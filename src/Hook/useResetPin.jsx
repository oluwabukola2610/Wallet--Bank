import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useResetPin = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleResetPin = (e) => {
    e.preventDefault();
    // Validate the OTP code
    if (!code || code.length !== 4) {
      toast.warning("please enter your pin");
      return;
    } else {
      toast.warning("still in progress, try remember you pin");
      setTimeout(() => {
        navigate("/wallet");
      }, 3000);
    }
  };

  return { code, setCode, handleResetPin };
};

export default useResetPin;
