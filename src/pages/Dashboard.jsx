import group1 from "../assets/group1.png";
import { useContext } from "react";
import { BeatLoader } from "react-spinners";
import TransferForm from "../component/TransferForm";
import FundsForm from "../component/FundsForm";
import { Link } from "react-router-dom";
import { BankContext } from "../context/BankContextProvider";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { api } from "../api/Api";

const Dashboard = () => {
  const {
    isLoading,
    myWallet,
    transactions,
    setuserWallet,
    fetchUserTransactions,
    formatDatestamp,
    handleNotification,
  } = useContext(BankContext);
  useEffect(() => {
    setTimeout(() => {
      setuserWallet();
    }, 1000);

    fetchUserTransactions();
    handleNotification();
  }, []);
  const sortedTransactions = transactions.sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });
  const [userData, setuserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${api}/user/data`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setuserData(response.data.userData);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData(); 
  }, []);

  const { firstName } = userData || {};

  return (
    <main className=" px-3 md:px-4 lg:px-8 py-3 flex flex-col overflow-y-scroll w-full">
      <header>
        <div className="flex flex-col md:flex-row justify-between items-center py-3 capitalize">
          <h1 className=" font-semibold text-xl md:text-2xl md:flex capitalize hidden">
            Hello {firstName}👋🏽
          </h1>
          <div className="flex space-x-4">
            <button
              className="border-[1.5px] border-primary text-primary font-semibold rounded-lg py-2 px-4 hover:bg-primary-dark"
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              Transfer Funds
            </button>

            <button
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className="bg-primary font-semibold text-white rounded-lg py-2 px-4 hover:bg-primary-dark"
            >
              + Fund Wallet
            </button>
          </div>
        </div>
        <div className="flex mt-3">
          <div className="border border-gray-300 p-4 flex-1 mr-3 text-xl font-medium">
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <BeatLoader color="#000000" size={15} />
              </div>
            ) : myWallet ? (
              <>
                ₦ {myWallet.nairaBalance}
                <span className="text-gray-600">.00</span>{" "}
                <p className="text-grayText font-light text-sm">
                  Naira Balance
                </p>
              </>
            ) : (
              "loading..." // Display this if myWallet is not available
            )}
          </div>

          <div className="border border-gray-300 p-4 flex-1 ml-3 font-medium text-xl">
            {myWallet ? (
              <>
                $ {myWallet.usdBalance}
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
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <BeatLoader color="#000000" size={15} />
          </div>
        ) : transactions.length > 0 ? (
          <>
            <div className=" overflow-x-auto shadow-md sm:rounded-lg max-w-sm md:w-full md:max-w-full overflow-hidden">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-faded">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Wallet
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Transaction Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Payment Method
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTransactions.slice(0, 3).map((transaction, index) => (
                    <tr
                      key={index}
                      className={`bg-${
                        index % 2 === 0 ? "white" : "gray-50"
                      } border-b hover:bg-faded/60 duration-300`}
                    >
                      <td className="px-4 py-4 whitespace-no-wrap">
                        <div className="text-sm leading-5 text-gray-900">
                          {transaction.walletType} Account
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <div
                          className={`text-sm leading-5  ${
                            transaction.transactionType === "Deposit"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.transactionType}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-no-wrap">
                        <div className="text-sm leading-5 text-gray-900">
                          {transaction.paymentGateway}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <div className="text-sm leading-5 text-gray-900">
                          {formatDatestamp(transaction.timestamp)}{" "}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap">
                        <div
                          className={`text-sm leading-5 text-gray-900 w-fit px-2 rounded-md ${
                            transaction.paymentStatus === "failed"
                              ? "bg-red-100 text-red-400"
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
                          {transaction.walletType === "naira" ? "₦" : "$"}{" "}
                          {transaction.amount}{" "}
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

      <TransferForm />

      <FundsForm />
    </main>
  );
};

export default Dashboard;
