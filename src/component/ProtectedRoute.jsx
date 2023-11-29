import { useContext, useEffect } from "react";
import { BankContext } from "../context/BankContextProvider";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(BankContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    if (!isAuthenticated) {
      // If not authenticated, you can redirect to the login page
      navigate("/login");
    } 
  }, [isAuthenticated, navigate, ]);

  // If you want to render something for the protected route, you can use Outlet
  return <Outlet />;
};

export default ProtectedRoute;
