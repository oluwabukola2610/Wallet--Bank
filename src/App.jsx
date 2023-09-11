import Welcome from "./pages/Welcome";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import SignupOtp from "./pages/Auth/SignupOtp";
import ForgetPass from "./pages/Auth/ForgetPass";
import ResetPass from "./pages/Auth/ResetPass";
import Checkinbox from "./pages/Auth/Checkinbox";
import CreatePin from "./pages/Auth/CreatePin";
import BankContextProvider from "./context/BankContextProvider";
import ResetPin from "./pages/Auth/ResetPin";
import { useEffect } from "react";
import DashAside from "./Layout/DashAside";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import UserProfile from "./pages/Userprofile";

const App = () => {
  useEffect(() => {
    import("preline");
  }, []);

  return (
    <BankContextProvider>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup-Otp" element={<SignupOtp />} />
        <Route path="/forgot-password" element={<ForgetPass />} />
        <Route path="/resetCheck-inbox" element={<Checkinbox />} />
        <Route path="/reset-password/:id/:token" element={<ResetPass />} />
        <Route path="/create-pin" element={<CreatePin />} />
        <Route path="/reset-pin" element={<ResetPin />} />

        {/* Use DashAside layout for dashboard-related routes */}
        <Route element={<DashAside />}>
          <Route path="/wallet" element={<Dashboard />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </BankContextProvider>
  );
};

export default App;
