import { BsBank } from "react-icons/bs";
import ReactLoading from "react-loading";
import useCreateCard from "../Hook/useCreateCard";
import { ToastContainer, Zoom } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../api/Api";
import CardModal from "../component/CardModal";

const Caard = () => {
  const { isloading, deleteCAard } = useCreateCard();
  const [cardData, setCardData] = useState({});
  const [isCardGenerated, setIsCardGenerated] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData._id;
  const formatAtmCardNumber = (cardNumber) => {
    if (typeof cardNumber === "number") {
      cardNumber = cardNumber.toString();
      // Use regex to split the 16-digit card number into 4 groups of 4 digits each
      const cardNumberGroups = cardNumber.match(/(\d{4})/g);

      if (cardNumberGroups) {
        return cardNumberGroups.join(" ");
      }
    }

    return cardNumber;
  };

  useEffect(() => {
    axios
      .get(`${api}/card/usercards?userId=${userId}`)
      .then((response) => {
        if (response.status === 200) {
          setCardData(response.data.data[0]);
          setIsCardGenerated(true);
          localStorage.setItem(
            "cardNum",
            JSON.stringify(response.data.data[0].cardNumber)
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // }
  }, []);

  return (
    <main className=" px-3 md:px-4 lg:px-8 py-3 flex flex-col items-center overflow-y-scroll w-full space-y-12">
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        transition={Zoom}
        limit={1}
        closeButton={false}
        newestOnTop={false}
        autoClose={2000}
        rtl={false}
        draggable
      />
      <section className="mt-4">
        {isloading ? (
          // Render loading spinner or other loading UI
          <div className="text-center">
            <ReactLoading type="spin" color="#007BFF" height={50} width={50} />
            <p>Loading...</p>
          </div>
        ) : (
          <div className="card w-[400px] md:w-[500px] h-[300px] text-white cursor-pointer">
            <div className="card-inner w-full h-full relative">
              {/* card front */}
              <div className="front w-full h-full absolute top-0 left-0 rounded-[15px] py-[20px] px-[30px] overflow-hidden z-[1]">
                <img
                  src="https://i.ibb.co/PYss3yv/map.png"
                  alt="world map"
                  className="-z-[1] top-0 left-0 absolute w-full opacity-[0.3]"
                />
                <div className="flex content-center justify-between mb-6">
                  <h1 className="font-mono text-[1.5rem]">Wallet</h1>
                  <BsBank className="w-[40px] h-[30px]" title="card-chip" />
                </div>
                <div className="flex justify-between items-center">
                  <img
                    src="https://i.ibb.co/G9pDnYJ/chip.png"
                    className="w-[60px] h-[50px]"
                    alt="card-chip"
                  />
                  <p className="font-mono text-[1.5rem]">
                    {cardData && cardData.cardProvider
                      ? cardData.cardProvider
                      : "- -"}
                  </p>
                </div>

                <div className="flex content-center justify-between text-[35px] mt-2">
                  <h1 className="font-mono text-[2.3rem]">
                    {cardData && cardData.cardNumber
                      ? formatAtmCardNumber(cardData.cardNumber)
                      : "**** **** **** ****"}
                  </h1>
                </div>

                <div className="flex gap-4 items-center justify-end pt-2 ">
                  <p className="capitalize text-sm leading-none font-mono">
                    VALID TILL
                  </p>
                  <p className="uppercase font-mono">
                    {" "}
                    {cardData && cardData.cardExpiryDate
                      ? cardData.cardExpiryDate
                      : "- / -"}
                  </p>
                </div>

                <div className="flex content-center justify-between name text-[22px] mt-8">
                  <p className="uppercase font-mono">
                    CARD-HOLDER:{" "}
                    <b>{cardData.cardHolder ? cardData.cardHolder : "--"} </b>
                  </p>
                </div>
              </div>

              {/* card back */}
              <div className="back w-full h-full absolute top-0 left-0 rounded-[15px] py-[20px] px-[30px] overflow-hidden z-[1]">
                <img
                  src="https://i.ibb.co/PYss3yv/map.png"
                  alt="world-map"
                  className="-z-[1] top-0 left-0 absolute w-full opacity-[0.3]"
                />
                <div className="bg-[#222] mx-[-30px] h-[60px] mt-[10px]"></div>
                <div className="flex content-center justify-between card-cvv flex-1 mt-[20px]">
                  <div>
                    <img
                      src="https://i.ibb.co/S6JG8px/pattern.png"
                      alt="pattern"
                      className="rounded-none block leading-[0]"
                    />
                  </div>
                  {/* cvv */}
                  <p className="font-mono bg-white text-black font-semibold text py-3 px-6">
                    {cardData && cardData.cardCVV ? cardData.cardCVV : "- -"}
                  </p>
                </div>
                <div className="flex content-center justify-between mt-[30px] text-[14px]">
                  <p className="font-mono text-sm leading-[0.9]">
                    Please remember to keep your credit card information secure
                    and never share it with anyone unless you are making a
                    secure transaction with a trusted entity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <section>
        {isCardGenerated ? (
          <button
            onClick={deleteCAard}
            className="btn bg-red-400 hover:bg-red-400 text-white"
          >
            Delete Card
          </button>
        ) : (
          <button
            className="btn bg-blue-400 hover:bg-blue-400 text-white"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Create Virtual Dollar card{" "}
          </button>
        )}
        <CardModal />
      </section>
    </main>
  );
};

export default Caard;
