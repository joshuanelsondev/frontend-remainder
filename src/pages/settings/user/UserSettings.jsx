import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { getCurrentUser } from "../../../api/userApi";
import "./UserSettings.scss";

export default function UserSettings() {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { id, ...userData } = await getCurrentUser();

        setUserInfo(userData);
        console.log("User Test:", userData);
      } catch (error) {
        console.error(error);
      }
    };

    getUserData();
  }, []);

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="user-settings">
      <div className="user-settings__heading">
        <FaUserCircle size={100} className="user-settings__user-image" />
        <div className="user-settings__upload">
          <label
            className="image-input-label"
            htmlFor="image-input"
            title="Upload an image"
          >
            Upload New
          </label>
          <input type="file" id="image-input" />
        </div>
        <button
          className="user-settings-delete-image"
          title="Delete existing image"
        >
          Delete Image
        </button>
      </div>
      <form className="user-settings-form">
        <div className="user-settings-form__label-input">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            value={userInfo.firstName || ""}
            placeholder="First Name"
            id="firstName"
            onChange={(e) => handleFormInput(e)}
            name="firstName"
          />
        </div>
        <div className="user-settings-form__label-input">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            value={userInfo.lastName || ""}
            placeholder="Last Name"
            id="lastName"
            onChange={(e) => handleFormInput(e)}
            name="lastName"
          />
        </div>
        <div className="user-settings-form__label-input">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={userInfo.email || ""}
            placeholder="email@email.com"
            id="email"
            onChange={(e) => handleFormInput(e)}
            name="email"
          />
        </div>
        <div className="user-settings-form__label-input">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            value={userInfo.phoneNumber || ""}
            placeholder="(123) 456-7890"
            id="phone"
            onChange={(e) => handleFormInput(e)}
            name="phoneNumber"
          />
        </div>
        <div className="user-settings-form__footer">
          <button className="user-settings-save">Save</button>
          <button className="user-settings-reset">Reset</button>
        </div>
      </form>
    </div>
  );
}
