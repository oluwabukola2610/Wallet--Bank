import { useContext } from "react";
import { BankContext } from "../context/BankContextProvider";

const Notification = () => {
  const { notifications, unreadNotificationCount,markAllAsRead } = useContext(BankContext);
  return (
    <div className="bg-white p-4 rounded-md shadow-md m-4 md:m-12">
      <span className="flex justify-between border-b border-b-gray-400 p-2">
        <p className="font-semibold">Notification</p>
        <p className="p-1 bg-gray-200 text-gray-400 font-semibold rounded-md">
          {unreadNotificationCount} New{" "}
        </p>
      </span>

      <div>
        {notifications.map((notification, index) => (
          <div
            key={index}
            className={`border-b p-1 ${
              notification.read ? "text-gray-400" : ""
            }`}
          >
            <p className="font-medium">{notification.message}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={markAllAsRead}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          disabled={unreadNotificationCount === 0}
        >
          Mark All as Read
        </button>
      </div>
    </div>
  );
};

export default Notification;
