import { ToastContainer } from "react-toastify";
import useHandleFunds from "../Hook/useHandleFunds";

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
  // const [warningMessage, setWarningMessage] = useState(false);
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
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
            top: "10%",
            transform: "translateY(-50%)",
            width: "fit-content",
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
