import useHandleTransfer from "../../../Hook/useHandleTransfer";

const TransferForm = () => {
  const {
    handleCurrencyChange,
    handleInput,
    handleTransact,
    selectedCurrency,
    handleTransferForm,
  } = useHandleTransfer();
  return (
    <div>
      <h2 className="text-2xl p-4 border-b border-b-slate-300 shadow-sm">
        Transfer{" "}
      </h2>
      <p className="text-sm px-4 mt-6">Select Wallet Type to Transfer From</p>

      <form onSubmit={handleTransferForm} className="px-6 mt-3 space-y-4">
        <div className="flex items-center space-x-16">
          <span className="">
            <input
              id="naira"
              type="radio"
              value="naira"
              name="currency"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              onChange={handleCurrencyChange}
              checked={selectedCurrency === "naira"}
            />
            <label
              htmlFor="naira"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Naira
            </label>
          </span>
          <span className="">
            <input
              id="dollar"
              type="radio"
              value="dollar"
              name="currency"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              onChange={handleCurrencyChange}
              checked={selectedCurrency === "dollar"}
            />
            <label
              htmlFor="dollar"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Dollar
            </label>
          </span>
        </div>
        <div>
          <label
            htmlFor="accountNumber"
            className="block mb-1 text-sm font-medium text-grayText"
          >
            Account Number{" "}
          </label>
          <input
            type="number"
            id="accountNumber"
            placeholder="23456788901"
            name="accountNum"
            value={handleTransact.accountNum}
            onChange={handleInput}
            className="w-full mb-4 px-3 py-2 border border-gray-300 text-gray-800 placeholder:text-gray-900 text-sm rounded-md focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block mb-1 text-sm font-medium text-grayText"
          >
            Amount{" "}
          </label>
          <input
            type="number"
            id="amount"
            placeholder="₦ 00.00"
            name="amount"
            value={handleTransact.amount}
            onChange={handleInput}
            className="w-full mb-4 px-3 py-2 border border-gray-300 text-gray-800 placeholder:text-gray-900 text-sm rounded-md focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="pin"
            className="block mb-1 text-sm font-medium text-grayText"
          >
            pin{" "}
          </label>
          <input
            type="number"
            id="pin"
            placeholder="****"
            name="pin"
            value={handleTransact.pin}
            onChange={handleInput}
            className="w-full mb-4 px-3 py-2 border border-gray-300 text-gray-800 placeholder:text-gray-900 text-sm rounded-md focus:outline-none"
          />
        </div>
        <button className="w-full bg-primary text-white rounded-lg py-2 px-4 hover:bg-primary-dark">
          Transfer
        </button>
      </form>
    </div>
  );
};

export default TransferForm;
