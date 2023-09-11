import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { ToastContainer, toast } from "react-toastify";
import { FiSettings } from "react-icons/fi";
import Transitions from "../utils/Transition";

const UserProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const storedUserData = JSON.parse(localStorage.getItem("keyuserinfo")) || {};
  const {
    firstName,
    lastName,
    email,
    phone,
    _id: userId,
    userImage,
  } = storedUserData;
  const navigate = useNavigate();

  useEffect(() => {
    if (userImage) {
      setSelectedImage(userImage);
    }
  }, [userImage]);



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
            ...storedUserData,
            userImage: resp.data.userImage,
          };
          localStorage.setItem("keyuserinfo", JSON.stringify(updatedUserData));
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
  // Handle the click event for the "Upload new photo" button
  const handleEditClick = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the parent elements
    document.getElementById("avatar").click();
  };

  return (
    <Transitions>
      <div className="w-full">
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
        <nav
          className="relative  z-0 flex border-white rounded-xl overflow-hidden bg-white shadow-lg"
          aria-label="Tabs"
          role="tablist"
        >
          <button
            type="button"
            className="inline-flex justify-center hs-tab-active:border-b-blue-700  text-gray-500 relative min-w-0 flex-1  border-b-2 py-4 px-4 text-sm font-medium text-center overflow-hidden focus:z-10 bg-white-50 border-l-gray-700  active"
            id="bar-with-underline-item-1"
            data-hs-tab="#bar-with-underline-1"
            aria-controls="bar-with-underline-1"
            role="tab"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mx-1 sm:w-6 sm:h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
              />
            </svg>

            <span className="mx-1 text-sm sm:text-base">Profile</span>
          </button>
          <button
            type="button"
            className="inline-flex justify-center hs-tab-active:border-b-blue-700  text-gray-500 relative min-w-0 flex-1  border-b-2 py-4 px-4 text-sm font-medium text-center overflow-hidden focus:z-10 bg-white-50 border-l-gray-700 items-center"
            id="bar-with-underline-item-2"
            data-hs-tab="#bar-with-underline-2"
            aria-controls="bar-with-underline-2"
            role="tab"
          >
            <FiSettings size={20}/>
            <span className="mx-1 text-sm sm:text-base">Settings</span>
          </button>
        </nav>

        <div className="mt-3">
          <div
            id="bar-with-underline-1"
            role="tabpanel"
            aria-labelledby="bar-with-underline-item-1"
            className="flex flex-col justify-center items-center space-y-4 mt-12"
          >
            <p className="text-xl">Information </p>

            <div className="p-3 w-full lg:max-w-2xl shadow-md rounded-md border bg-white/80">
              <div className="flex justify-between ">
                <div className="mb-4 flex-1">
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-grayText"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="First Name"
                    value={firstName}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder-text-gray-900 text-sm rounded-md focus:outline-none"
                  />
                </div>

                <div className="mb-4 flex-1">
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-grayText"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    value={lastName}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder-text-gray-900 text-sm rounded-md focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-grayText"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder-text-gray-900 text-sm rounded-md focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block mb-2 text-sm font-medium text-grayText"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Phone Number"
                  value={phone}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 text-gray-800 placeholder-text-gray-900 text-sm rounded-md focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div
            id="bar-with-underline-2"
            className="hidden"
            role="tabpanel"
            aria-labelledby="bar-with-underline-item-2"
          >
            <div className="flex flex-col items-center  mt-12">
              <p className="text-xl">Edit your profile </p>

              <div className="p-3 mt-3 w-full lg:max-w-xl shadow-md rounded-md border bg-white/80 flex flex-col space-y-5 items-center py-6">
                <div className="text-center">
                  <Avatar
                    name={`${firstName} ${lastName}`}
                    src={selectedImage || ""}
                    size="80"
                    round={true}
                    className="mx-auto mb-2 bg-primary"
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
                <button
                  onClick={() => navigate("/reset-pin")}
                  className="  bg-primary/90 text-white rounded-lg py-2 px-4 mb-3"
                >
                  Reset Transaction Pin
                </button>
                <button className="  bg-primary/90 text-white rounded-lg py-2 px-4  mb-3">
                  Edit Profile Information
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transitions>
  );
};

export default UserProfile;
