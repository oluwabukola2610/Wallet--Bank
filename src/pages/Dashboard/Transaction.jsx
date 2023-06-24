import { useEffect } from "react";
import useHandledashbord from "../../Hook/useHandledashbord";
import DashNav from "./component/DashNav";

const Transaction = () => {
  const { transactions, fetchUserTransactions ,formatTimestamp } = useHandledashbord();
  useEffect(() => {
    fetchUserTransactions();
  }, []);

  return (
    <div className="w-full px-2 md:px-4 lg:px-8 py-3">
      <DashNav />

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full">
          <thead className="">
            <tr className="bg-faded">
              <th className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Wallet 
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
            {transactions.map((transaction, index) => (
              <tr key={index} className="hover:bg-faded duration-300">
                <td className="px-6 py-4 whitespace-no-wrap">
                  <div className="text-sm leading-5 text-gray-900">
                    {transaction.walletType} Account
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
                    {transaction.amount}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;
