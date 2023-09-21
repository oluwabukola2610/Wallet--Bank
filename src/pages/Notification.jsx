import { useContext } from "react";
import { BankContext } from "../context/BankContextProvider";
import { useEffect } from "react";
import useNotification from "../Hook/useNotification";

const Notification = () => {
  const { userData } = useContext(BankContext);
  const { firstName,lastName } = userData || {};
  const {handleNotification} = useNotification()
useEffect(()=>{
handleNotification()
},[])
  return (
    <div className="flex flex-col p-3 bg-white/75 shadow-[0_3px_10px_rgb(0,0,0,0.2)] m-[3rem] ">
      <span className="flex justify-between border-b border-b-gray-400 p-2">
        <p className="font-semibold">Notification</p>
        <p className="p-1 bg-blue-200 text-blue-700 font-semibold rounded-md">
          {/* {notifications.length}  */}
          New{" "}
        </p>
      </span>
      <div className="border-b p-1">
        <p className="text-gray-600 font-medium">
            Dear {firstName} {lastName} 
        </p>
        <div className="flex justify-between py-1">
          <p className="text-gray-400">There was a successful login to your Wallet App </p>
        </div>{" "}
      </div>
      {/* {notifications.map((notification, index) => (
        <div key={index} className="border-b p-1">
          <p className="text-gray-600 font-medium">{notification.text}</p>
          <div className="flex justify-between py-1">
            <p className="text-gray-400">{notification.date}</p>
          </div>{" "}
        </div>
      ))} */}
    </div>
  );
};

export default Notification;
