import ReactLoading from "react-loading";
import { ToastContainer, Zoom } from "react-toastify";
import useCreateCard from "../Hook/useCreateCard";
import "react-toastify/dist/ReactToastify.css";

const CardModal = () => {
  const { generateCard, isloading } = useCreateCard();

  return (
    <dialog id="my_modal_1" className="modal">
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        transition={Zoom}
        limit={1}
        closeButton={false}
        newestOnTop={false}
        autoClose={1000}
        rtl={false}
        draggable
      />
      <div className="modal-box p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Virtual Card</h1>
        <p className="text-gray-700">
          Fund your wallet with this card to enable swift online transactions.
          This virtual card can be used for:
        </p>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Secure online payments</li>
          <li>Online shopping</li>
          <li>Subscriptions and memberships</li>
        </ul>
        <div className="border-b border-t p-2 flex items-center justify-between my-4">
          <p className="text-gray-700">Issuing Cost</p>
          <p className="text-green-600 font-semibold">$10</p>
        </div>
        <button
          disabled={isloading}
          onClick={generateCard}
          className="relative bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          {isloading ? (
            <div className="flex items-center justify-center">
              <ReactLoading type="spin" height={"28px"} width={"28px"} />
            </div>
          ) : (
            "Proceed"
          )}
        </button>

        <div className="modal-action mt-4">
          <form method="dialog">
            <button className="btn btn-sm text-gray-600 hover:text-gray-800">
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default CardModal;
