import OtpInput from "react18-input-otp";
import useResetPin from "../../Hook/useResetPin";
import { useEffect } from "react";
const ResetPin = () => {
  const { code, setCode, handleResetPin } = useResetPin();
  useEffect(() => {
    // Submit otp automatically once input is upto 4.
    if (code.length === 4) {
      handleResetPin(new Event("submit"));
    }
  }, [code]);
  return (
    <>
      <div className="text-center ">
        <h1 className="text-2xl font-bold">
          Reset Pin{" "}
        </h1>
        <p className="text-grayText font-light  py-2">
          Create a new pin to enable transfer{" "}
        </p>
      </div>
      <form
        className="p-6 w-full lg:max-w-md shadow-md space-y-4 rounded-md border bg-white/80 flex flex-col items-center justify-center"
        onSubmit={handleResetPin}
      >
        <h1 className="text-sm font-semibold text-center">
          Kindly update your 
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
    </>
  );
};

export default ResetPin;
