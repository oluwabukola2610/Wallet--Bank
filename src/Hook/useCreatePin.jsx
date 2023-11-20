import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { api } from "../api/Api";

const useCreatePin = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleCreatePin = (e) => {
    e.preventDefault();
    if (!code || code.length !== 4) {
      toast.warning("please enter your pin");
      return;
    }
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData._id;
    const pindata = { pin: code, id: userId };
    axios
      .post(`${api}/trans/create_pin/${userId}`, pindata)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Transaction pin created succesfully");
          setTimeout(() => {
            navigate("/login");
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

  return { code, setCode, handleCreatePin };
};

export default useCreatePin;
