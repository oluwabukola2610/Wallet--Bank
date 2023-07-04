import { ToastContainer } from "react-toastify";
import useHandleTransfer from "../../../Hook/useHandleTransfer";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

const TransferForm = () => {
  const [warningMessage, setWarningMessage] = useState(false);
  const inputRef = useRef(null); // Ref for the PIN input element

  const {
    handleCurrencyChange,
    handleInput,
    transferInput,
    selectedCurrency,
    handleTransferForm,
    isLoading,
  } = useHandleTransfer();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("keyuserinfo"));

  const handleBlur = () => {
    // Set a slight delay before setting the warning message to false
    setTimeout(() => {
      setWarningMessage(false);
    }, 200);
  };

  const handleFocus = () => {
    setWarningMessage(true);
    inputRef.current.focus();
  };

  const navigateToCreatePin = () => {
    if (currentUser) {
      const userId = currentUser._id;
      navigate(`/create-pin/${userId}`);
    }
  };

  return (
    <div>
      <h2 className="text-2xl p-4 border-b border-b-slate-300 shadow-sm">
        Transfer
      </h2>
      <p className="text-sm px-4 mt-6">Select Wallet Type to Transfer From</p>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        newestOnTop={false}
        autoClose={1000}
        rtl={false}
        draggable
        style={{
          top: "10%",
          transform: "translateY(-50%)",
          width: "fit-content",
        }}
      />
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
              value="usd"
              name="currency"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              onChange={handleCurrencyChange}
              checked={selectedCurrency === "usd"}
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
            Account Number
          </label>
          <input
            type="number"
            id="accountNumber"
            placeholder="23456788901"
            name="accountNum"
            value={transferInput.accountNum}
            onChange={handleInput}
            className="w-full mb-4 px-3 py-2 border border-gray-300 text-gray-800 placeholder:text-gray-400 text-sm rounded-md focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block mb-1 text-sm font-medium text-grayText"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            placeholder="₦ 00.00"
            name="amount"
            value={transferInput.amount}
            onChange={handleInput}
            className="w-full mb-4 px-3 py-2 border border-gray-300 text-gray-800 placeholder:text-gray-400 text-sm rounded-md focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="pin"
            className="block mb-1 text-sm font-medium text-grayText"
          >
            PIN
          </label>
          <input
            type="password"
            id="pin"
            placeholder="****"
            name="pin"
            value={transferInput.pin}
            className="w-full mb-4 px-3 py-2 border border-gray-300 text-gray-800 placeholder:text-gray-900 text-sm rounded-md focus:outline-none"
            onChange={handleInput}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          {warningMessage && (
            <div>
              {currentUser && currentUser.transactionPin === 1111 ? (
                <div>
                  <p className="text-sm">
                    Please create a PIN before proceeding:
                  </p>
                  <button
                    onClick={navigateToCreatePin}
                    className="text-primary text-sm font-bold cursor-pointer"
                  >
                    Create PIN
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
        <button
          disabled={isLoading}
          className="relative w-full bg-primary text-white rounded-lg py-2 px-4 hover:bg-primary-dark"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <ReactLoading type="spin" height={"28px"} width={"28px"} />
            </div>
          ) : (
            "Transfer Funds"
          )}
        </button>
      </form>
    </div>
  );
};

export default TransferForm;
