import group1 from "../assets/group1.png";
import { useContext, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import TransferForm from "../component/TransferForm";
import FundsForm from "../component/FundsForm";
import { Link } from "react-router-dom";
import { BankContext } from "../context/BankContextProvider";
import CreatePin from "./Auth/CreatePin";
import { FaRegCopy } from "react-icons/fa";

const Dashboard = () => {
  const {
    isLoading,
    myWallet,
    transactions,
    formatDatestamp,
    profile,
    fetchUserData,
  } = useContext(BankContext);
  useEffect(() => {
    fetchUserData();
  }, []);
  const sortedTransactions = transactions.sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  const { firstName, transactionPin } = profile || {};
  const [showmessage, setShowMessage] = useState("");
  const handleCopyClick = async (acct) => {
    try {
      await navigator.clipboard.writeText(acct);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };
  return (
    <main className=" px-3 md:px-4 lg:px-8 py-3 flex flex-col overflow-y-scroll w-full ">
      <header className="flex flex-col space-y-5">
        <div className="flex flex-col md:flex-row justify-between items-center py-3 capitalize">
          <h1 className=" font-semibold text-xl md:text-2xl md:flex capitalize hidden">
            Hello {firstName}👋🏽
          </h1>
          <div className="flex space-x-4">
            {transactionPin === 1111 ? (
              <button
                className="border-[1.5px] border-primary text-primary font-semibold rounded-lg md:py-2 py-1 px-2 md:px-4 hover:bg-primary-dark"
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              >
                + Create Pin
              </button>
            ) : (
              ""
            )}
            <button
              className="border-[1.5px] border-primary text-primary font-semibold rounded-lg  md:py-2 py-1 px-2 md:px-4  hover:bg-primary-dark"
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              Transfer Funds
            </button>

            <button
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className="bg-primary font-semibold text-white rounded-lg  md:py-2 py-1 px-2 md:px-4  hover:bg-primary-dark"
            >
              + Fund Wallet
            </button>
          </div>
        </div>
        <p className="md:px-4 font-semibold text-3xl ">
          Overview -{" "}
          <span className="text-lg text-gray-500 font-medium">
            Wallet Balance
          </span>
        </p>

        <div className="grid  grid-cols-1 md:grid-cols-[60%_30%] gap-[2%] md:gap-[5%] w-full md:mx-[2rem]">
          <div className="flex justify-around items-center  balance py-8 px-3 md:px-5 rounded-xl ">
            <div className="space-y-2 p-4">
              <p className="text-gray-200 text-sm">Naira Balance</p>
              <p className="text-2xl md:text-4xl text-white ">
                ₦ {myWallet?.nairaBalance}
                <span className="text-gray-200">.00</span>{" "}
              </p>
            </div>
            <div className="h-[6rem] border-r border-r-white w-[2px] items-center"></div>
            <div className="space-y-2 p-4">
              <p className="text-gray-200 text-sm">Dollar Balance</p>
              <p className="text-2xl md:text-4xl text-white ">
                $ {myWallet?.usdBalance}
                <span className="text-gray-200">.00</span>{" "}
              </p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg space-y-2">
            <p className="p-2 text-sm font-medium text-gray-500">
              Make transfer to any of your account to fund wallet
            </p>
            {showmessage && (
              <p className="text-green-500 text-center font-semibold">
                text copied successfully
              </p>
            )}
            <span className="flex justify-between font-normal bg-[#2488FF] p-2 rounded-lg">
              <span className="flex space-x-4 py-2">
                <p className="text-[0.75rem] font-semibold">naira account </p>
                <p className="text-[0.75rem]">— &nbsp;</p>
                <p className="text-[0.75rem]">
                  {myWallet?.userWalletNaira?.accountNumber}
                </p>
              </span>
              <button
                onClick={() =>
                  handleCopyClick(myWallet?.userWalletNaira?.accountNumber)
                }
              >
                <FaRegCopy />
              </button>
            </span>
            <span className="flex justify-between font-normal bg-[#2488FF] p-2 rounded-lg">
              <span className="flex space-x-4 py-2">
                <p className="text-[0.75rem] font-semibold">dollar account </p>
                <p className="text-[0.75rem]">— &nbsp;</p>
                <p className="text-[0.75rem]">
                  {myWallet?.userWalletUSD?.accountNumber}
                </p>
              </span>
              <button
                onClick={() =>
                  handleCopyClick(myWallet?.userWalletUSD?.accountNumber)
                }
              >
                <FaRegCopy />
              </button>
            </span>
          </div>
        </div>
        {/* <div className="flex mt-3">
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
        </div> */}
        <p className="py-4 font-medium text-lg">Transaction History</p>
      </header>

      <main className="mt-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-8 ">
            <BeatLoader color="#000000" size={15} />
          </div>
        ) : transactions.length > 0 ? (
          <>
            <div className="overflow-x-auto w-[24rem] md:w-full md:max-w-full ">
              <table className="table-auto text-sm text-left text-[#181336] w-full ">
                {/* Table header */}
                <thead className="text-xs text-[#7C8493] bg-[#EEF2F7] ">
                  <tr className="">
                    <th scope="col" className="px-6  py-3 text-[0.825rem]">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-[0.825rem]">
                      Wallet
                    </th>
                    <th scope="col" className="px-6 py-3 text-[0.825rem]">
                      Payment Method
                    </th>
                    <th scope="col" className="px-6 py-3 text-[0.825rem]">
                      Transaction Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-[0.825rem]">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-[0.825rem]">
                      Status
                    </th>
                  </tr>
                </thead>
                {/* Table body */}
                {sortedTransactions.map((transaction, index) => (
                  <tbody key={index}>
                    <tr className="bg-white font-medium border-b hover:bg-gray-50 ">
                      <td className="px-6 py-4 font-semibold text-[0.8375rem]">
                        {formatDatestamp(transaction.timestamp)}
                      </td>
                      <td className="px-6 font-semibold text-[0.8375rem] py-4 whitespace-now">
                        {transaction.walletType} Account
                      </td>
                      <td className="px-6 py-4 font-semibold text-[0.8375rem]">
                        {transaction.paymentGateway}
                      </td>
                      <td className="px-5 py-4 ">
                        <p
                          className={`text-[0.8375rem] p-1 w-fit rounded-md ${
                            transaction.transactionType === "Deposit"
                              ? " text-[#1CA78B] bg-[#F0F4F9]"
                              : " text-[red] bg-[red]/10"
                          }`}
                        >
                          {transaction.transactionType}
                        </p>
                      </td>
                      <td className="px-6 py-4 font-semibold text-[0.8375rem]">
                        {transaction.walletType === "naira" ? "₦" : "$"}{" "}
                        {transaction.amount}{" "}
                      </td>
                      <td className="px-5 py-4 ">
                        <p
                          className={`p-1 text-[0.8375rem] w-fit  rounded-md ${
                            transaction.paymentStatus === "failed"
                              ? "bg-red-100 text-red-400"
                              : transaction.paymentStatus === "pending"
                              ? "bg-yellow-100 text-yellow-500"
                              : "bg-green-200 text-green-400"
                          }`}
                        >
                          {transaction.paymentStatus}{" "}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                ))}
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
      <CreatePin />
    </main>
  );
};

export default Dashboard;
