import { useContext, useEffect } from "react";
import { BankContext } from "../context/BankContextProvider";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { fetchData, isLoading } = useContext(BankContext);
  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? <p>Loading...</p> : <Outlet />
};

export default ProtectedRoute;
