// new updated pagenation
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import useHandledashbord from "../Hook/useHandledashbord";

const Transaction = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Current page number

  const { transactions, fetchUserTransactions, formatTimestamp } =
    useHandledashbord();

  useEffect(() => {
    fetchUserTransactions().then(() => {
      setLoading(false);
    });
  }, []);

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

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <BeatLoader color="#000000" size={15} />
        </div>
      ) : (
        <div className="overflow-x-auto mt-12">
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
              {sortedTransactions.map((transaction, index) => (
                <tr key={index} className="hover:bg-faded/60 duration-300">
                  <td className="px-6 py-4 whitespace-no-wrap">
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
                  <td className="px-6 py-4 whitespace-no-wrap">
                    <div className="text-sm leading-5 text-gray-900">
                      {formatTimestamp(transaction.timestamp)}{" "}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap ">
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
                      {transaction.amount}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`mx-2 ${
                  currentPage === index + 1
                    ? "bg-green-700 text-white"
                    : "bg-gray-300 text-gray-700"
                } px-3 py-1 rounded-full`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;
