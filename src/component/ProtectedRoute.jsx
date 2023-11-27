import { useContext } from "react";
import { BankContext } from "../context/BankContextProvider";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { profile } = useContext(BankContext);
  const navigate = useNavigate();

  if (!profile || !profile.isAuthenticated) {
    // Redirect to login if not authenticated
    navigate('/login');
    return null;
  }

  return <Outlet />;
};

export default ProtectedRoute;