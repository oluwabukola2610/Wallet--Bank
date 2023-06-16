import { useContext, useState } from "react";
import { BankContext } from "../context/BankContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useResetPass = () => {
  const { user } = useContext(BankContext);
  const [confirmPass, setConfirmPass] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate()
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const hsndleRestInput = (event) => {
    setConfirmPass(event.target.value);
  };

  const handleResetPass = (event) => {
    event.preventDefault();
    // Validate form fields
    if (!confirmPass || !user.password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (confirmPass !== user.password) {
      toast.error("Passwords do not match");
      return;
    }
    const userId = window.location.pathname.split('/')[2]; // Extract the user ID from the URL
    const userToken = window.location.pathname.split('/')[3]; // Extract the token from the URL
    const newpassData = { password: user.password, id: userId, token: userToken };
    // Make the API request to reset the password
    axios
      .post(
        `https://bank-app-backend-server.onrender.com/api/v1/auth/pass_reset/${userId}/${userToken}`,
       newpassData
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success("Password reset successful");
          navigate('/login')
          // Perform any necessary actions after successful password reset
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred. Please try again later.");
      });
  };

  return {
    handleResetPass,
    hsndleRestInput,
    confirmPass,
    passwordType,
    togglePassword,
  };
};

export default useResetPass;
