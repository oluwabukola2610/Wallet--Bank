import Welcome from "./pages/Welcome";
import { Routes, Route } from "react-router-dom";
import DashAside from "./pages/Dashboard/Layout/DashAside";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import SignupOtp from "./pages/Auth/SignupOtp";
import ForgetPass from "./pages/Auth/ForgetPass";
import ResetPass from "./pages/Auth/ResetPass";
import Checkinbox from "./pages/Auth/Checkinbox";
import CreatePin from "./pages/Auth/CreatePin";
import BankContextProvider from "./context/BankContextProvider";
import ResetPin from "./pages/Auth/ResetPin";
import Userprofile from "./pages/Dashboard/component/Userprofile";

const App = () => {
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
        <Route path="/create-pin/:id" element={<CreatePin />} />
        <Route path="/reset-pin" element={<ResetPin />} />
        <Route path="/user-profile" element={<Userprofile />} />
        <Route path="/*" element={<DashAside />} />{" "}
        {/* Add a catch-all route for DashNav */}
      </Routes>
    </BankContextProvider>
  );
};

export default App;
