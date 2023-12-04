import { Slide, ToastContainer } from "react-toastify";
import useCreatePin from "../../Hook/useCreatePin";
import OtpInput from "react18-input-otp";
import { useEffect } from "react";
const CreatePin = () => {
  const { code, setCode, handleCreatePin } = useCreatePin();
  useEffect(() => {
    if (code.length === 4) {
      handleCreatePin(new Event("submit"));
    }
  }, [code]);
  return (
    <dialog id="my_modal_5" className="modal">
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        transition={Slide}
        limit={1}
        closeButton={false}
        newestOnTop={false}
        autoClose={1000}
        rtl={false}
        draggable
      />
      <div className="modal-box">
        <div className="text-center ">
          <p className="text-grayText font-semibold text-xl  py-2">
            Create pin to enable transfer{" "}
          </p>
        </div>
        <form
          className="p-6 w-full space-y-4 rounded-md  flex flex-col items-center justify-center"
          onSubmit={handleCreatePin}
        >
          <h1 className="text-sm font-semibold text-center">
            Kindly Create Your Transaction Pin{" "}
          </h1>
          <OtpInput
            value={code}
            onChange={(otp) => setCode(otp)}
            numInputs={4}
            separator={<span style={{ width: "20px" }}></span>}
            isInputNum={true}
            shouldAutoFocus={true}
            inputStyle={{
              border: "1px solid #CFD3DB",
              borderRadius: "8px",
              width: "50px",
              height: "50px",
              fontSize: "12px",
              color: "#000",
              fontWeight: "800",
              caretColor: "blue",
              margin: "4px",
            }}
            focusStyle={{
              border: "1px solid #DEE3EB",
              outline: "none",
            }}
          />
          <button className="py-2 px-3 w-full bg-primary text-sm text-white rounded-md hover:bg-primaryDark">
            Create Pin
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default CreatePin;
