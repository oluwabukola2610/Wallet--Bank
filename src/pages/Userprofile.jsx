import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { FiSettings } from "react-icons/fi";
import Transitions from "../utils/Transition";
import ResetPin from "./Auth/ResetPin";

const UserProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const { firstName, lastName, email, phone, _id: userId } = userData || {};

  useEffect(() => {
    if (userData) {
      setSelectedImage(userData.userImage);
    }
  }, [userData]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));

    const reader = new FileReader();
    const fileSize = file.size;
    const imageLimit = 50 * 1024;

    if (fileSize > imageLimit) {
      toast.error(
        "The selected image size is too large. Please use images below 50kb."
      );
      return;
    } else {
      setSelectedImage(file);
    }
    reader.onloadend = () => {
      const base64Image = reader.result.split(",")[1];
      console.log(base64Image);
      fetch(
        `https://bank-app-backend-server.onrender.com/api/v1/user/imageUpload/${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ base64: base64Image }),
        }
      )
        .then((res) => res.json())
        .then((resp) => {
          console.log(resp);
          toast.success("Profile Image Uploaded!");
          // Update the user image in localStorage after successful upload
          const updatedUserData = {
            ...userData,
            userImage: resp.data.userImage,
          };
          localStorage.setItem("userData", JSON.stringify(updatedUserData));
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          toast.error(
            error.message || "An error occurred while uploading the image."
          );
        });
    };

    reader.readAsDataURL(file);
  };
  const handleEditClick = (e) => {
    e.stopPropagation();
    document.getElementById("avatar").click();
  };

  return (
    <Transitions>
      <div className="w-full">
        {" "}
        <ToastContainer
          position="top-center"
          hideProgressBar={true}
          transition={Zoom}
          limit={1}
          closeButton={false}
          newestOnTop={false}
          autoClose={1000}
          rtl={false}
          draggable
        />
        <nav className="z-0  border-white rounded-xl overflow-hidden bg-white shadow-lg">
          <div className="inline-flex justify-start items-center border-b-blue-700  text-gray-500 relative min-w-0 flex-1  border-b-2 py-4 px-4 text-sm font-medium text-center overflow-hidden focus:z-10 bg-white-50 border-l-gray-700 ">
            <span className="mx-1 text-base">Settings</span>
            <FiSettings size={20} />
          </div>
        </nav>
        <div className="mt-3">
          <div className="flex flex-col px-10 w-full space-y-4 mt-12">
            <p className="text-xl">User Information </p>

            <div className="p-3 w-full lg:max-w-5xl shadow-md rounded-md border bg-white/80">
              {/* profil Section */}
              <div className="mb-4 p-2 flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm text-gray-500 flex-col flex">
                  <h1 className="font-semibold font-serif">Profile Image</h1>
                  <span className="text-xs mt-2">
                    we only accept this type of format (PNG, JPG). <br /> kindly
                    upload photo not more that 5mb
                  </span>
                </div>
                <div className="flex flex-col space-y-1 w-full md:w-[300px]">
                  <Avatar
                    name={`${firstName} ${lastName}`}
                    src={selectedImage || ""}
                    size="80"
                    round={true}
                    className="mx-auto mb-2 !bg-primary"
                  />
                  <div className="justify-center flex items-center">
                    <p
                      onClick={handleEditClick}
                      className="mb-2 text-center bg-inherit border border-slate-400 text-gray-600 rounded-lg py-1 px-2 text-sm font-medium "
                    >
                      Upload new photo
                    </p>
                    <input
                      type="file"
                      id="avatar"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden w-full h-full cursor-pointer "
                    />
                  </div>
                </div>
              </div>
              <hr />
              {/* First Name Section */}
              <div className="mb-4 p-2 flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm text-gray-500 flex-col flex">
                  <h1 className="font-semibold font-serif">First Name</h1>{" "}
                  <span className="text-xs mt-2 text-red-500">
                    You won&rsquo;t be able to change your name.{" "}
                  </span>
                </div>
                <div className="space-x-2 flex flex-col md:flex-row">
                  <div className="w-full md:w-[200px] space-y-1">
                    <label htmlFor="firstName">FirstName</label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="First Name"
                      value={firstName}
                      disabled
                      className=" disabled:bg-blue-50 w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder-text-gray-900 text-sm rounded-md focus:outline-none"
                    />
                  </div>
                  <div className="w-full md:w-[200px] space-y-1">
                    <label htmlFor="firstName">LastName</label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Last Name"
                      value={lastName}
                      disabled
                      className=" disabled:bg-blue-50 w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder-text-gray-900 text-sm rounded-md focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <hr />

              {/* Email Section */}
              <div className="mb-4 p-2 flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm text-gray-500 flex-col flex">
                  <h1 className="font-semibold font-serif">Email Adress</h1>
                  <span className="text-xs mt-2">
                    Your email address will receive all <br />
                    communications and activity notifications from your account.{" "}
                  </span>
                </div>
                <div className="flex flex-col space-y-1 w-full md:w-[300px]">
                  <label htmlFor="firstName" className="font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    disabled
                    className=" disabled:bg-blue-50 w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder-text-gray-900 text-sm rounded-md focus:outline-none"
                  />
                </div>
              </div>
              <hr />

              {/* Phone Number Section */}
              <div className="mb-4 p-2 flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm text-gray-500 flex-col flex">
                  <h1 className="font-semibold font-serif">Phone Number</h1>
                  <span className="text-xs mt-2">
                    OTP is sent to your phone number for verification purposes.{" "}
                  </span>
                </div>
                <div className="flex flex-col space-y-1 w-full md:w-[300px]">
                  <label htmlFor="" className="font-semibold">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Phone Number"
                    value={phone}
                    disabled
                    className=" disabled:bg-blue-50 w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder-text-gray-900 text-sm rounded-md focus:outline-none"
                  />
                </div>
              </div>
              <hr />
              {/* Phone Number Section */}
              <div className="mb-4 p-2 flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm text-gray-500 flex-col flex">
                  <h1 className="font-semibold font-serif">Reset Pin</h1>
                  <span className="text-xs mt-2">
                    Reset your your Transaction Pin.{" "}
                  </span>
                </div>
                <div className="w-full md:w-[300px]">
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="btn bg-blue-400 hover:bg-blue-400 text-white"
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                  >
                    Click to Reset
                  </button>
                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                      <ResetPin />
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transitions>
  );
};
export default UserProfile;
