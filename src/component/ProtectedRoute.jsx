import { useContext, useEffect } from "react";
import { BankContext } from "../context/BankContextProvider";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { fetchData } = useContext(BankContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      // Check if the authentication token is present in the cookies
      const authTokenCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken"));

      if (!authTokenCookie) {
        // No authentication token found, redirect to login
        navigate("/login");
        return;
      }

      const authToken = authTokenCookie.split("=")[1];

      // You can send the authToken to your server for verification
      // or use it in any way that suits your authentication mechanism
      console.log("Authentication token:", authToken);

      // Proceed with fetching user data
      await fetchData();
    };

    checkAuthentication();
  }, [navigate, fetchData]);

  return <Outlet />;
};

export default ProtectedRoute;
