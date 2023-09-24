import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ path, element }) => {
    const token = window.localStorage.getItem("token")
    const token1 = window.localStorage.getItem("token1");

      const isAuthenticated = !!token || token1;
  
    return isAuthenticated ? (
      <Route path={path} element={element} />
    ) : (
      <Navigate to="/login" replace/>
    );
  };
  export default ProtectedRoute;

  