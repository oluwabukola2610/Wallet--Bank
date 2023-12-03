// import Welcome from "./pages/Welcome";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import SignupOtp from "./pages/Auth/SignupOtp";
import ForgetPass from "./pages/Auth/ForgetPass";
import ResetPass from "./pages/Auth/ResetPass";
import Checkinbox from "./pages/Auth/Checkinbox";
import BankContextProvider from "./context/BankContextProvider";
import DashLayout from "./Layout/DashLayout";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import UserProfile from "./pages/Userprofile";
import Notification from "./pages/Notification";
// import ProtectedRoute from "./component/ProtectedRoute";
import Caard from "./pages/Caard";
import Sucess from "./pages/Sucess";
import "react-toastify/dist/ReactToastify.css";
import WelcomePage from "./pages/WelcomePage";
import CreatePin from "./pages/Auth/CreatePin";

const App = () => {
  return (
    <BankContextProvider>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup-Otp" element={<SignupOtp />} />
        <Route path="/forgot-password" element={<ForgetPass />} />
        <Route path="/resetCheck-inbox" element={<Checkinbox />} />
        <Route path="/reset-password/:id/:token" element={<ResetPass />} />
        <Route path="/create-pin" element={<CreatePin />} />
        <Route path="/wallet/success" element={<Sucess />} />

        {/* Use DashAside layout for dashboard-related routes */}
        {/* <Route path="" element={<ProtectedRoute />}> */}
          <Route element={<DashLayout />}>
            <Route path="/wallet" element={<Dashboard />} />
            <Route path="/card" element={<Caard />} />
            <Route path="/transactions" element={<Transaction />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/user-profile" element={<UserProfile />} />
          </Route>
        {/* </Route> */}
      </Routes>
    </BankContextProvider>
  );
};

export default App;
