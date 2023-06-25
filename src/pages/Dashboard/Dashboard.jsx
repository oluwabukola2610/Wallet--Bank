import group1 from "../../assets/group1.png";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BeatLoader } from "react-spinners";
import TransferForm from "./component/TransferForm";
import FundsForm from "./component/FundsForm";
import DashNav from "./component/DashNav";
import useHandledashbord from "../../Hook/useHandledashbord";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [toggleTransfer, setToggleTransfer] = useState(false);
  const [toggleFunds, setToggleFunds] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    handleDashboard,
    setuserWallet,
    userData,
    fetchUserTransactions,
    transactions,
    formatTimestamp,
  } = useHandledashbord();

  useEffect(() => {
    handleDashboard();

    setTimeout(() => {
      setuserWallet();
    }, 2000);

    fetchUserTransactions().then(() => {
      setLoading(false);
    });
  }, []);
  // to get the name from localStorage
  const storedUserData = JSON.parse(localStorage.getItem("keyuserinfo"));
  const { firstName } = storedUserData || {};
  return (
    <div className="w-full px-2 md:px-4 lg:px-8 py-3">
      <DashNav />
      <header className="mt-3">
        <div className="flex flex-col md:flex-row justify-between items-center py-3 capitalize">
          <h1 className="hidden font-semibold text-xl md:text-2xl md:flex capitalize">
            Hello {firstName}👋🏽
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setToggleTransfer(!toggleTransfer)}
              className="border-[1.5px] border-primary text-primary font-semibold rounded-lg py-2 px-4 hover:bg-primary-dark"
            >
              Transfer Funds
            </button>

            <button
              onClick={() => setToggleFunds(!toggleFunds)}
              className="bg-primary font-semibold text-white rounded-lg py-2 px-4 hover:bg-primary-dark"
            >
              + Fund Wallet
            </button>
          </div>
        </div>
        <div className="flex justify-between mt-3">
          <div className="border border-gray-300 p-4 flex-1 mr-3 text-xl font-medium">
            {userData ? (
              <>
                ₦ {userData.nairaBalance}
                <span className="text-gray-600">.00</span>{" "}
                <p className="text-grayText font-light text-sm">
                  Naira Balance
                </p>
              </>
            ) : (
              "loading..."
            )}
          </div>
          <div className="border border-gray-300 p-4 flex-1 ml-3 font-medium text-xl">
            {userData ? (
              <>
                $ {userData.usdBalance}
                <span className="text-gray-600">.00</span>{" "}
                <p className="text-grayText font-light text-sm">
                  Dollar Balance
                </p>
              </>
            ) : (
              "loading..."
            )}
          </div>
        </div>
        <p className="py-4 font-medium">Transaction History</p>
      </header>

      <main>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <BeatLoader color="#000000" size={15} />
          </div>
        ) : transactions.length > 0 ? (
          <>
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full">
                <thead className="">
                  <tr className="bg-faded">
                    <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Wallet
                    </th>
                    <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Transaction Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Transaction Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3  text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.slice(0, 3).map((transaction, index) => (
                    <tr key={index} className="hover:bg-faded/60 duration-300">
                      <td className="px-4 py-4 whitespace-no-wrap">
                        <div className="text-sm leading-5 text-gray-900">
                          {transaction.walletType} Account
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <div className="text-sm leading-5 text-green-600">
                          Deposit
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <div className="text-sm leading-5 text-gray-900">
                          {formatTimestamp(transaction.timestamp)}{" "}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <div
                          className={`text-sm leading-5 text-gray-900 w-fit px-2 rounded-md ${
                            transaction.paymentStatus === "failed"
                              ? "bg-red-100 text-red-300"
                              : transaction.paymentStatus === "pending"
                              ? "bg-yellow-100 text-yellow-500"
                              : "bg-green-200 text-green-400"
                          }`}
                        >
                          {transaction.paymentStatus}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <div className="text-sm leading-5 text-gray-900">
                          {transaction.amount}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link
              to="/transactions"
              className="text-blue-300 font-semibold text-center pt-10 flex justify-center"
            >
              View All
            </Link>
          </>
        ) : (
          <div className="flex justify-center items-center mt-8">
            <img src={group1} alt="" />
          </div>
        )}
      </main>

      {/* transfer overlay */}
      {toggleTransfer && (
        <div
          className="bg-black/60 w-full fixed top-0 left-0 z-10 h-screen"
          onClick={() => setToggleTransfer(false)}
        ></div>
      )}
      {/* sidemenu */}
      <div
        className={
          toggleTransfer
            ? "fixed h-screen w-full md:w-[300px] lg:w-[350px] top-0 right-0 bg-white z-10 duration-300"
            : "hidden"
        }
      >
        <AiOutlineClose
          onClick={() => setToggleTransfer(false)}
          size={30}
          className="absolute right-2 top-4"
        />

        <TransferForm />
      </div>

      {/* funds overlay */}
      {toggleFunds && (
        <div
          className="bg-black/60 w-full fixed top-0 left-0 z-10 h-screen"
          onClick={() => setToggleFunds(false)}
        ></div>
      )}
      {/* sidemenu */}
      <div
        className={
          toggleFunds
            ? "fixed h-screen w-full md:w-[300px] lg:w-[350px] top-0 right-0 bg-white z-10 duration-300"
            : "hidden"
        }
      >
        <AiOutlineClose
          onClick={() => setToggleFunds(false)}
          size={30}
          className="absolute right-2 top-4"
        />

        <FundsForm />
      </div>
    </div>
  );
};

export default Dashboard;
