import { useState } from "react";
import logo from "../../../assets/logo/Union-preview.png";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";

const UserProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const storedUserData = JSON.parse(localStorage.getItem("keyuserinfo"));
  const { firstName, lastName, email, phone } = storedUserData || {};
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    // You can also upload the file to the server at this point
  };

  const handleEditClick = () => {
    document.getElementById("avatar").click();
  };

  return (
    <div className="max-w-[1640px] mx-auto py-5 px-6 md:px-20 bg-bgGray  max-h-full">
      <nav className="py-3">
        <img src={logo} alt="Logo" className="" />
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 lg:gap-x-10 mt-10 md:mt-8 lg:mt-16 ">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold md:text-4xl md:font-extrabold">
            User Profile
          </h1>
          <p className="text-grayText font-light text-xl py-4">
            Kindly update your profile information
          </p>
        </div>
        <div className="p-3 w-full lg:max-w-md shadow-md rounded-md border bg-white/80">
          <div className="text-center">
            {" "}
            <Avatar
              name={`${firstName} ${lastName}`}
              src={selectedImage || "placeholder-image-url"}
              size="80"
              round={true}
              
              className="mx-auto mb-2 bg-primary"
            />
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            />
            <div className="justify-center flex items-center">
              <button
                onClick={handleEditClick}
                className="mb-2 bg-inherit border border-slate-400 text-gray-600 rounded-lg py-1 px-2 text-sm font-medium "
              >
                Upload new photo
              </button>
            </div>
          </div>

          <div className="mb-4">
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

          <div className="mb-4">
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

          <button
            onClick={()=>navigate('/reset-pin')}
            className=" w-full bg-primary/90 text-white rounded-lg py-2 px-4 hover:bg-primary-dark mb-3"
          >
            Reset Transaction Pin
          </button>

        
          <p className="py-4  text-center text-sm text-grayText flex justify-between">
            <Link to="/wallet" className="text-primary font-bold">
              Return to Dashboard
            </Link>
            <button
            onClick={handleLogOut}
            className=" border-[1.5px] border-gray-400 text-gray-700 font-bold rounded-lg py-1 px-2 text-md "
            >
            Log Out
          </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
