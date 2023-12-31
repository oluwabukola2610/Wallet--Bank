import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../api/Api";

const useSignupOtp = () => {
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(180); // Set the timer duration in seconds
  const [timerComplete, setTimerComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let intervalId;

    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setTimerComplete(true);
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const email = sessionStorage.getItem("email");
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!code || code.length !== 4) {
      toast.warning("please enter a valid OTP code");
      return;
    }
    setIsLoading(true);
    const userOtp = { otp: code,  email };
    console.log(userOtp);
    axios
      .post(`${api}/auth/otp`, userOtp)
      .then((response) => {
        if (response.status === 200) {
          toast.success("OTP verified successfully");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
        setCode("");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error("invalid otp");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleResendOtp = () => {
    if (!timerComplete) {
      return;
    }

    setIsLoading(true);
    axios
      .post(`${api}/auth/generate_otp`, email)
      .then((response) => {
        if (response.status === 200) {
          toast.success("new otp successfully sent");
          setTimer(180); // Reset the timer
          setTimerComplete(false);
        }
      })
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return {
    setCode,
    handleResendOtp,
    handleOtpSubmit,
    timerComplete,
    code,
    timer,
    formatTime,
    isLoading,
  };
};

export default useSignupOtp;
