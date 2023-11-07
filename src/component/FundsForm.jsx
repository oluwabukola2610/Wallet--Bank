import { ToastContainer } from "react-toastify";
import useHandleFunds from "../Hook/useHandleFunds";
import { FaRegCopy } from "react-icons/fa";
import { useState } from "react";
const FundsForm = () => {
  const {
    selectedCurrency,
    setFundsInput,
    fundsInput,
    fundWithStripe,
    handleCurrencyChange,
    fundWithFlutterwave,
    fundWithPaystack,
  } = useHandleFunds();
  const handleInput = (event) => {
    setFundsInput(event.target.value);
  };
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const cardNum = JSON.parse(localStorage.getItem("cardNum"));
  const cardNumber = cardNum ? cardNum : "4242424242424242";
  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(cardNumber);
      setShowCopiedMessage(true);
      setTimeout(() => setShowCopiedMessage(false), 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">

      <div className="modal-box">
        {showCopiedMessage && (
          <div className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Text copied to clipboard</span>
          </div>
        )}
        <h2 className="text-2xl p-4 border-b border-b-slate-300 shadow-sm">
          Fund Wallet
        </h2>
        <p className="text-sm px-4 mt-6">Select Wallet Type</p>
        <ToastContainer
          position="top-center"
          hideProgressBar={true}
          newestOnTop={false}
          autoClose={1000}
          rtl={false}
          draggable
          style={{
            position: "fixed",
            top: "10%",
            right: "30%",
            transform: "translateX(-50%)",
            width: "100%",
          }}
        />

        <div className="px-6 mt-3 space-y-3 py-2">
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
              htmlFor="amount"
              className="block mb-1 text-sm font-medium text-grayText"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              placeholder=" 00.00"
              name="amount"
              className="w-full mb-4 px-1 py-2 border border-gray-300 text-gray-800 placeholder:text-gray-300 text-sm rounded-md focus:outline-none"
              onChange={handleInput}
              value={fundsInput}
              // onFocus={() => setWarningMessage(true)}
              // onBlur={() => setWarningMessage(false)}
            />
            {/* {warningMessage && (
              <p className="text-sm text-red-400 ">
                Amount should be between 100 & 2000{" "}
              </p>
            )} */}
          </div>
          {selectedCurrency === "naira" && (
            <div className="">
              <p>Select a Payment Gateway:</p>
              <div className="flex items-center space-x-4 mt-3">
                <button
                  onClick={fundWithFlutterwave}
                  className="bg-blue-500 text-white rounded-lg py-2 px-4"
                >
                  Flutterwave
                </button>
                <button
                  onClick={fundWithPaystack}
                  className="bg-blue-500 text-white rounded-lg py-2 px-4 "
                >
                  Paystack
                </button>
              </div>
            </div>
          )}
          {selectedCurrency === "usd" && (
            <div className=" mt-3">
              <div className="space-y-3">
                <p className="text-sm ">
                  {cardNum
                    ? "kindly copy your card number below for easy funding."
                    : "To continue with your funding process, kindly copy the card number below and use any number for your CVV and exp date."}
                </p>
                <span className="flex justify-between font-normal bg-[#2488FF80] p-2 rounded-lg">
                  <p className="text-[0.75rem] font-semibold">{cardNumber}</p>
                  <button onClick={handleCopyClick}>
                    <FaRegCopy />
                  </button>
                </span>
              </div>

              <button
                onClick={fundWithStripe}
                className="bg-blue-500 text-white rounded-lg py-2 px-4 mt-2"
              >
                Continue with Stripe
              </button>
            </div>
          )}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default FundsForm;
