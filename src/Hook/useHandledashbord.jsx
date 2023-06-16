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
 

  return { handleDashboard };
};

export default useHandledashbord;
