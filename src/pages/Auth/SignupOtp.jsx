import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSignupOtp from "../../Hook/useSignupOtp";
import logo from "../../assets/logo/Union-preview.png";
import OtpInput from "react18-input-otp";

const SignupOtp = () => {
  const {
    setCode,
    handleResendOtp,
    handleOtpSubmit,
    timerComplete,
    code,
    timer,
    isLoading,
    formatTime,
  } = useSignupOtp();

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 lg:gap-x-10 mt-8 md:mt-20 lg:mt-16">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold md:text-4xl md:font-extrabold">
            OTP Verification
          </h1>
          <p className="text-grayText font-light text-xl py-4">
            A code has been sent to your email{" "}
          </p>
        </div>
        <div className="p-6 w-full lg:max-w-md shadow-md space-y-3 rounded-md border bg-white/80 flex flex-col items-center justify-center">
          <form
            onSubmit={handleOtpSubmit}
            className="space-y-6 flex flex-col justify-center items-center"
          >
            <h1 className="text-xl font-semibold text-center">
              Kindly enter your OTP <br /> to verify account
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
            <button
              disabled={isLoading}
              className=" bg-primary text-white rounded-lg py-2 px-4 hover:bg-primary-dark"
            >
              {isLoading ? "verifying....." : "Submit"}
            </button>
          </form>
          {timerComplete ? (
            <p className="py-4 text-sm text-grayText ">
              Didn’t get the code?{" "}
              <button
                className="text-primary text-sm font-bold"
                disabled={isLoading}
                onClick={handleResendOtp}
              >
                Resend
              </button>
            </p>
          ) : (
            <p className="py-4 text-sm text-grayText">
              Resend code in {formatTime(timer)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupOtp;
