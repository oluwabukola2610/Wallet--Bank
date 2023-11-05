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

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (!code || code.length !== 4) {
      toast.warning("please enter a valid OTP code");
      return;
    }
    setIsLoading(true);
    const userData = JSON.parse(window.localStorage.getItem("email"));
    const userOtp = { otp: code, email: userData };
    axios
      .post(`${api}/auth/otp`, userOtp)
      .then((response) => {
        if (response.status === 200) {
          const userData = response.data.myuserinfo;
          console.log(userData);
          localStorage.setItem("userData", JSON.stringify(userData));
          toast.success("OTP verified successfully");
          setTimeout(() => {
            navigate("/create-pin");
          }, 2000);
        }
        setCode("");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.warning("invalid otp");
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
    const email = JSON.parse(window.localStorage.getItem("email"));
    axios
      .post(
        "https://bank-app-backend-server.onrender.com/api/v1/auth/generate_otp",
        email
      )
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
