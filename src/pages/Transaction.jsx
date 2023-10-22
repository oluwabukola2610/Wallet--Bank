import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { useContext } from "react";
import { BankContext } from "../context/BankContextProvider";

const Transaction = () => {
  const [currentPage, setCurrentPage] = useState(1); // Current page number

  const { transactions, formatDatestamp, isLoading } = useContext(BankContext);

  const TransactionsPerPage = 8; // Number of transactions per page
  const totalTransactions = transactions.length; // Number of transactions
  const totalPages = Math.ceil(totalTransactions / TransactionsPerPage); // to get Number of pages

  const startIndex = (currentPage - 1) * TransactionsPerPage; // start index of transaction
  const endIndex = startIndex + TransactionsPerPage; // end index of transaction
  const displayedTransactions = transactions.slice(startIndex, endIndex); // display transactions based on current page

  const handlePageChange = (pageNumber) => {
    // Handle page change
    setCurrentPage(pageNumber);
  };
  const sortedTransactions = displayedTransactions.sort((a, b) => {
    // Sort the transactions based on the timestamp in descending order
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  return (
    <div className="w-full px-2 md:px-4 lg:px-8 py-3">
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <BeatLoader color="#000000" size={15} />
        </div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[25rem] md:w-full mt-12">
          <table className="w-full text-sm text-left text-gray-500">
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
                  Transaction Date
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
              {sortedTransactions.map((transaction, index) => (
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
                      {transaction.walletType === "naira" ? "₦" : "$"}{" "}
                      {transaction.amount}{" "}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex justify-center items-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-2 ${
              currentPage === index + 1
                ? "bg-blue-500 text-white text-sm"
                : "bg-gray-300 text-gray-700"
            } px-2 rounded-full`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Transaction;
