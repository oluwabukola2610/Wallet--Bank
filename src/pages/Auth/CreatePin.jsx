import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCreatePin from "../../Hook/useCreatePin";
import logo from "../../assets/logo/Union-preview.png";
import OtpInput from "react18-input-otp";
import { useEffect } from "react";
const CreatePin = () => {
  const { code, setCode, handleCreatePin } = useCreatePin();
  useEffect(() => {
    // Submit otp automatically once input is upto 4.
    if (code.length === 4) {
      handleCreatePin(new Event("submit"));
    }
  }, [code]);
  return (
    <div className="max-w-[1640px] mx-auto py-5 px-6 md:px-20 bg-bgGray h-screen max-h-full">
      <nav className="py-3">
        <img src={logo} alt="Logo" className="" />
      </nav>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 lg:gap-x-6 mt-12 lg:mt-28">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold md:text-4xl md:font-extrabold">
            Create Pin{" "}
          </h1>
          <p className="text-grayText font-light text-xl py-4">
            Create pin to enable transfer{" "}
          </p>
        </div>
        <form
          className="p-6 w-full lg:max-w-md shadow-md space-y-4 rounded-md border bg-white/80 flex flex-col items-center justify-center"
          onSubmit={handleCreatePin}
        >
          <h1 className="text-xl font-semibold text-center">
            Kindly create your <br />
            transaction Pin{" "}
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
    </div>
  );
};

export default CreatePin;
