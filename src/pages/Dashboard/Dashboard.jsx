import group1 from "../../assets/group1.png";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import TransferForm from "./component/TransferForm";
import FundsForm from "./component/FundsForm";
import DashNav from "./component/DashNav";
import axios from "axios";
const Dashboard = () => {
  const [toggleTranser, settoggleTranser] = useState(false);
  const [toggleFunds, settoggleFunds] = useState(false);

  useEffect(() => {
    handleDashboard();
  }, []);

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
        localStorage.setItem("keyuserinfo", JSON.stringify(userData));
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  };


  return (
    <div className="w-full px-2 md:px-4 lg:px-8 py-3">
      <DashNav />
      <header className="mt-3">
        <div className="flex flex-col md:flex-row justify-between  items-center py-3">
          <h1 className="hidden font-semibold text-xl md:text-2xl md:flex">
            Hello omo👋🏽
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={() => settoggleTranser(!toggleTranser)}
              className="border-[1.5px] border-primary text-primary font-semibold rounded-lg py-2 px-4 hover:bg-primary-dark"
            >
              Transfer Funds
            </button>

            <button
              onClick={() => settoggleFunds(!toggleFunds)}
              className=" bg-primary font-semibold text-white rounded-lg py-2 px-4 hover:bg-primary-dark"
            >
              + Fund Wallet
            </button>
          </div>
        </div>
        <div className="flex justify-between mt-3">
          <div className=" border border-gray-300 p-4 flex-1 mr-3 text-xl  font-medium">
            ₦00.00
            <p className="text-grayText font-light text-sm">Naira Balance</p>
          </div>
          <div className=" border border-gray-300 p-4 flex-1 ml-3 font-medium text-xl">
            $00.00
            <p className="text-grayText font-light text-sm">Dollar Balance</p>
          </div>
        </div>
        <p className="py-4 font-medium">Transaction History</p>
      </header>

      <main>
        <div className="flex justify-center items-center mt-8">
          <img src={group1} alt="" />
        </div>
      </main>

      {/* transfer overlay */}
      {toggleTranser && (
        <div
          className="bg-black/60 w-full fixed top-0 left-0 z-10 h-screen "
          onClick={() => settoggleTranser(!toggleTranser)}
        ></div>
      )}
      {/* sidemenu */}
      <div
        className={
          toggleTranser
            ? "fixed h-screen w-full  md:w-[300px] lg:w-[350px] top-0 right-0 bg-white z-10 duration-300"
            : "hidden"
        }
      >
        <AiOutlineClose
          onClick={() => settoggleTranser(!toggleTranser)}
          size={30}
          className="absolute right-2 top-4"
        />

        <TransferForm />
      </div>

      {/* funds overlay */}
      {toggleFunds && (
        <div
          className="bg-black/60 w-full fixed top-0 left-0 z-10 h-screen "
          onClick={() => settoggleFunds(!toggleFunds)}
        ></div>
      )}
      {/* sidemenu */}
      <div
        className={
          toggleFunds
            ? "fixed h-screen w-full  md:w-[300px] lg:w-[350px] top-0 right-0 bg-white z-10 duration-300"
            : "hidden"
        }
      >
        <AiOutlineClose
          onClick={() => settoggleFunds(!toggleFunds)}
          size={30}
          className="absolute right-2 top-4"
        />

        <FundsForm />
      </div>
    </div>
  );
};

export default Dashboard;
