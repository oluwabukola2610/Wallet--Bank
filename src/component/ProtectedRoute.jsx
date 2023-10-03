import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  console.log(token);

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return <Outlet />;
};
export default ProtectedRoute;
