import { useState, useContext } from "react";
import { BeatLoader } from "react-spinners";
import { BankContext } from "../context/BankContextProvider";

const Transaction = () => {
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 5; // Number of items to display per page

  const { transactions, formatDatestamp, isLoading } = useContext(BankContext);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = transactions.slice(startIndex, endIndex);
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <a
        key={i}
        onClick={() => handlePageChange(i)}
        className={`px-3 py-1 rounded-lg cursor-pointer text-black ${
          currentPage === i ? "bg-[#3C1450] text-white" : "bg-white"
        }`}
      >
        {i}
      </a>
    );
  }

  const sortedTransactions = displayedData.sort((a, b) => {
    // Sort the transactions based on the timestamp in descending order
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  return (
    <div className="px-2 md:px-4  py-3 overflow-hidden">
      {isLoading ? (
        <div className="flex justify-center items-center py-8 w-full">
          <BeatLoader color="#000000" size={15} />
        </div>
      ) : (
        <div className="overflow-hidden">
             <div className="overflow-x-auto w-[24rem] md:w-full md:max-w-full ">
            <table className="table-auto text-sm text-left text-[#181336] w-full">
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
          {/* Pagination */}
          <nav
            className="flex items-center bg-white rounded-b-lg justify-between py-4 mt-8"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal px-6 text-gray-500 dark:text-gray-400">
              Showing{" "}
              <span className="font-semibold text-gray-900 ">
                {startIndex + 1}-{endIndex}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900 ">
                {transactions.length}
              </span>
            </span>
            <div className="inline-flex space-x-2 px-4 text-sm h-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className={`mx-2 ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer "
                } px-2 rounded-full`}
              >
                Prev
              </button>
              <p className="py-2">{paginationButtons}</p>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className={`mx-2 ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
                } px-2 rounded-full`}
              >
                Next
              </button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Transaction;
