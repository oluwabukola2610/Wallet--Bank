import logo from "../assets/logo/Union-preview.png";
import payment from "../assets/bg.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Sucess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/wallet');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <section className="max-w-[1640px] mx-auto md:max-w-full md:mx-auto bg-primary flex flex-row items-center justify-center h-screen">
      <div className="max-w-md mx-auto bg-white rounded-md p-8 shadow-md mr-8">
        <img src={logo} alt="Bank Logo" className="w-16 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Thank You for Banking with Us
        </h1>
        <p className="text-gray-600 mb-6">
          We appreciate your trust in our services. Your satisfaction is our top
          priority.
        </p>
        <div className="bg-blue-100 text-blue-800 p-4 rounded-md mb-6">
          <p className="font-semibold">Your Account Details:</p>
          <ul className="list-disc ml-6">
            <li>Account Number: XXXX-XXXX-XXXX-4242</li>
            <li>Account Type: Savings</li>
          </ul>
        </div>
        <div className="text-center">
          <p
            className="bg-blue-500 text-white py-2 px-4 rounded-full inline-block hover:bg-blue-600"
          >
            Back to Dashboard
          </p>
        </div>
      </div>
      <div
        className="w-[60%] h-screen bg-cover"
        style={{ backgroundImage: `url(${payment})` }}
      ></div>
    </section>
  );
};

export default Sucess;
