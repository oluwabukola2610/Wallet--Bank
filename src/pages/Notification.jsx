import { useContext } from "react";
import { BankContext } from "../context/BankContextProvider";

const Notification = () => {
  const {  notifications } = useContext(BankContext);

  return (
    <div className="flex flex-col p-3 bg-white/75 shadow-[0_3px_10px_rgb(0,0,0,0.2)] m-[3rem] ">
      <span className="flex justify-between border-b border-b-gray-400 p-2">
        <p className="font-semibold">Notification</p>
        <p className="p-1 bg-blue-200 text-blue-700 font-semibold rounded-md">
         New
        </p>
      </span>
      {notifications.map((notification, index) => (
        <div key={index} className="border-b p-1">
          <p className="text-gray-600 font-medium">{notification.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Notification;
