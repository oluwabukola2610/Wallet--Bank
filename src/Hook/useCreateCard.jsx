import axios from "axios";
import { api } from "../api/Api";
import { useState } from "react";
import { toast } from "react-toastify";

const useCreateCard = () => {
  const [isloading, setIsloading] = useState(false);
  const generateCard = () => {
    setIsloading(true);
    axios
      .post(`${api}/card/create`, null, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem(
            "cardId",
            JSON.stringify(response.data.data.cardId)
          );
          toast.success(response.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      })
      .finally(() => {
        setIsloading(false);
      });
  };
  const deleteCAard = () => {
    setIsloading(true);
    const cardId = JSON.parse(localStorage.getItem("cardId"));
    console.log(cardId);
    axios
      .post(`${api}/card/delete?cardId=${cardId}`, null, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  return { generateCard, isloading, deleteCAard, setIsloading };
};

export default useCreateCard;
