import { useState, useContext } from "react";
import { BankContext } from "../context/BankContextProvider";

const Notification = () => {
  const { notifications, setNotifications } = useContext(BankContext);

  const [activeTab, setActiveTab] = useState("unread");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const markAsRead = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };

  const unreadMessages = notifications.filter(
    (notification) => !notification.read
  );
  const readMessages = notifications.filter(
    (notification) => notification.read
  );

  return (
    <div className="bg-white p-4 rounded-md shadow-md m-4 md:m-12">
      <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
        <h2 className="text-xl font-semibold">Notifications</h2>
      </div>

      <div className="flex mb-4">
        <button
          onClick={() => handleTabClick("unread")}
          className={`flex-1 px-4 py-2 text-center ${
            activeTab === "unread"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-800"
          } rounded-tl-md`}
        >
          Unread ({unreadMessages.length})
        </button>
        <button
          onClick={() => handleTabClick("read")}
          className={`flex-1 px-4 py-2 text-center ${
            activeTab === "read"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-800"
          } rounded-tr-md`}
        >
          Read ({readMessages.length})
        </button>
      </div>

      <div>
        {activeTab === "unread" &&
          unreadMessages.map((notification, index) => (
            <div
              key={index}
              className="mb-2"
              onClick={() => markAsRead(notification.id)}
            >
              <p className="text-blue-800 font-semibold">
                {notification.message}
              </p>
            </div>
          ))}

        {activeTab === "read" &&
          readMessages.map((notification, index) => (
            <div key={index} className="mb-2">
              <p className="text-gray-800">{notification.message}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Notification;
