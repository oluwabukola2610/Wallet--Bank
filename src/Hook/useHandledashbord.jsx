import axios from "axios";

const useHandledashbord = () => {
  const handleDashboard = () => {
    const token = window.localStorage.getItem("token");
    const usertoken = { token };

    axios
      .post(
        "https://bank-app-backend-server.onrender.com/api/v1/auth/dashboard",
        usertoken
      )
      .then((response) => {
        const userData = response.data.myuserdata;
        console.log(userData);
        localStorage.setItem("keyuserinfo", JSON.stringify(userData));
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };
  const setTranasaction = () => {
    const walletType = "naira&usd";
    const getUserId = localStorage.getItem("keyuserinfo");
    const userId = getUserId._id;
    axios.post(
      "http://bank-app-backend-server.onrender.com/api/v1/wallet/create/",
      { walletType, userId }
    ).then((response)=>{
      console.log(response)
    }).catch((error)=>{
      console.log(error)
    })
  };

  return { handleDashboard, setTranasaction };
};

export default useHandledashbord;
